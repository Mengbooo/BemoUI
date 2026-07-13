import React, { memo, type ReactNode, type CSSProperties } from 'react';
import './AuroraText.css';

export interface AuroraTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(function AuroraText({
  children,
  className = '',
  colors = ['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6'],
  speed = 1,
}: AuroraTextProps) {
  const safeSpeed = Math.max(Number(speed) || 1, 0.1);
  const gradient = `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`;
  const duration = `${10 / safeSpeed}s`;

  const visualStyle = {
    '--bemo-aurora-gradient': gradient,
    '--bemo-aurora-duration': duration,
  } as CSSProperties;

  return (
    <span className={`bemo-aurora-text${className ? ` ${className}` : ''}`}>
      <span className="bemo-aurora-text__sr-only">{children}</span>
      <span
        className="bemo-aurora-text__visual"
        style={visualStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = 'AuroraText';
