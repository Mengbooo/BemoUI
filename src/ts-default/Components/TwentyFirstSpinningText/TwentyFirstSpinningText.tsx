import React, { CSSProperties, type ReactNode } from 'react';
import { motion, type HTMLMotionProps, type Transition, type Variants } from 'framer-motion';
import './TwentyFirstSpinningText.css';

export type TwentyFirstSpinningTextProps = {
  children: string | ReactNode;
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  disabled?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'style'>;

const BASE_TRANSITION: Transition = {
  repeat: Infinity,
  ease: 'linear',
};

const BASE_ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(' ');
}

export function TwentyFirstSpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  fontSize = 1,
  radius = 5,
  transition,
  variants,
  disabled = false,
  ...props
}: TwentyFirstSpinningTextProps) {
  const text = typeof children === 'string' ? children : String(children ?? '');
  const letters = text.split('');
  const totalLetters = letters.length || 1;

  const finalTransition: Transition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number } | undefined)?.duration ?? duration,
  };

  const containerVariants: Variants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants: Variants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  const prefersReduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (disabled || prefersReduced) {
    return (
      <div
        className={cn('bemo-21st-spinning-text', 'bemo-21st-spinning-text--static', className)}
        style={style}
        role="text"
        aria-label={text}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        <span className="bemo-21st-spinning-text__static-text">{text}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={cn('bemo-21st-spinning-text', className)}
      style={style}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
      role="img"
      aria-label={text}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="bemo-21st-spinning-text__letter"
          style={
            {
              '--index': index,
              '--total': totalLetters,
              '--font-size': fontSize,
              '--radius': radius,
            } as CSSProperties
          }
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
      <span className="bemo-21st-spinning-text__sr-only">{text}</span>
    </motion.div>
  );
}

export default TwentyFirstSpinningText;
