import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';

export interface FlickeringGridProps extends HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

interface GridParams {
  cols: number;
  rows: number;
  squares: Float32Array;
  dpr: number;
}

function colorToRgbaPrefix(color: string): string {
  const value = color.trim();
  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if ([r, g, b].every((channel) => !Number.isNaN(channel))) {
        return `rgba(${r}, ${g}, ${b},`;
      }
    }
  }
  const rgbMatch = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]},`;
  }
  return 'rgba(22, 32, 228,';
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = '#1620E4',
  width,
  height,
  className = '',
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const memoizedColor = useMemo(() => colorToRgbaPrefix(color), [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, nextWidth: number, nextHeight: number): GridParams => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = nextWidth * dpr;
      canvas.height = nextHeight * dpr;
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;

      const cols = Math.ceil(nextWidth / (squareSize + gridGap));
      const rows = Math.ceil(nextHeight / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);

      for (let i = 0; i < squares.length; i += 1) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i += 1) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < cols; i += 1) {
        for (let j = 0; j < rows; j += 1) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    let animationFrameId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let gridParams: GridParams | null = null;
    let lastTime = 0;

    if (!canvas || !container || !ctx) {
      return undefined;
    }

    const updateCanvasSize = () => {
      const nextWidth = width || container.clientWidth;
      const nextHeight = height || container.clientHeight;
      setCanvasSize({ width: nextWidth, height: nextHeight });
      gridParams = setupCanvas(canvas, nextWidth, nextHeight);

      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr
      );
    };

    const animate = (time: number) => {
      if (!isInView || !gridParams || prefersReducedMotion) {
        return;
      }

      const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr
      );
      animationFrameId = window.requestAnimationFrame(animate);
    };

    updateCanvasSize();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
      });
      resizeObserver.observe(container);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInView(Boolean(entry?.isIntersecting));
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);
    } else {
      setIsInView(true);
    }

    if (isInView && !prefersReducedMotion) {
      lastTime = performance.now();
      animationFrameId = window.requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [
    setupCanvas,
    updateSquares,
    drawGrid,
    width,
    height,
    isInView,
    prefersReducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className={['relative block h-full w-full overflow-hidden bg-transparent', className]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label="Decorative flickering grid background"
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block h-full w-full select-none"
        aria-hidden="true"
        width={canvasSize.width || undefined}
        height={canvasSize.height || undefined}
      />
    </div>
  );
};

export default FlickeringGrid;

/*
 * Tailwind v4 global keyframes:
 * None required. FlickeringGrid renders via canvas and requestAnimationFrame.
 * Reduced motion is honored in JS with prefers-reduced-motion.
 */
