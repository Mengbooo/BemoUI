import type { CSSProperties, HTMLAttributes } from 'react';
import './BorderBeam.css';

export interface BorderBeamProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the border beam in pixels. */
  size?: number;
  /** Duration of one full loop in seconds. */
  duration?: number;
  /** Start delay in seconds (applied as a negative animation delay). */
  delay?: number;
  /** Start color of the beam gradient. */
  colorFrom?: string;
  /** Mid color of the beam gradient. */
  colorTo?: string;
  /** Reverse the travel direction of the beam. */
  reverse?: boolean;
  /** Initial offset along the path (0–100). */
  initialOffset?: number;
  /** Border width in pixels used for the beam mask. */
  borderWidth?: number;
  className?: string;
  style?: CSSProperties;
}

export const BorderBeam = ({
  className = '',
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#1620E4',
  colorTo = '#7BE9C6',
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
  ...rest
}: BorderBeamProps) => {
  const start = reverse ? `${100 - initialOffset}%` : `${initialOffset}%`;
  const end = reverse ? `${-initialOffset}%` : `${100 + initialOffset}%`;

  return (
    <div
      className="bemo-border-beam"
      style={
        {
          '--bemo-border-beam-width': `${borderWidth}px`,
        } as CSSProperties
      }
      aria-hidden="true"
      {...rest}
    >
      <div
        className={['bemo-border-beam__beam', className].filter(Boolean).join(' ')}
        style={
          {
            width: size,
            '--bemo-border-beam-size': `${size}px`,
            '--bemo-border-beam-duration': `${duration}s`,
            '--bemo-border-beam-delay': `${-delay}s`,
            '--bemo-border-beam-from': colorFrom,
            '--bemo-border-beam-to': colorTo,
            '--bemo-border-beam-start': start,
            '--bemo-border-beam-end': end,
            ...style,
          } as CSSProperties
        }
      />
    </div>
  );
};

export default BorderBeam;
