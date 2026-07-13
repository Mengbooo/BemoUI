import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './TwentyFirstInView.css';

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function TwentyFirstInView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions = { amount: 0.2, margin: '0px' },
  as = 'div',
  once = false,
  className = '',
  style,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const [isViewed, setIsViewed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const MotionComponent = motion[as] || motion.div;

  const shouldAnimate = prefersReducedMotion ? true : (isInView || isViewed);

  return (
    <MotionComponent
      ref={ref}
      className={`bemo-21st-in-view ${className}`.trim()}
      style={style}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? undefined : variants}
      transition={prefersReducedMotion ? { duration: 0 } : transition}
      onAnimationComplete={() => {
        if (once) setIsViewed(true);
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default TwentyFirstInView;
