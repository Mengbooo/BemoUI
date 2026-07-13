import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './TwentyFirstTextScramble.css';

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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
}) {
  const MotionComponent = motion(Component);
  const [scrambledText, setScrambledText] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const text = typeof children === 'string' ? children : String(children ?? '');
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
  // Trigger state owns this lifecycle; callback identity changes while scrambling.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, disabled]);

  useEffect(() => {
    return () => {
      clearScramble();
    };
  }, [clearScramble]);

  const rootClass = [
    'bemo-21st-text-scramble',
    disabled ? 'bemo-21st-text-scramble--disabled' : '',
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
