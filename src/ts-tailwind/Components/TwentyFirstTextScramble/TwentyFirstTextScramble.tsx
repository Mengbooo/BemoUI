import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export type TwentyFirstTextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
  disabled?: boolean;
} & Omit<HTMLMotionProps<'p'>, 'children'>;

export default function TwentyFirstTextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  as: Component = 'p',
  className = '',
  trigger = true,
  onScrambleComplete,
  disabled = false,
  ...props
}: TwentyFirstTextScrambleProps) {
  const MotionComponent = motion(
    Component as keyof JSX.IntrinsicElements
  ) as React.ComponentType<HTMLMotionProps<'p'>>;
  const [scrambledText, setScrambledText] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const text = children;
  const displayText = scrambledText ?? text;
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clearScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const scramble = useCallback(() => {
    if (isAnimating || disabled || prefersReducedMotion) {
      if (prefersReducedMotion && onScrambleComplete) {
        onScrambleComplete();
      }
      return;
    }
    setIsAnimating(true);

    const steps = Math.max(1, Math.ceil(duration / speed));
    let step = 0;

    clearScramble();

    intervalRef.current = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setScrambledText(scrambled);
      step++;

      if (step > steps) {
        clearScramble();
        setScrambledText(null);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  }, [
    isAnimating,
    disabled,
    prefersReducedMotion,
    duration,
    speed,
    text,
    characterSet,
    onScrambleComplete,
    clearScramble,
  ]);

  useEffect(() => {
    if (!trigger || disabled) return;
    scramble();
    return () => {
      clearScramble();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, disabled]);

  useEffect(() => {
    return () => {
      clearScramble();
    };
  }, [clearScramble]);

  const rootClass = [
    'inline-block m-0 font-mono tabular-nums tracking-wide leading-snug whitespace-pre-wrap break-words',
    'text-neutral-950 dark:text-neutral-100',
    'transition-colors duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] dark:focus-visible:outline-[#7BE9C6] focus-visible:rounded-sm',
    isAnimating ? 'text-[#1620E4] dark:text-[#7BE9C6]' : '',
    disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none text-neutral-500 dark:text-neutral-400'
      : 'hover:text-neutral-950 dark:hover:text-white',
    'motion-reduce:transition-none',
    'max-sm:text-[0.95em] max-sm:tracking-tight',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <MotionComponent
      className={rootClass}
      aria-live="polite"
      aria-busy={isAnimating}
      data-animating={isAnimating ? 'true' : 'false'}
      {...props}
    >
      {displayText}
    </MotionComponent>
  );
}

/* Tailwind v4 keyframes (none required; animation is JS-driven).
   Optional:
   @keyframes bemo-21st-text-scramble-pulse {
     0%, 100% { opacity: 1; }
     50% { opacity: 0.85; }
   }
*/
