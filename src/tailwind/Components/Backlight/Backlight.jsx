import { useId } from 'react';

export default function Backlight({
  blur = 20,
  children,
  className = '',
  disabled = false,
  ...props
}) {
  const rawId = useId();
  const filterId = `bemo-backlight-${rawId.replace(/:/g, '')}`;
  const safeBlur = Number.isFinite(blur) && blur >= 0 ? blur : 20;

  return (
    <div
      className={`relative inline-block ${disabled ? 'bemo-backlight-disabled' : ''} ${className}`.trim()}
      {...props}
    >
      {!disabled && (
        <svg
          className="pointer-events-none absolute h-0 w-0 overflow-hidden"
          width="0"
          height="0"
          aria-hidden="true"
          focusable="false"
        >
          <filter id={filterId} y="-50%" x="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={safeBlur}
              result="blurred"
            />
            <feColorMatrix type="saturate" in="blurred" values="4" />
            <feComposite in="SourceGraphic" operator="over" />
          </filter>
        </svg>
      )}
      <div
        className="relative motion-reduce:![filter:none]"
        style={disabled ? undefined : { filter: `url(#${filterId})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* Required global keyframes: none — Backlight uses static SVG filters only (no CSS animations). */
