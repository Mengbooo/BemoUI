import React, { useEffect, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variant,
  type MotionProps,
} from 'framer-motion';

export type TransitionPanelVariants = {
  enter: Variant;
  center: Variant;
  exit: Variant;
};

export type TwentyFirstTransitionPanelProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  transition?: Transition;
  activeIndex?: number;
  variants?: TransitionPanelVariants;
  custom?: number;
  onAnimationComplete?: () => void;
} & Omit<MotionProps, 'variants' | 'transition' | 'custom' | 'initial' | 'animate' | 'exit'>;

const defaultVariants: TransitionPanelVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
};

const defaultTransition: Transition = {
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
}: TwentyFirstTransitionPanelProps) {
  const childArray = React.Children.toArray(children);
  const safeIndex = Math.max(0, Math.min(activeIndex, Math.max(childArray.length - 1, 0)));
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

  const resolvedVariants: TransitionPanelVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : variants;

  const resolvedTransition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : transition;

  if (childArray.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full overflow-hidden text-neutral-900 bg-transparent ${className}`.trim()}
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
          className="w-full outline-none will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] focus-within:shadow-[0_0_0_2px_#1620E4] motion-reduce:transition-none"
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

/* Tailwind v4 keyframes (if needed):
@keyframes bemo-21st-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
*/
