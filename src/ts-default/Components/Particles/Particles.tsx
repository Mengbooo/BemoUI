import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import './Particles.css';

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}

function hexToRgb(hex: string): [number, number, number] {
  let cleaned = String(hex || '').replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((char) => char + char)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return [22, 32, 228];
  }
  const hexInt = parseInt(cleaned, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export interface ParticlesProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

export default function Particles({
  className = '',
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = '#1620E4',
  vx = 0,
  vy = 0,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);
  const initCanvasRef = useRef<() => void>(() => {});
  const onMouseMoveRef = useRef<() => void>(() => {});
  const animateRef = useRef<() => void>(() => {});
  const rgb = hexToRgb(color);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }

    initCanvasRef.current();
    if (!reducedMotion.current) {
      animateRef.current();
    }

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvasRef.current();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [color]);

  useEffect(() => {
    onMouseMoveRef.current();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvasRef.current();
  }, [refresh, quantity, size]);

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.floor(Math.random() * 2) + size;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: pSize,
      alpha: reducedMotion.current ? targetAlpha : 0,
      targetAlpha,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, s, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) {
      circles.current.push(circle);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const resizeCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;
    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    const style = canvasRef.current.style as CSSProperties;
    style.width = `${canvasSize.current.w}px`;
    style.height = `${canvasSize.current.h}px`;
    context.current.setTransform(1, 0, 0, 1, 0, 0);
    context.current.scale(dpr, dpr);
    circles.current = [];
    for (let i = 0; i < quantity; i += 1) {
      drawCircle(circleParams());
    }
  };

  const initCanvas = () => {
    resizeCanvas();
  };

  const onMouseMove = () => {
    if (!canvasRef.current || reducedMotion.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    if (reducedMotion.current) return;
    clearContext();
    const next: Circle[] = [];
    circles.current.forEach((circle) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      const outOfBounds =
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size;

      if (outOfBounds) {
        const replacement = circleParams();
        drawCircle(replacement, true);
        next.push(replacement);
      } else {
        drawCircle(circle, true);
        next.push(circle);
      }
    });
    circles.current = next;
    rafID.current = window.requestAnimationFrame(() => animateRef.current());
  };

  initCanvasRef.current = initCanvas;
  onMouseMoveRef.current = onMouseMove;
  animateRef.current = animate;

  const rootClass = ['bemo-particles', className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="bemo-particles__canvas" />
    </div>
  );
}
