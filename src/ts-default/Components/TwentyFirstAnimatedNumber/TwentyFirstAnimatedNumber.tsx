import React, { useEffect, type ElementType, type ComponentPropsWithoutRef } from 'react';
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion';
import './TwentyFirstAnimatedNumber.css';

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
 * TwentyFirstAnimatedNumber - Animates a number with spring physics.
 * Adapted from Motion Primitives (MIT) by ibelick.
 * https://21st.dev/@ibelick/components/animated-number
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

  const baseClass = 'bemo-21st-animated-number';
  const classes = [
    baseClass,
    disabled ? `${baseClass}--disabled` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <MotionComponent
      className={classes}
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
