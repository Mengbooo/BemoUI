import React, { type RefObject } from 'react';
import { motion, useScroll, useSpring, type MotionStyle, type SpringOptions } from 'framer-motion';

export type TwentyFirstScrollProgressProps = {
  className?: string;
  springOptions?: SpringOptions;
  containerRef?: RefObject<HTMLElement | null>;
  color?: string;
  height?: number | string;
  position?: 'top' | 'bottom';
  zIndex?: number;
} & React.ComponentPropsWithoutRef<typeof motion.div>;

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function TwentyFirstScrollProgress({
  className = '',
  springOptions,
  containerRef,
  color = '#1620E4',
  height = 4,
  position = 'top',
  zIndex = 50,
  style,
  ...props
}: TwentyFirstScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef as RefObject<HTMLElement> | undefined,
    layoutEffect: Boolean(containerRef?.current),
  });

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  });

  const positionClasses =
    position === 'bottom'
      ? 'bottom-0 top-auto'
      : 'top-0 bottom-auto';

  const mergedStyle: MotionStyle = {
    scaleX,
    backgroundColor: color,
    height: typeof height === 'number' ? `${height}px` : height,
    zIndex,
    ...style,
  };

  return (
    <motion.div
      className={`fixed inset-x-0 w-full origin-left pointer-events-none ${positionClasses} ${className}`.trim()}
      style={mergedStyle}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      {...props}
    />
  );
}

export default TwentyFirstScrollProgress;

/*
Required keyframes / notes for Tailwind v4:
- No custom keyframes; driven by framer-motion.
- Accent defaults: #1620E4 / #7BE9C6
*/
