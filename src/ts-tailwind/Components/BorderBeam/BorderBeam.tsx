import type { CSSProperties, HTMLAttributes } from 'react';

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
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-solid border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-clip:padding-box,border-box] [mask-composite:intersect] [-webkit-mask-composite:source-in] motion-reduce:[&>*]:![animation:none]"
      style={{ borderWidth: `${borderWidth}px` }}
      aria-hidden="true"
      {...rest}
    >
      <div
        className={["absolute aspect-square bg-linear-to-l from-(--bemo-bb-from) via-(--bemo-bb-to) to-transparent [offset-path:rect(0_auto_auto_0_round_var(--bemo-bb-size))] [animation:bemo-border-beam_var(--bemo-bb-duration)_linear_infinite] [animation-delay:var(--bemo-bb-delay)]", className].filter(Boolean).join(' ')}
        style={
          {
            width: size,
            '--bemo-bb-size': `${size}px`,
            '--bemo-bb-duration': `${duration}s`,
            '--bemo-bb-delay': `${-delay}s`,
            '--bemo-bb-from': colorFrom,
            '--bemo-bb-to': colorTo,
            '--bemo-bb-start': start,
            '--bemo-bb-end': end,
            ...style,
          } as CSSProperties
        }
      />
    </div>
  );
};

export default BorderBeam;

/*
Required global keyframes (add to your global CSS / Tailwind v4 entry):

@keyframes bemo-border-beam {
  from { offset-distance: var(--bemo-bb-start, 0%); }
  to { offset-distance: var(--bemo-bb-end, 100%); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes bemo-border-beam {
    from, to { offset-distance: var(--bemo-bb-start, 0%); }
  }
}
*/
