import { motion, useScroll, useSpring } from 'framer-motion';
import './TwentyFirstScrollProgress.css';

const DEFAULT_SPRING_OPTIONS = {
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
  ...props
}) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: Boolean(containerRef?.current),
  });

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions || {}),
  });

  const positionClass =
    position === 'bottom'
      ? 'bemo-21st-scroll-progress--bottom'
      : 'bemo-21st-scroll-progress--top';

  return (
    <motion.div
      className={`bemo-21st-scroll-progress ${positionClass} ${className}`.trim()}
      style={{
        scaleX,
        backgroundColor: color,
        height: typeof height === 'number' ? `${height}px` : height,
        zIndex,
      }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={undefined}
      aria-label="Page scroll progress"
      {...props}
    />
  );
}

export default TwentyFirstScrollProgress;
