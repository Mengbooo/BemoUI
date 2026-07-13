import { useEffect, useState, type HTMLAttributes } from 'react';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import './WordRotate.css';

const DEFAULT_MOTION: MotionProps = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

const REDUCED_MOTION: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

export interface WordRotateProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export default function WordRotate({
  words = [],
  duration = 2500,
  motionProps,
  className = '',
  ...rest
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const safeWords = Array.isArray(words)
    ? words.filter((word): word is string => typeof word === 'string' && word.length > 0)
    : [];
  const safeDuration =
    Number.isFinite(duration) && duration > 0 ? duration : 2500;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (safeWords.length <= 1) return undefined;
    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
    }, Math.max(safeDuration, 300));
    return () => window.clearInterval(intervalId);
  }, [safeWords, safeDuration]);

  if (safeWords.length === 0) {
    return null;
  }

  const safeIndex = index % safeWords.length;
  const word = safeWords[safeIndex];
  const appliedMotion =
    motionProps ?? (prefersReducedMotion ? REDUCED_MOTION : DEFAULT_MOTION);
  const rootClass = ['bemo-word-rotate', className].filter(Boolean).join(' ');

  return (
    <span
      className={rootClass}
      aria-live="polite"
      aria-atomic="true"
      {...rest}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${word}-${safeIndex}`}
          className="bemo-word-rotate__word"
          {...appliedMotion}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
