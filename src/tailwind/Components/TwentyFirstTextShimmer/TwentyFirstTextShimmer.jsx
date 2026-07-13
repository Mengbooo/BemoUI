import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
    ...(baseColor ? { '--base-color': baseColor } : {}),
    ...(gradientColor ? { '--base-gradient-color': gradientColor } : {}),
  };

  const baseClasses = [
    'relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent',
    'bg-no-repeat',
    '[--base-color:#a1a1aa] [--base-gradient-color:#000000]',
    'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]',
    '[background-image:var(--bg),linear-gradient(var(--base-color),var(--base-color))]',
    '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'motion-reduce:bg-none motion-reduce:text-[var(--base-color)] motion-reduce:[background-clip:unset] motion-reduce:[-webkit-background-clip:unset] motion-reduce:[-webkit-text-fill-color:var(--base-color)]',
    className,
  ].filter(Boolean).join(' ');

  if (prefersReducedMotion) {
    return (
      <Component
        className={baseClasses}
        style={{
          ...style,
          backgroundImage: 'none',
          color: 'var(--base-color)',
          WebkitTextFillColor: 'var(--base-color)',
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      className={baseClasses}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
});

TwentyFirstTextShimmer.displayName = 'TwentyFirstTextShimmer';

export default TwentyFirstTextShimmer;

/* Keyframes not required; animation driven by framer-motion backgroundPosition.
   For pure CSS fallback if needed:
@keyframes bemo-text-shimmer {
  0% { background-position: 100% center; }
  100% { background-position: 0% center; }
}
*/
