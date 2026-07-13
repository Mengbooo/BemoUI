import { useId, type ReactNode, type HTMLAttributes } from 'react';
import './Backlight.css';

export interface BacklightProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /** Standard deviation of the Gaussian blur applied to the backlight glow. */
  blur?: number;
  /** When true, disables the backlight filter effect. */
  disabled?: boolean;
}

export default function Backlight({
  blur = 20,
  children,
  className = '',
  disabled = false,
  ...props
}: BacklightProps) {
  const rawId = useId();
  const filterId = `bemo-backlight-${rawId.replace(/:/g, '')}`;
  const safeBlur = Number.isFinite(blur) && blur >= 0 ? blur : 20;

  return (
    <div
      className={`bemo-backlight${disabled ? ' bemo-backlight--disabled' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {!disabled && (
        <svg
          className="bemo-backlight__svg"
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
        className="bemo-backlight__content"
        style={disabled ? undefined : { filter: `url(#${filterId})` }}
      >
        {children}
      </div>
    </div>
  );
}
