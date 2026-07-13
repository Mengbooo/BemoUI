import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './ScrollProgress.css';

export function ScrollProgress({
  className = '',
  disabled = false,
  style,
  ...props
}) {
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
