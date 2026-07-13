import React, {
  useMemo,
  useId,
  useEffect,
  useState,
  type ElementType,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from 'react';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';
import './TwentyFirstTextMorph.css';

export type TwentyFirstTextMorphProps<T extends ElementType = 'p'> = {
  children: string;
  as?: T;
  className?: string;
  style?: CSSProperties;
  variants?: Variants;
  transition?: Transition;
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style'>;

const defaultVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

function TwentyFirstTextMorph<T extends ElementType = 'p'>({
  children,
  as,
  className = '',
  style,
  variants,
  transition,
  disabled = false,
  ...rest
}: TwentyFirstTextMorphProps<T>) {
  const Component = (as || 'p') as ElementType;
  const uniqueId = useId();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const characters = useMemo(() => {
    const text = typeof children === 'string' ? children : String(children ?? '');
    const charCounts: Record<string, number> = {};
    return text.split('').map((char) => {
      const lowerChar = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;
      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: char === ' ' ? '\u00A0' : char,
      };
    });
  }, [children, uniqueId]);

  const resolvedVariants: Variants =
    prefersReducedMotion || disabled
      ? {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        }
      : variants || defaultVariants;

  const resolvedTransition: Transition =
    prefersReducedMotion || disabled
      ? { duration: 0 }
      : transition || defaultTransition;

  const rootClass = [
    'bemo-21st-text-morph',
    disabled ? 'bemo-21st-text-morph--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={rootClass}
      aria-label={typeof children === 'string' ? children : undefined}
      style={style}
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={prefersReducedMotion || disabled ? undefined : character.id}
            className="bemo-21st-text-morph__char"
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={resolvedVariants}
            transition={resolvedTransition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}

export default TwentyFirstTextMorph;
