
const DEFAULT_BLUR_LEVELS = [0.5, 1, 2, 4, 8, 16, 32, 64];

function sanitizeBlurLevels(blurLevels) {
  if (!Array.isArray(blurLevels) || blurLevels.length === 0) {
    return DEFAULT_BLUR_LEVELS;
  }

  const levels = blurLevels.filter(
    (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0
  );

  return levels.length > 0 ? levels : DEFAULT_BLUR_LEVELS;
}

function getMaskImage(position, kind, blurIndex = 0) {
  if (position === 'both') {
    return 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)';
  }

  const direction = position === 'top' ? 'to top' : 'to bottom';

  if (kind === 'first') {
    return `linear-gradient(${direction}, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`;
  }

  if (kind === 'last') {
    return `linear-gradient(${direction}, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`;
  }

  const startPercent = blurIndex * 12.5;
  const midPercent = (blurIndex + 1) * 12.5;
  const endPercent = (blurIndex + 2) * 12.5;

  return `linear-gradient(${direction}, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`;
}

export function ProgressiveBlur({
  className = '',
  height = '30%',
  position = 'bottom',
  blurLevels = DEFAULT_BLUR_LEVELS,
  children,
  ...rest
}) {
  const levels = sanitizeBlurLevels(blurLevels);
  const safePosition =
    position === 'top' || position === 'both' || position === 'bottom'
      ? position
      : 'bottom';

  const middleCount = Math.max(levels.length - 2, 0);
  const positionClass =
    safePosition === 'top'
      ? 'top-0'
      : safePosition === 'both'
        ? 'inset-y-0'
        : 'bottom-0';

  const rootClassName = [
    'pointer-events-none absolute inset-x-0 z-10',
    positionClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClassName}
      style={{ height: safePosition === 'both' ? '100%' : height }}
      aria-hidden="true"
      {...rest}
    >
      <div
        className="bemo-progressive-blur-layer absolute inset-0 motion-reduce:!backdrop-filter-none"
        style={{
          zIndex: 1,
          backdropFilter: `blur(${levels[0]}px)`,
          WebkitBackdropFilter: `blur(${levels[0]}px)`,
          maskImage: getMaskImage(safePosition, 'first'),
          WebkitMaskImage: getMaskImage(safePosition, 'first'),
        }}
      />

      {Array.from({ length: middleCount }, (_, index) => {
        const blurIndex = index + 1;
        const mask = getMaskImage(safePosition, 'middle', blurIndex);

        return (
          <div
            key={`bemo-progressive-blur-layer-${blurIndex}`}
            className="bemo-progressive-blur-layer absolute inset-0 motion-reduce:!backdrop-filter-none"
            style={{
              zIndex: blurIndex + 1,
              backdropFilter: `blur(${levels[blurIndex]}px)`,
              WebkitBackdropFilter: `blur(${levels[blurIndex]}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}

      {levels.length > 1 ? (
        <div
          className="bemo-progressive-blur-layer absolute inset-0 motion-reduce:!backdrop-filter-none"
          style={{
            zIndex: levels.length,
            backdropFilter: `blur(${levels[levels.length - 1]}px)`,
            WebkitBackdropFilter: `blur(${levels[levels.length - 1]}px)`,
            maskImage: getMaskImage(safePosition, 'last'),
            WebkitMaskImage: getMaskImage(safePosition, 'last'),
          }}
        />
      ) : null}

      {children}
    </div>
  );
}

export default ProgressiveBlur;

/*
Required global styles (Tailwind v4):
- No keyframes are required; ProgressiveBlur is a static layered backdrop-filter effect.
- Optional reduced-motion hardening (inline styles otherwise win specificity):

@media (prefers-reduced-motion: reduce) {
  .bemo-progressive-blur-layer {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
*/
