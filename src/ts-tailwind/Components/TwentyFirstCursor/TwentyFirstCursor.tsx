import React, { useEffect, useState, useRef, type ReactNode, type CSSProperties } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type SpringOptions,
  type Transition,
  type Variant,
} from 'framer-motion';

export type TwentyFirstCursorProps = {
  children: ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export const TwentyFirstCursor: React.FC<TwentyFirstCursorProps> = ({
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
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

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

    const updatePosition = (e: MouseEvent) => {
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

  const springOpts: SpringOptions = springConfig || {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  };
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

    parent.addEventListener('mouseenter', handleEnter);
    parent.addEventListener('mouseleave', handleLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleEnter);
      parent.removeEventListener('mouseleave', handleLeave);
      parent.style.cursor = 'auto';
    };
  }, [attachToParent]);

  const defaultVariants = {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.6, opacity: 0 },
  };

  const resolvedVariants = variants || defaultVariants;
  const resolvedTransition: Transition =
    transition || { type: 'spring', stiffness: 400, damping: 25 };

  return (
    <motion.div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-50 will-change-transform ${className}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      } as CSSProperties}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="cursor-content"
            className="flex items-center justify-center origin-center"
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

/* Tailwind v4 keyframes (add to global CSS if needed):
@keyframes bemo-21st-cursor-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.9; }
}
.bemo-21st-cursor-pulse {
  animation: bemo-21st-cursor-pulse 1.6s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .bemo-21st-cursor-pulse { animation: none; }
}
*/
