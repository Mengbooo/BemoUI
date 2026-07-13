import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './TwentyFirstTransitionPanel.css';

const defaultVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
};

const defaultTransition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.9,
};

export default function TwentyFirstTransitionPanel({
  children,
  className = '',
  transition = defaultTransition,
  activeIndex = 0,
  variants = defaultVariants,
  custom,
  onAnimationComplete,
  ...motionProps
}) {
  const childArray = React.Children.toArray(children);
  const safeIndex = Math.max(0, Math.min(activeIndex, childArray.length - 1));
  const [direction, setDirection] = useState(0);
  const [prevIndex, setPrevIndex] = useState(safeIndex);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (safeIndex !== prevIndex) {
      setDirection(safeIndex > prevIndex ? 1 : -1);
      setPrevIndex(safeIndex);
    }
  }, [safeIndex, prevIndex]);

  const resolvedVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : variants;

  const resolvedTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : transition;

  if (childArray.length === 0) {
    return null;
  }

  return (
    <div
      className={`bemo-21st-transition-panel-root ${className}`.trim()}
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence
        initial={false}
        mode="popLayout"
        custom={custom !== undefined ? custom : direction}
      >
        <motion.div
          key={safeIndex}
          className="bemo-21st-transition-panel-panel"
          variants={resolvedVariants}
          transition={resolvedTransition}
          initial="enter"
          animate="center"
          exit="exit"
          custom={custom !== undefined ? custom : direction}
          onAnimationComplete={onAnimationComplete}
          {...motionProps}
        >
          {childArray[safeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
