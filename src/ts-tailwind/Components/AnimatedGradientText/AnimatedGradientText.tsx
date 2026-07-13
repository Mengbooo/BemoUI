import React, { type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react';

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<'span'> {
  children?: ReactNode;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className = '',
  speed = 1,
  colorFrom = '#1620E4',
  colorTo = '#7BE9C6',
  style,
  ...props
}: AnimatedGradientTextProps) {
  const safeSpeed = typeof speed === 'number' && Number.isFinite(speed) && speed > 0 ? speed : 1;

  const mergedStyle: CSSProperties & Record<'--bemo-agt-bg-size' | '--bemo-agt-color-from' | '--bemo-agt-color-to', string> = {
    '--bemo-agt-bg-size': `${safeSpeed * 300}%`,
    '--bemo-agt-color-from': colorFrom,
    '--bemo-agt-color-to': colorTo,
    ...style,
  };

  return (
    <span
      className={
        [
          'inline bg-linear-to-r from-(--bemo-agt-color-from) via-(--bemo-agt-color-to) to-(--bemo-agt-color-from)',
          'bg-size-[var(--bemo-agt-bg-size)_100%] bg-clip-text text-transparent',
          'animate-[bemo-agt-gradient_8s_linear_infinite]',
          'motion-reduce:animate-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')
      }
      style={mergedStyle}
      {...props}
    >
      {children}
    </span>
  );
}

export default AnimatedGradientText;

/*
Required global keyframes (add to your global CSS for Tailwind v4):

@keyframes bemo-agt-gradient {
  to {
    background-position: var(--bemo-agt-bg-size) 0;
  }
}
*/
