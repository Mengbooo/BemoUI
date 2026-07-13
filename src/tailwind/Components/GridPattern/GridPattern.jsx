import { useId } from 'react';

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = '0',
  squares,
  className = '',
  ...props
}) {
  const id = useId();
  const rootClass = [
    'pointer-events-none absolute inset-0 h-full w-full fill-[#1620E4]/30 stroke-[#1620E4]/30',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg aria-hidden="true" className={rootClass} {...props}>
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
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares ? (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect
              key={`${sx}-${sy}`}
              className="fill-[#7BE9C6]/35"
              strokeWidth={0}
              width={width - 1}
              height={height - 1}
              x={sx * width + 1}
              y={sy * height + 1}
            />
          ))}
        </svg>
      ) : null}
    </svg>
  );
}

// Required global keyframes (Tailwind v4 @theme / CSS): none for GridPattern.
