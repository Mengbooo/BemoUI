import React from 'react';
import './PulsatingButton.css';

const PulsatingButton = React.forwardRef(function PulsatingButton(
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
  const classes = ['bemo-pulsating-button', className].filter(Boolean).join(' ');
  const effectClass =
    variant === 'ripple'
      ? 'bemo-pulsating-button__effect bemo-pulsating-button__effect--ripple'
      : 'bemo-pulsating-button__effect bemo-pulsating-button__effect--pulse';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={classes}
      style={{
        '--bemo-pulse-color': pulseColor,
        '--bemo-duration': duration,
        '--bemo-distance': distance,
        ...style,
      }}
      {...props}
    >
      <span className="bemo-pulsating-button__content">{children}</span>
      <span aria-hidden="true" className={effectClass} />
    </button>
  );
});

PulsatingButton.displayName = 'PulsatingButton';

export { PulsatingButton };
export default PulsatingButton;
