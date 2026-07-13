import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { motion } from 'framer-motion';
import './AnimatedGridPattern.css';

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number | string;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  color?: string;
}

type Square = {
  id: number;
  pos: [number, number];
  iteration: number;
};

function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className = '',
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  color = '#1620E4',
  style,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const getPos = useCallback((): [number, number] => {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }, [dimensions.height, dimensions.width, height, width]);

  const generateSquares = useCallback(
    (count: number): Square[] =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
        iteration: 0,
      })),
    [getPos]
  );

  const updateSquarePosition = useCallback(
    (squareId: number) => {
      setSquares((currentSquares) => {
        const current = currentSquares[squareId];
        if (!current || current.id !== squareId) return currentSquares;
        const nextSquares = currentSquares.slice();
        nextSquares[squareId] = {
          ...current,
          pos: getPos(),
          iteration: current.iteration + 1,
        };
        return nextSquares;
      });
    },
    [getPos]
  );

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions.width, dimensions.height, generateSquares, numSquares]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return undefined;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions((currentDimensions) => {
          const nextWidth = entry.contentRect.width;
          const nextHeight = entry.contentRect.height;
          if (
            currentDimensions.width === nextWidth &&
            currentDimensions.height === nextHeight
          ) {
            return currentDimensions;
          }
          return { width: nextWidth, height: nextHeight };
        });
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const classNames = ['bemo-animated-grid-pattern', className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: CSSProperties = { color, ...style };

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      focusable="false"
      className={classNames}
      style={mergedStyle}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="bemo-animated-grid-pattern__squares">
        {squares.map(({ pos: [squareX, squareY], id: squareId, iteration }, index) =>
          reduceMotion ? (
            <rect
              key={`${squareId}-${iteration}`}
              className="bemo-animated-grid-pattern__square"
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
              fill="currentColor"
              strokeWidth="0"
              opacity={maxOpacity * 0.35}
            />
          ) : (
            <motion.rect
              key={`${squareId}-${iteration}`}
              className="bemo-animated-grid-pattern__square"
              initial={{ opacity: 0 }}
              animate={{ opacity: maxOpacity }}
              transition={{
                duration,
                repeat: 1,
                delay: index * 0.1,
                repeatType: 'reverse',
                repeatDelay,
              }}
              onAnimationComplete={() => updateSquarePosition(squareId)}
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
              fill="currentColor"
              strokeWidth="0"
            />
          )
        )}
      </svg>
    </svg>
  );
}

export default AnimatedGridPattern;
