import type { CSSProperties, HTMLAttributes } from 'react';
import './AnimatedCircularProgressBar.css';

export interface AnimatedCircularProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  min?: number;
  value?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor = '#1620E4',
  gaugeSecondaryColor = '#7BE9C6',
  className = '',
  style,
  ...props
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const range = max - min || 1;
  const clampedValue = Math.min(Math.max(Number(value) || 0, min), max);
  const currentPercent = Math.round(((clampedValue - min) / range) * 100);

  const rootStyle = {
    '--bemo-acpb-circle-size': '100px',
    '--bemo-acpb-circumference': String(circumference),
    '--bemo-acpb-percent-to-px': `${percentPx}px`,
    '--bemo-acpb-gap-percent': '5',
    '--bemo-acpb-offset-factor': '0',
    '--bemo-acpb-transition-length': '1s',
    '--bemo-acpb-delay': '0s',
    '--bemo-acpb-percent-to-deg': '3.6deg',
    ...style,
  } as CSSProperties;

  return (
    <div
      className={['bemo-animated-circular-progress-bar', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      style={rootStyle}
      {...props}
    >
      <svg
        fill="none"
        className="bemo-animated-circular-progress-bar__svg"
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
            className="bemo-animated-circular-progress-bar__circle bemo-animated-circular-progress-bar__circle--secondary"
            style={{
              stroke: gaugeSecondaryColor,
              '--bemo-acpb-stroke-percent': String(90 - currentPercent),
              '--bemo-acpb-offset-factor-secondary': 'calc(1 - var(--bemo-acpb-offset-factor))',
            } as CSSProperties}
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
          className="bemo-animated-circular-progress-bar__circle bemo-animated-circular-progress-bar__circle--primary"
          style={{
            stroke: gaugePrimaryColor,
            '--bemo-acpb-stroke-percent': String(currentPercent),
          } as CSSProperties}
        />
      </svg>
      <span
        className="bemo-animated-circular-progress-bar__value"
        data-current-value={currentPercent}
      >
        {currentPercent}
      </span>
    </div>
  );
}
