import React, { type ComponentPropsWithoutRef, type ElementType } from 'react';
import {
  motion,
  useReducedMotion,
  type Target,
  type TargetAndTransition,
  type Transition,
  type VariantLabels,
} from 'framer-motion';
import './TwentyFirstTextRoll.css';

export type TextRollVariants = {
  enter: {
    initial: Target | VariantLabels | boolean;
    animate: TargetAndTransition | VariantLabels;
  };
  exit: {
    initial: Target | VariantLabels | boolean;
    animate: TargetAndTransition | VariantLabels;
  };
};

export type TwentyFirstTextRollProps<T extends ElementType = 'span'> = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: TextRollVariants;
  onAnimationComplete?: () => void;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'as'>;

/**
 * TwentyFirstTextRoll – 3D letter-by-letter text roll animation.
 * Adapted from Motion Primitives (MIT) for BemoUI.
 * https://21st.dev/@ibelick/components/text-roll
 */
export function TwentyFirstTextRoll<T extends ElementType = 'span'>({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className = '',
  transition = { ease: 'easeIn' },
  variants,
  onAnimationComplete,
  as,
  ...rest
}: TwentyFirstTextRollProps<T>) {
  const Component = (as || 'span') as ElementType;
  const shouldReduceMotion = useReducedMotion();
  const letters = String(children ?? '').split('');

  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 },
      animate: { rotateX: 90 },
    },
    exit: {
      initial: { rotateX: 90 },
      animate: { rotateX: 0 },
    },
  } as const;

  const enterInitial = variants?.enter?.initial ?? defaultVariants.enter.initial;
  const enterAnimate = variants?.enter?.animate ?? defaultVariants.enter.animate;
  const exitInitial = variants?.exit?.initial ?? defaultVariants.exit.initial;
  const exitAnimate = variants?.exit?.animate ?? defaultVariants.exit.animate;

  if (shouldReduceMotion) {
    return (
      <Component
        className={`bemo-21st-text-roll ${className}`.trim()}
        {...rest}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={`bemo-21st-text-roll ${className}`.trim()}
      {...rest}
    >
      {letters.map((letter, i) => (
        <span
          key={`${i}-${letter}`}
          className="bemo-21st-text-roll__char"
          aria-hidden="true"
        >
          <motion.span
            className="bemo-21st-text-roll__face bemo-21st-text-roll__face--enter"
            initial={enterInitial}
            animate={enterAnimate}
            transition={{
              ...transition,
              duration,
              delay: getEnterDelay(i),
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <motion.span
            className="bemo-21st-text-roll__face bemo-21st-text-roll__face--exit"
            initial={exitInitial}
            animate={exitAnimate}
            transition={{
              ...transition,
              duration,
              delay: getExitDelay(i),
            }}
            onAnimationComplete={
              letters.length === i + 1 ? onAnimationComplete : undefined
            }
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <span className="bemo-21st-text-roll__placeholder">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        </span>
      ))}
      <span className="bemo-21st-text-roll__sr-only">{children}</span>
    </Component>
  );
}

export default TwentyFirstTextRoll;
