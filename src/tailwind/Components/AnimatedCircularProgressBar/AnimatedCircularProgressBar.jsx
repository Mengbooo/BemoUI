export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor = '#1620E4',
  gaugeSecondaryColor = '#7BE9C6',
  className = '',
  style,
  ...props
}) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const range = max - min || 1;
  const clampedValue = Math.min(Math.max(Number(value) || 0, min), max);
  const currentPercent = Math.round(((clampedValue - min) / range) * 100);

  return (
    <div
      className={['relative size-40 text-2xl font-semibold text-black', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      style={{
        '--circle-size': '100px',
        '--circumference': String(circumference),
        '--percent-to-px': `${percentPx}px`,
        '--gap-percent': '5',
        '--offset-factor': '0',
        '--transition-length': '1s',
        '--delay': '0s',
        '--percent-to-deg': '3.6deg',
        transform: 'translateZ(0)',
        ...style,
      }}
      {...props}
    >
      <svg
        fill="none"
        className="size-full block"
        strokeWidth="2"
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        {currentPercent <= 90 && currentPercent >= 0 ? (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100 motion-reduce:transition-none"
            style={{
              stroke: gaugeSecondaryColor,
              '--stroke-percent': String(90 - currentPercent),
              '--offset-factor-secondary': 'calc(1 - var(--offset-factor))',
              strokeDasharray:
                'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
              transform:
                'rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)',
              transition: 'all var(--transition-length) ease var(--delay)',
              transformOrigin:
                'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
            }}
          />
        ) : null}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100 motion-reduce:transition-none"
          style={{
            stroke: gaugePrimaryColor,
            '--stroke-percent': String(currentPercent),
            strokeDasharray:
              'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
            transition:
              'var(--transition-length) ease var(--delay), stroke var(--transition-length) ease var(--delay)',
            transitionProperty: 'stroke-dasharray, transform',
            transform:
              'rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))',
            transformOrigin:
              'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
          }}
        />
      </svg>
      <span
        data-current-value={currentPercent}
        className="absolute inset-0 m-auto size-fit animate-[bemo-acpb-fade-in_var(--transition-length)_ease-linear_var(--delay)_both] motion-reduce:animate-none"
      >
        {currentPercent}
      </span>
    </div>
  );
}

/* Required global keyframes (Tailwind v4 @theme or global CSS):
@keyframes bemo-acpb-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
*/
