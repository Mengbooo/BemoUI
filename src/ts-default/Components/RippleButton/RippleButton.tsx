import React, {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import './RippleButton.css';

export interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
}

interface RippleItem {
  x: number;
  y: number;
  size: number;
  key: number;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  function RippleButton(
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
    const [buttonRipples, setButtonRipples] = useState<RippleItem[]>([]);

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
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

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      createRipple(event);
      onClick?.(event);
    };

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null;

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
              style={
                {
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  '--bemo-ripple-duration': duration,
                } as CSSProperties
              }
            />
          ))}
        </span>
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

export default RippleButton;
