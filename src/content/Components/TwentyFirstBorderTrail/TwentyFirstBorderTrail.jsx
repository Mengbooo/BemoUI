import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './TwentyFirstBorderTrail.css';

/**
 * TwentyFirstBorderTrail
 * Animated border trail that follows a rectangular path around its parent.
 * Adapted from Motion Primitives (MIT) / 21st.dev border-trail.
 */
export function TwentyFirstBorderTrail({
  className = '',
  size = 60,
  duration = 5,
  transition,
  onAnimationComplete,
  style,
  color = '#1620E4',
  trailColor,
  borderWidth = 1,
  disabled = false,
  reducedMotionFallback = true,
  ...rest
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const shouldAnimate = !disabled && !(reducedMotionFallback && prefersReducedMotion);

  const defaultTransition = {
    repeat: Infinity,
    duration,
    ease: 'linear',
  };

  const resolvedTransition = transition || defaultTransition;
  const trailBg = trailColor || color || '#1620E4';

  return (
    <div
      className={`bemo-21st-border-trail ${className}`.trim()}
      data-disabled={disabled || undefined}
      data-reduced-motion={!shouldAnimate || undefined}
      aria-hidden="true"
      {...rest}
    >
      <div
        className="bemo-21st-border-trail-mask"
        style={{
          borderWidth: typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
        }}
      >
        {shouldAnimate ? (
          <motion.div
            className="bemo-21st-border-trail-dot"
            style={{
              width: size,
              height: size,
              backgroundColor: trailBg,
              offsetPath: `rect(0 auto auto 0 round ${size}px)`,
              ...style,
            }}
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            transition={resolvedTransition}
            onAnimationComplete={onAnimationComplete}
          />
        ) : (
          <div
            className="bemo-21st-border-trail-dot bemo-21st-border-trail-dot--static"
            style={{
              width: size,
              height: size,
              backgroundColor: trailBg,
              ...style,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TwentyFirstBorderTrail;
