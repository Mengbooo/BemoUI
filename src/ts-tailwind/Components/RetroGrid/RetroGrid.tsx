import type { CSSProperties, HTMLAttributes } from 'react';

const MIN_ANGLE = 1;
const MAX_ANGLE = 89;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export interface RetroGridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the grid container
   */
  className?: string;
  /**
   * Rotation angle of the grid in degrees
   * @default 65
   */
  angle?: number;
  /**
   * Grid cell size in pixels
   * @default 60
   */
  cellSize?: number;
  /**
   * Grid opacity value between 0 and 1
   * @default 0.5
   */
  opacity?: number;
  /**
   * Grid line color in light mode
   * @default "#1620E4"
   */
  lightLineColor?: string;
  /**
   * Grid line color in dark mode
   * @default "#7BE9C6"
   */
  darkLineColor?: string;
}

export function RetroGrid({
  className = '',
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = '#1620E4',
  darkLineColor = '#7BE9C6',
  style,
  ...props
}: RetroGridProps) {
  const normalizedAngle = clamp(Number(angle) || 65, MIN_ANGLE, MAX_ANGLE);
  const normalizedCellSize = Math.max(Number(cellSize) || 60, 1);
  const normalizedOpacity = clamp(Number(opacity) || 0.5, 0, 1);

  const lightGridStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${lightLineColor} 1px, transparent 0), linear-gradient(to bottom, ${lightLineColor} 1px, transparent 0)`,
    backgroundSize: `${normalizedCellSize}px ${normalizedCellSize}px`,
  };

  const darkGridStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${darkLineColor} 1px, transparent 0), linear-gradient(to bottom, ${darkLineColor} 1px, transparent 0)`,
    backgroundSize: `${normalizedCellSize}px ${normalizedCellSize}px`,
  };

  const containerStyle = {
    ...style,
    opacity: normalizedOpacity,
    '--bemo-retro-grid-angle': `${normalizedAngle}deg`,
  } as CSSProperties;

  return (
    <div
      className={['pointer-events-none absolute inset-0 size-full overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      style={containerStyle}
      aria-hidden="true"
      {...props}
    >
      <div className="absolute inset-0 [perspective:200px]">
        <div className="absolute inset-0 [transform:rotateX(var(--bemo-retro-grid-angle,65deg))]">
          <div
            className="absolute inset-[0%_0] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] translate-y-[-50%] animate-[bemo-retro-grid-scroll_15s_linear_infinite] bg-repeat dark:hidden motion-reduce:animate-none motion-reduce:translate-y-[-50%]!"
            style={lightGridStyle}
          />
          <div
            className="absolute inset-[0%_0] ml-[-200%] hidden h-[300vh] w-[600vw] origin-[100%_0_0] translate-y-[-50%] animate-[bemo-retro-grid-scroll_15s_linear_infinite] bg-repeat dark:block motion-reduce:animate-none motion-reduce:translate-y-[-50%]!"
            style={darkGridStyle}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
}

export default RetroGrid;

/*
Required global keyframes (add once to your global CSS):

@keyframes bemo-retro-grid-scroll {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .motion-reduce\:animate-none {
    animation: none !important;
  }
}
*/
