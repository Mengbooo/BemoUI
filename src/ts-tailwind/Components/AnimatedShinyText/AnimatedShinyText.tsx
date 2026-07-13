import React, {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from 'react';

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className = '',
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={[
        'mx-auto max-w-md text-transparent',
        'bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat',
        'animate-shiny-text bg-linear-to-r from-transparent via-[#1620E4] via-[#7BE9C6] to-transparent',
        'motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-gray-600 motion-reduce:[-webkit-text-fill-color:currentColor]',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
};

/*
 * Required global keyframes for Tailwind v4 (add to your global CSS):
 *
 * @keyframes shiny-text {
 *   0% {
 *     background-position: calc(0% - var(--shiny-width));
 *   }
 *   100% {
 *     background-position: calc(100% + var(--shiny-width));
 *   }
 * }
 *
 * @theme inline {
 *   --animate-shiny-text: shiny-text 1.5s cubic-bezier(0.6, 0.6, 0, 1) infinite;
 * }
 */
