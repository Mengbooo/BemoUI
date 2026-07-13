import { useEffect, useId, useMemo, useRef, useState } from 'react';
import './DotPattern.css';

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
}) {
  const rawId = useId().replace(/:/g, '');
  const gradientId = `${rawId}-gradient`;
  const containerRef = useRef(null);
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

  const dots = useMemo(() => {
    const list = [];
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

  const classNames = ['bemo-dot-pattern', className].filter(Boolean).join(' ');

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      focusable="false"
      className={classNames}
      {...props}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor="#7BE9C6" stopOpacity="1" />
          <stop offset="100%" stopColor="#1620E4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <circle
          key={dot.key}
          className={
            glow
              ? 'bemo-dot-pattern__dot bemo-dot-pattern__dot--glow'
              : 'bemo-dot-pattern__dot'
          }
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${gradientId})` : 'currentColor'}
          style={
            glow
              ? {
                  '--bemo-dot-delay': `${dot.delay}s`,
                  '--bemo-dot-duration': `${dot.duration}s`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

export default DotPattern;
