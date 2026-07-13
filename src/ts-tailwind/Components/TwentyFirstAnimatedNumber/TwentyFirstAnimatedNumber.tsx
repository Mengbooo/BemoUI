import React, { useEffect, type ElementType, type ComponentPropsWithoutRef } from 'react';
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion';

export type TwentyFirstAnimatedNumberProps<T extends ElementType = 'span'> = {
  /** Target numeric value to animate toward */
  value: number;
  /** Additional CSS class names */
  className?: string;
  /** Framer Motion spring configuration */
  springOptions?: SpringOptions;
  /** Polymorphic element type (default: 'span') */
  as?: T;
  /** Custom formatter for the displayed number */
  format?: (value: number) => string;
  /** Disable animation updates */
  disabled?: boolean;
  /** Accessible label */
  'aria-label'?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'value'>;

/**
 * TwentyFirstAnimatedNumber (Tailwind) - Animates a number with spring physics.
 * Adapted from Motion Primitives (MIT) by ibelick.
 */
export function TwentyFirstAnimatedNumber<T extends ElementType = 'span'>({
  value = 0,
  className = '',
  springOptions = { mass: 0.8, stiffness: 75, damping: 15 },
  as,
  format,
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}: TwentyFirstAnimatedNumberProps<T>) {
  const Component = (as || 'span') as ElementType;
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    if (typeof format === 'function') {
      return format(rounded);
    }
    return rounded.toLocaleString();
  });

  useEffect(() => {
    if (!disabled) {
      spring.set(value);
    }
  }, [spring, value, disabled]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      if (mediaQuery.matches) {
        spring.jump(value);
      }
    };
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [spring, value]);

  return (
    <MotionComponent
      className={`inline-block tabular-nums [font-feature-settings:"tnum"] leading-tight text-inherit transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 focus-visible:rounded-sm data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed motion-reduce:transition-none ${className}`}
      aria-label={ariaLabel || `Animated number: ${value}`}
      aria-live="polite"
      aria-atomic="true"
      data-disabled={disabled || undefined}
      {...props}
    >
      {display}
    </MotionComponent>
  );
}

export default TwentyFirstAnimatedNumber;

/*
  No custom keyframes required — animation is driven by framer-motion springs.
  Optional accent utilities: text-[#1620E4] text-[#7BE9C6] font-bold text-4xl md:text-5xl tracking-tight
*/
