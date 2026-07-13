import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './TwentyFirstTextShimmer.css';

export const TwentyFirstTextShimmer = React.memo(function TwentyFirstTextShimmer({
  children,
  as: Component = 'p',
  className = '',
  duration = 2,
  spread = 2,
  baseColor,
  gradientColor,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const dynamicSpread = useMemo(() => {
    return (typeof children === 'string' ? children.length : 0) * spread;
  }, [children, spread]);

  const MotionComponent = motion(Component);

  const style = {
    '--spread': `${dynamicSpread}px`,
    '--base-color': baseColor || undefined,
    '--base-gradient-color': gradientColor || undefined,
  };

  if (prefersReducedMotion) {
    return (
      <Component
        className={`bemo-21st-text-shimmer bemo-21st-text-shimmer--reduced ${className}`.trim()}
        style={style}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      className={`bemo-21st-text-shimmer ${className}`.trim()}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={{
        ...style,
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
});

TwentyFirstTextShimmer.displayName = 'TwentyFirstTextShimmer';

export default TwentyFirstTextShimmer;
