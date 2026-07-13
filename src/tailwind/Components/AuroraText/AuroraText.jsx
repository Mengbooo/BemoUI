import { memo } from 'react';

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
    <span className={`relative inline-block${className ? ` ${className}` : ''}`}>
      <span className="sr-only">{children}</span>
      <span
        className="relative inline-block bg-[length:200%_auto] bg-clip-text text-transparent animate-[bemo-aurora_var(--bemo-aurora-duration,10s)_linear_infinite] motion-reduce:animate-none"
        style={{
          backgroundImage: gradient,
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

/*
 * Required global keyframes for Tailwind v4 (add to your global CSS or @theme):
 *
 * @keyframes bemo-aurora {
 *   0% { background-position: 0% 50%; }
 *   50% { background-position: 100% 50%; }
 *   100% { background-position: 0% 50%; }
 * }
 */
