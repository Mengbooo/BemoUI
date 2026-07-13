import React, { useRef, useState, useEffect, ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { motion, useInView, Variant, Transition, UseInViewOptions, HTMLMotionProps } from 'framer-motion';
import './TwentyFirstInView.css';

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
