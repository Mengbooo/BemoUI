import React, { useEffect, useState } from 'react';
import './RippleButton.css';

const RippleButton = React.forwardRef(function RippleButton(
  {
    className = '',
    children,
    rippleColor = '#ffffff',
    duration = '600ms',
    onClick,
    disabled = false,
    type = 'button',
    ...props
  },
  ref
) {
  const [buttonRipples, setButtonRipples] = useState([]);

  const createRipple = (event) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setButtonRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
  };

  const handleClick = (event) => {
    if (disabled) return;
    createRipple(event);
    onClick?.(event);
  };

  useEffect(() => {
    let timeout = null;

    if (buttonRipples.length > 0) {
      const lastRipple = buttonRipples[buttonRipples.length - 1];
      const ms = parseInt(duration, 10);
      timeout = setTimeout(() => {
        setButtonRipples((prev) => prev.filter((ripple) => ripple.key !== lastRipple.key));
      }, Number.isFinite(ms) ? ms : 600);
    }

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [buttonRipples, duration]);

  const classes = ['bemo-ripple-button', className].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      <span className="bemo-ripple-button__content">{children}</span>
      <span className="bemo-ripple-button__ripples" aria-hidden="true">
        {buttonRipples.map((ripple) => (
          <span
            key={ripple.key}
            className="bemo-ripple-button__ripple"
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              backgroundColor: rippleColor,
              '--bemo-ripple-duration': duration,
            }}
          />
        ))}
      </span>
    </button>
  );
});

RippleButton.displayName = 'RippleButton';

export default RippleButton;
