import { useMemo } from 'react';
import { motion } from 'framer-motion';
import './TwentyFirstTextShimmerWave.css';

/**
 * TwentyFirstTextShimmerWave
 * A wave-style text shimmer with 3D per-character animation.
 * Adapted from Motion Primitives (MIT) – https://21st.dev/@ibelick/components/text-shimmer-wave
 */
export function TwentyFirstTextShimmerWave({
  children,
  as: Component = 'p',
  className = '',
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.1,
  rotateYDistance = 10,
  baseColor,
  gradientColor,
  transition,
  disabled = false,
  style,
  ...rest
}) {
  const MotionComponent = useMemo(
    () => motion(Component),
    [Component]
  );

  const chars = useMemo(() => {
    if (typeof children !== 'string') return [];
    return children.split('');
  }, [children]);

  const text = typeof children === 'string' ? children : '';

  const rootClass = [
    'bemo-21st-text-shimmer-wave',
    disabled ? 'bemo-21st-text-shimmer-wave--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars = {
    '--bemo-21st-base-color': baseColor || 'var(--bemo-21st-text-shimmer-wave-base, #71717a)',
    '--bemo-21st-gradient-color':
      gradientColor || 'var(--bemo-21st-text-shimmer-wave-gradient, #ffffff)',
    ...style,
  };

  if (disabled || !text) {
    return (
      <Component
        className={rootClass}
        style={cssVars}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      className={rootClass}
      style={cssVars}
      aria-label={text}
      {...rest}
    >
      {chars.map((char, i) => {
        const delay = (i * duration * (1 / Math.max(spread, 0.01))) / Math.max(chars.length, 1);

        return (
          <motion.span
            key={`${i}-${char}`}
            className="bemo-21st-text-shimmer-wave__char"
            initial={{
              translateZ: 0,
              scale: 1,
              rotateY: 0,
              color: 'var(--bemo-21st-base-color)',
            }}
            animate={{
              translateZ: [0, zDistance, 0],
              translateX: [0, xDistance, 0],
              translateY: [0, yDistance, 0],
              scale: [1, scaleDistance, 1],
              rotateY: [0, rotateYDistance, 0],
              color: [
                'var(--bemo-21st-base-color)',
                'var(--bemo-21st-gradient-color)',
                'var(--bemo-21st-base-color)',
              ],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatDelay: (chars.length * 0.05) / Math.max(spread, 0.01),
              delay,
              ease: 'easeInOut',
              ...transition,
            }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}

export default TwentyFirstTextShimmerWave;
