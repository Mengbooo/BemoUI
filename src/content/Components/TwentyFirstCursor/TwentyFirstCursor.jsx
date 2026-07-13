import { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import './TwentyFirstCursor.css';

export const TwentyFirstCursor = ({
  children,
  className = '',
  springConfig,
  attachToParent = false,
  transition,
  variants,
  onPositionChange,
}) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);
  const parentListenersRef = useRef({ enter: null, leave: null });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!attachToParent) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }

    const updatePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', updatePosition);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, onPositionChange, attachToParent]);

  const springOpts = springConfig || { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springOpts);
  const cursorYSpring = useSpring(cursorY, springOpts);

  useEffect(() => {
    if (!attachToParent || !cursorRef.current) return;

    const parent = cursorRef.current.parentElement;
    if (!parent) return;

    const handleEnter = () => {
      parent.style.cursor = 'none';
      setIsVisible(true);
    };
    const handleLeave = () => {
      parent.style.cursor = 'auto';
      setIsVisible(false);
    };

    parentListenersRef.current = { enter: handleEnter, leave: handleLeave };
    parent.addEventListener('mouseenter', handleEnter);
    parent.addEventListener('mouseleave', handleLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleEnter);
      parent.removeEventListener('mouseleave', handleLeave);
      parent.style.cursor = 'auto';
      parentListenersRef.current = { enter: null, leave: null };
    };
  }, [attachToParent]);

  const defaultVariants = {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.6, opacity: 0 },
  };

  const resolvedVariants = variants || defaultVariants;
  const resolvedTransition = transition || { type: 'spring', stiffness: 400, damping: 25 };

  return (
    <motion.div
      ref={cursorRef}
      className={`bemo-21st-cursor-root pointer-events-none fixed left-0 top-0 z-50 ${className}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="cursor-content"
            className="bemo-21st-cursor-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={resolvedVariants}
            transition={resolvedTransition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TwentyFirstCursor;
