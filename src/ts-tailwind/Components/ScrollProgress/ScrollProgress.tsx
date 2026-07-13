import { useState, type CSSProperties, type HTMLAttributes, type Ref } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  type MotionProps,
} from 'framer-motion';

export interface ScrollProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function ScrollProgress({
  className = '',
  disabled = false,
  style,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [value, setValue] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!disabled) {
      setValue(Math.round(latest * 100));
    }
  });

  return (
    <motion.div
      className={[
        'fixed inset-x-0 top-0 z-50 h-px origin-left pointer-events-none',
        'bg-linear-to-r from-[#1620E4] to-[#7BE9C6]',
        disabled ? 'opacity-0 invisible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label="Page scroll progress"
      aria-hidden={disabled ? true : undefined}
      {...props}
      style={{
        ...style,
        scaleX: disabled ? 0 : scrollYProgress,
      }}
    />
  );
}

export default ScrollProgress;

/* Required global Tailwind v4 keyframes: none.
   ScrollProgress drives scaleX from scroll position via framer-motion MotionValues;
   no @keyframes are required. Prefer a global reduced-motion rule such as:
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after { animation: none !important; transition: none !important; }
   }
*/
