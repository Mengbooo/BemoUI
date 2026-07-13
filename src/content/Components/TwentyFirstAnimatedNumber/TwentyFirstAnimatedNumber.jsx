import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import './TwentyFirstAnimatedNumber.css';

/**
 * TwentyFirstAnimatedNumber - Animates a number with spring physics.
 * Adapted from Motion Primitives (MIT) by ibelick.
 * https://21st.dev/@ibelick/components/animated-number
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

  // Prefer reduced motion: snap immediately
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
