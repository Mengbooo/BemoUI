import { useId } from 'react';
import './GridPattern.css';

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
  const rootClass = ['bemo-grid-pattern', className].filter(Boolean).join(' ');

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
        <svg x={x} y={y} className="bemo-grid-pattern__squares">
          {squares.map(([sx, sy]) => (
            <rect
              key={`${sx}-${sy}`}
              className="bemo-grid-pattern__square"
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
