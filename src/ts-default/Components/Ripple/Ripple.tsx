import React, { type ComponentPropsWithoutRef } from 'react';
import './Ripple.css';

export interface RippleProps extends ComponentPropsWithoutRef<'div'> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className = '',
  ...props
}: RippleProps) {
  const count = Math.min(Math.max(0, Math.floor(Number(numCircles) || 0)), 32);
  const baseSize = Math.max(0, Number(mainCircleSize) || 0);
  const baseOpacity = Math.min(1, Math.max(0, Number(mainCircleOpacity) || 0));

  return (
    <div
      className={['bemo-ripple', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const size = baseSize + i * 70;
        const opacity = Math.max(0, baseOpacity - i * 0.03);
        const isEven = i % 2 === 0;

        return (
          <div
            key={i}
            className={
              isEven
                ? 'bemo-ripple__circle bemo-ripple__circle--blue'
                : 'bemo-ripple__circle bemo-ripple__circle--green'
            }
            style={
              {
                '--bemo-ripple-i': i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay: `${i * 0.06}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';
