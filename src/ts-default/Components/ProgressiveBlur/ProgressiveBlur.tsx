import React from 'react';
import './ProgressiveBlur.css';

const DEFAULT_BLUR_LEVELS = [0.5, 1, 2, 4, 8, 16, 32, 64] as const;

export type ProgressiveBlurPosition = 'top' | 'bottom' | 'both';

export interface ProgressiveBlurProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: string;
  position?: ProgressiveBlurPosition;
  blurLevels?: number[];
  children?: React.ReactNode;
}

function sanitizeBlurLevels(blurLevels?: number[]): number[] {
  if (!Array.isArray(blurLevels) || blurLevels.length === 0) {
    return [...DEFAULT_BLUR_LEVELS];
  }

  const levels = blurLevels.filter(
    (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0
  );

  return levels.length > 0 ? levels : [...DEFAULT_BLUR_LEVELS];
}

function getMaskImage(
  position: ProgressiveBlurPosition,
  kind: 'first' | 'middle' | 'last',
  blurIndex = 0
): string {
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
  blurLevels = [...DEFAULT_BLUR_LEVELS],
  children,
  ...rest
}: ProgressiveBlurProps) {
  const levels = sanitizeBlurLevels(blurLevels);
  const safePosition: ProgressiveBlurPosition =
    position === 'top' || position === 'both' || position === 'bottom'
      ? position
      : 'bottom';

  const middleCount = Math.max(levels.length - 2, 0);
  const rootClassName = [
    'bemo-progressive-blur',
    `bemo-progressive-blur--${safePosition}`,
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
        className="bemo-progressive-blur__layer"
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
            className="bemo-progressive-blur__layer"
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
          className="bemo-progressive-blur__layer"
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
