import React, { useRef, useState, useEffect, ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { motion, useInView, Variant, Transition, UseInViewOptions } from 'framer-motion';

export type TwentyFirstInViewVariants = {
  hidden: Variant;
  visible: Variant;
};

export type TwentyFirstInViewProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  variants?: TwentyFirstInViewVariants;
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: T;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'ref'>;

const defaultVariants: TwentyFirstInViewVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function TwentyFirstInView<T extends ElementType = 'div'>({
  children,
  variants = defaultVariants,
  transition,
  viewOptions = { amount: 0.2, margin: '0px' },
  as,
  once = false,
  className = '',
  style,
  ...props
}: TwentyFirstInViewProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, viewOptions);
  const [isViewed, setIsViewed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const Component = as || 'div';
  const MotionComponent = (motion as any)[Component as string] || motion.div;

  const shouldAnimate = prefersReducedMotion ? true : (isInView || isViewed);

  return (
    <MotionComponent
      ref={ref}
      className={`relative block box-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:opacity-50 ${className}`.trim()}
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

/* Tailwind v4 keyframes if needed for custom variants:
@keyframes bemo-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes bemo-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
*/
