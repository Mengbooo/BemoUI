import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type SVGProps,
} from 'react';

export interface DotPatternProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

interface DotItem {
  key: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className = '',
  glow = false,
  ...props
}: DotPatternProps) {
  const rawId = useId().replace(/:/g, '');
  const gradientId = `${rawId}-gradient`;
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    update();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(update);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const cols = Math.max(1, Math.ceil(dimensions.width / width) || 1);
  const rows = Math.max(1, Math.ceil(dimensions.height / height) || 1);

  const dots = useMemo<DotItem[]>(() => {
    const list: DotItem[] = [];
    const total = cols * rows;
    for (let i = 0; i < total; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      list.push({
        key: `${col}-${row}`,
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Number(((i * 0.37) % 5).toFixed(2)),
        duration: Number((2 + ((i * 0.53) % 3)).toFixed(2)),
      });
    }
    return list;
  }, [cols, rows, width, height, cx, cy, x, y]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full text-[#1620E4] ${className}`.trim()}
      {...props}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor="#7BE9C6" stopOpacity="1" />
          <stop offset="100%" stopColor="#1620E4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => {
        const glowStyle: CSSProperties | undefined = glow
          ? {
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animationName: 'bemo-dot-pattern-glow',
              animationDuration: `${dot.duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationDelay: `${dot.delay}s`,
            }
          : undefined;

        return (
          <circle
            key={dot.key}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill={glow ? `url(#${gradientId})` : 'currentColor'}
            className={
              glow
                ? 'origin-center motion-reduce:animate-none motion-reduce:opacity-65'
                : undefined
            }
            style={glowStyle}
          />
        );
      })}
    </svg>
  );
}

export default DotPattern;

/*
Required global keyframes for Tailwind v4 (e.g. in a global CSS entry):

@keyframes bemo-dot-pattern-glow {
  from {
    opacity: 0.4;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .motion-reduce\:animate-none {
    animation: none !important;
  }
}
*/
