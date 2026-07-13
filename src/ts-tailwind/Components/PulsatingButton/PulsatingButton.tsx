import React from 'react';

export interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
  distance?: string;
  variant?: 'pulse' | 'ripple';
}

const PulsatingButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonProps
>(function PulsatingButton(
  {
    className = '',
    children,
    pulseColor = '#1620E4',
    duration = '1.5s',
    distance = '8px',
    variant = 'pulse',
    disabled = false,
    type = 'button',
    style,
    ...props
  },
  ref
) {
  const effectClass =
    variant === 'ripple'
      ? 'bemo-pulsating-button-ripple pointer-events-none absolute inset-0 z-0 rounded-[inherit]'
      : 'bemo-pulsating-button-pulse pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-inherit';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={[
        'relative inline-flex items-center justify-center rounded-lg border-0 px-4 py-2 text-center font-inherit leading-tight',
        'cursor-pointer bg-[#1620E4] text-white',
        'hover:enabled:brightness-105 active:enabled:brightness-95',
        'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6]',
        'disabled:cursor-not-allowed disabled:opacity-55',
        'disabled:[&_.bemo-pulsating-button-pulse]:animate-none disabled:[&_.bemo-pulsating-button-ripple]:animate-none disabled:[&_.bemo-pulsating-button-pulse]:opacity-0 disabled:[&_.bemo-pulsating-button-ripple]:opacity-0',
        'motion-reduce:[&_.bemo-pulsating-button-pulse]:animate-none motion-reduce:[&_.bemo-pulsating-button-ripple]:animate-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--bemo-pulse-color': pulseColor,
          '--bemo-duration': duration,
          '--bemo-distance': distance,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden="true" className={effectClass} />
    </button>
  );
});

PulsatingButton.displayName = 'PulsatingButton';

export { PulsatingButton };
export default PulsatingButton;

/*
Required global Tailwind v4 keyframes / utilities (add to your CSS entry):

@keyframes bemo-pulsating-button-pulse {
  0% { box-shadow: 0 0 0 0 var(--bemo-pulse-color, #1620E4); opacity: 0.75; }
  70% { box-shadow: 0 0 0 var(--bemo-distance, 8px) transparent; opacity: 0; }
  100% { box-shadow: 0 0 0 0 transparent; opacity: 0; }
}

@keyframes bemo-pulsating-button-ripple {
  0% { transform: scale(1); opacity: 0.55; box-shadow: inset 0 0 0 2px var(--bemo-pulse-color, #1620E4); }
  100% { transform: scale(1.35); opacity: 0; box-shadow: inset 0 0 0 2px transparent; }
}

.bemo-pulsating-button-pulse {
  animation: bemo-pulsating-button-pulse var(--bemo-duration, 1.5s) ease-out infinite;
}

.bemo-pulsating-button-ripple {
  animation: bemo-pulsating-button-ripple var(--bemo-duration, 1.5s) ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .bemo-pulsating-button-pulse,
  .bemo-pulsating-button-ripple {
    animation: none;
  }
}
*/
