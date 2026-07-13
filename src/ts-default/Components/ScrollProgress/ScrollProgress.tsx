import { useState, type CSSProperties, type HTMLAttributes, type Ref } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  type MotionProps,
} from 'framer-motion';
import './ScrollProgress.css';

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
        'bemo-scroll-progress',
        disabled ? 'bemo-scroll-progress--disabled' : '',
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
