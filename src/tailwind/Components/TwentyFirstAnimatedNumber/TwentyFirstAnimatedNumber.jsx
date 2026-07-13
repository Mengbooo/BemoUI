import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * TwentyFirstAnimatedNumber (Tailwind) - Animates a number with spring physics.
 * Adapted from Motion Primitives (MIT) by ibelick.
 */
export function TwentyFirstAnimatedNumber({
  value = 0,
  className = '',
  springOptions = { mass: 0.8, stiffness: 75, damping: 15 },
  as: Component = 'span',
  format,
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) {
  const MotionComponent = motion(Component);

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
      className={`inline-block tabular-nums [font-feature-settings:"tnum"] leading-tight text-inherit transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 focus-visible:rounded-sm data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed motion-reduce:transition-none sm:text-[0.95em] ${className}`}
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
  Optional accent classes for consumers:
  text-[#1620E4] text-[#7BE9C6] font-bold text-4xl md:text-5xl tracking-tight
*/
