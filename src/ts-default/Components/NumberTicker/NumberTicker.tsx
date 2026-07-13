import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import './NumberTicker.css';

export interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
}

export default function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  className = '',
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const [displayValue, setDisplayValue] = useState(startValue);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (!isInView) return undefined;

    const target = direction === 'down' ? startValue : value;

    if (prefersReducedMotion) {
      setDisplayValue(target);
      return undefined;
    }

    timer = setTimeout(() => {
      motionValue.set(target);
    }, delay * 1000);

    return () => {
      if (timer !== null) clearTimeout(timer);
    };
  }, [motionValue, isInView, delay, value, direction, startValue, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Number(latest.toFixed(decimalPlaces)));
    });

    return () => unsubscribe();
  }, [springValue, decimalPlaces, prefersReducedMotion]);

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(displayValue);

  return (
    <span
      ref={ref}
      className={['bemo-number-ticker', className].filter(Boolean).join(' ')}
      aria-live="polite"
      {...props}
    >
      {formatted}
    </span>
  );
}
