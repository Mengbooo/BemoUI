import { motion, useScroll, useSpring } from 'framer-motion';

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

  const positionClasses =
    position === 'bottom'
      ? 'bottom-0 top-auto'
      : 'top-0 bottom-auto';

  return (
    <motion.div
      className={`fixed inset-x-0 w-full origin-left pointer-events-none ${positionClasses} ${className}`.trim()}
      style={{
        scaleX,
        backgroundColor: color,
        height: typeof height === 'number' ? `${height}px` : height,
        zIndex,
      }}
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
- No custom keyframes needed; animation is driven by framer-motion useSpring + scaleX.
- prefers-reduced-motion is respected by framer-motion when reduced motion is preferred (or can be enforced via media query on consumers).
- Example utility extensions if needed:
  @theme {
    --color-bemo-accent: #1620E4;
    --color-bemo-accent-secondary: #7BE9C6;
  }
*/
