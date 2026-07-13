import { useRef } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';

export default function BlurFade({
  children,
  className = '',
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = 'down',
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
  ...props
}) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const prefersReducedMotion = useReducedMotion();

  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const hiddenOffset =
    direction === 'right' || direction === 'down' ? -offset : offset;

  const defaultVariants = {
    hidden: {
      [axis]: prefersReducedMotion ? 0 : hiddenOffset,
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blur})`,
    },
    visible: {
      [axis]: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
  };

  const combinedVariants = variant ?? defaultVariants;
  const hiddenFilter =
    typeof combinedVariants.hidden === 'function'
      ? undefined
      : combinedVariants.hidden?.filter;
  const visibleFilter =
    typeof combinedVariants.visible === 'function'
      ? undefined
      : combinedVariants.visible?.filter;
  const shouldTransitionFilter =
    hiddenFilter != null &&
    visibleFilter != null &&
    hiddenFilter !== visibleFilter;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: prefersReducedMotion ? 0 : 0.04 + delay,
          duration: prefersReducedMotion ? 0 : duration,
          ease: 'easeOut',
          ...(shouldTransitionFilter && !prefersReducedMotion
            ? { filter: { duration } }
            : {}),
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/*
Required global keyframes: none.
Animations are handled by framer-motion (opacity, transform, and filter).
Optional reduced-motion is honored via useReducedMotion().
*/
