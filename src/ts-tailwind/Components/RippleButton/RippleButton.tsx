import React, {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
} from 'react';

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

    const classes = [
      'relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-[#7BE9C6] bg-[#1620E4] px-4 py-2 text-center text-white cursor-pointer transition-opacity hover:opacity-90 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] focus-visible:shadow-[0_0_0_3px_#7BE9C6] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        type={type}
        className={classes}
        onClick={handleClick}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="pointer-events-none absolute inset-0" aria-hidden="true">
          {buttonRipples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute rounded-full opacity-30 animate-[rippling_var(--duration)_ease-out_forwards] motion-reduce:hidden"
              style={
                {
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: 'scale(0)',
                  '--duration': duration,
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

/* Required global keyframes (add to your CSS):
@keyframes rippling {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
*/
