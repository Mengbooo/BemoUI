import type { CSSProperties, HTMLAttributes } from 'react';
import './RetroGrid.css';

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

  const gridStyles = {
    ...style,
    opacity: normalizedOpacity,
    '--bemo-retro-grid-angle': `${normalizedAngle}deg`,
    '--bemo-retro-grid-cell-size': `${normalizedCellSize}px`,
    '--bemo-retro-grid-light-color': lightLineColor,
    '--bemo-retro-grid-dark-color': darkLineColor,
  } as CSSProperties;

  return (
    <div
      className={['bemo-retro-grid', className].filter(Boolean).join(' ')}
      style={gridStyles}
      aria-hidden="true"
      {...props}
    >
      <div className="bemo-retro-grid__perspective">
        <div className="bemo-retro-grid__plane">
          <div className="bemo-retro-grid__lines bemo-retro-grid__lines--light" />
          <div className="bemo-retro-grid__lines bemo-retro-grid__lines--dark" />
        </div>
      </div>
      <div className="bemo-retro-grid__fade" />
    </div>
  );
}

export default RetroGrid;
