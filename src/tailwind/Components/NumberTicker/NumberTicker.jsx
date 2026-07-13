import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  className = '',
  ...props
}) {
  const ref = useRef(null);
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
    let timer = null;

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
      className={[
        'inline-block tracking-wider tabular-nums font-semibold text-[#1620E4]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7BE9C6] focus-visible:outline-offset-2 rounded-sm',
        'motion-reduce:transition-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-live="polite"
      {...props}
    >
      {formatted}
    </span>
  );
}

/* Tailwind v4 global keyframes: none required — animation is driven by framer-motion springs. */
