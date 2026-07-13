import { memo } from 'react';
import './AuroraText.css';

export const AuroraText = memo(function AuroraText({
  children,
  className = '',
  colors = ['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6'],
  speed = 1,
}) {
  const safeSpeed = Math.max(Number(speed) || 1, 0.1);
  const gradient = `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`;
  const duration = `${10 / safeSpeed}s`;

  return (
    <span className={`bemo-aurora-text${className ? ` ${className}` : ''}`}>
      <span className="bemo-aurora-text__sr-only">{children}</span>
      <span
        className="bemo-aurora-text__visual"
        style={{
          '--bemo-aurora-gradient': gradient,
          '--bemo-aurora-duration': duration,
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = 'AuroraText';
