import './RetroGrid.css';

const MIN_ANGLE = 1;
const MAX_ANGLE = 89;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
}) {
  const normalizedAngle = clamp(Number(angle) || 65, MIN_ANGLE, MAX_ANGLE);
  const normalizedCellSize = Math.max(Number(cellSize) || 60, 1);
  const normalizedOpacity = clamp(Number(opacity) || 0.5, 0, 1);

  return (
    <div
      className={['bemo-retro-grid', className].filter(Boolean).join(' ')}
      style={{
        ...style,
        opacity: normalizedOpacity,
        '--bemo-retro-grid-angle': `${normalizedAngle}deg`,
        '--bemo-retro-grid-cell-size': `${normalizedCellSize}px`,
        '--bemo-retro-grid-light-color': lightLineColor,
        '--bemo-retro-grid-dark-color': darkLineColor,
      }}
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
