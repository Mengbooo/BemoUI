import { motion, useReducedMotion } from 'framer-motion';

/**
 * TwentyFirstTextRoll – 3D letter-by-letter text roll animation (Tailwind v4).
 * Adapted from Motion Primitives (MIT) for BemoUI.
 */
export function TwentyFirstTextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className = '',
  transition = { ease: 'easeIn' },
  variants,
  onAnimationComplete,
  as: Component = 'span',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();
  const letters = String(children ?? '').split('');

  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 },
      animate: { rotateX: 90 },
    },
    exit: {
      initial: { rotateX: 90 },
      animate: { rotateX: 0 },
    },
  };

  const enterInitial = variants?.enter?.initial ?? defaultVariants.enter.initial;
  const enterAnimate = variants?.enter?.animate ?? defaultVariants.enter.animate;
  const exitInitial = variants?.exit?.initial ?? defaultVariants.exit.initial;
  const exitAnimate = variants?.exit?.animate ?? defaultVariants.exit.animate;

  if (shouldReduceMotion) {
    return (
      <Component
        className={`inline-block font-semibold text-neutral-950 leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1620E4] aria-disabled:opacity-50 aria-disabled:pointer-events-none ${className}`.trim()}
        {...rest}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={`inline-block font-semibold text-neutral-950 leading-tight perspective-[1000px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1620E4] aria-disabled:opacity-50 aria-disabled:pointer-events-none ${className}`.trim()}
      {...rest}
    >
      {letters.map((letter, i) => (
        <span
          key={`${i}-${letter}`}
          className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] w-auto"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
            initial={enterInitial}
            animate={enterAnimate}
            transition={{
              ...transition,
              duration,
              delay: getEnterDelay(i),
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
            initial={exitInitial}
            animate={exitAnimate}
            transition={{
              ...transition,
              duration,
              delay: getExitDelay(i),
            }}
            onAnimationComplete={
              letters.length === i + 1 ? onAnimationComplete : undefined
            }
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <span className="invisible">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </Component>
  );
}

export default TwentyFirstTextRoll;

/* Tailwind v4 keyframes note: no custom @keyframes required – animation is driven by framer-motion rotateX transforms. Reduced-motion is handled via useReducedMotion. */
