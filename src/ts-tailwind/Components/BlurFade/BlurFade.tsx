import { useRef, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type MotionProps,
  type UseInViewOptions,
  type Variants,
} from 'framer-motion';

type MarginType = UseInViewOptions['margin'];

export interface BlurFadeProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: {
    hidden: { y?: number; x?: number; opacity?: number; filter?: string };
    visible: { y?: number; x?: number; opacity?: number; filter?: string };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

const getFilter = (v: Variants[string] | undefined) =>
  typeof v === 'function' || v == null
    ? undefined
    : (v as { filter?: string }).filter;

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
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const prefersReducedMotion = useReducedMotion();

  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const hiddenOffset =
    direction === 'right' || direction === 'down' ? -offset : offset;

  const defaultVariants: Variants = {
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

  const combinedVariants: Variants = (variant as Variants | undefined) ?? defaultVariants;
  const hiddenFilter = getFilter(combinedVariants.hidden);
  const visibleFilter = getFilter(combinedVariants.visible);
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
