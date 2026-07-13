import { useState, useEffect, Children, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TwentyFirstTextLoop.css';

export function TwentyFirstTextLoop({
  children,
  className = '',
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = 'popLayout',
  as: Component = 'div',
  'aria-label': ariaLabel,
  ...rest
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useEffect(() => {
    if (!trigger || items.length <= 1) return;

    if (prefersReducedMotion.current) {
      // Still cycle for accessibility but without motion preference conflict;
      // interval can be longer or we respect reduced motion by skipping animation via variants.
    }

    const intervalMs = Math.max(0.5, interval) * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger]);

  const defaultVariants = prefersReducedMotion.current
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
      };

  const motionVariants = variants || defaultVariants;

  if (items.length === 0) {
    return null;
  }

  return (
    <Component
      className={`bemo-21st-text-loop ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel || 'Rotating text'}
      role="status"
      {...rest}
    >
      <AnimatePresence mode={mode} initial={false}>
        <motion.span
          key={currentIndex}
          className="bemo-21st-text-loop__item"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={prefersReducedMotion.current ? { duration: 0.01 } : transition}
          variants={motionVariants}
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </Component>
  );
}

export default TwentyFirstTextLoop;
