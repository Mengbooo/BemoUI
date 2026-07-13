import React, { useMemo, type CSSProperties, type ElementType, type ComponentPropsWithoutRef } from 'react';
import { motion, type HTMLMotionProps, type Transition } from 'framer-motion';

export type TwentyFirstTextShimmerWaveProps<T extends ElementType = 'p'> = {
  children: string;
  as?: T;
  className?: string;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
  baseColor?: string;
  gradientColor?: string;
  transition?: Transition;
  disabled?: boolean;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'as' | 'className' | 'style' | 'disabled'>;

/**
 * TwentyFirstTextShimmerWave (Tailwind v4 + TypeScript)
 * Wave-style text shimmer with 3D per-character animation.
 * Adapted from Motion Primitives (MIT).
 */
export function TwentyFirstTextShimmerWave<T extends ElementType = 'p'>({
  children,
  as,
  className = '',
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.1,
  rotateYDistance = 10,
  baseColor,
  gradientColor,
  transition,
  disabled = false,
  style,
  ...rest
}: TwentyFirstTextShimmerWaveProps<T>) {
  const Component = (as || 'p') as ElementType;

  const MotionComponent = useMemo(
    () => motion(Component as keyof JSX.IntrinsicElements) as React.ComponentType<HTMLMotionProps<'p'>>,
    [Component]
  );

  const chars = useMemo(() => {
    if (typeof children !== 'string') return [] as string[];
    return children.split('');
  }, [children]);

  const text = typeof children === 'string' ? children : '';

  const rootClass = [
    'relative inline-block [perspective:500px] whitespace-pre-wrap m-0 p-0 border-0 bg-transparent box-border',
    'focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-4 focus-visible:rounded-sm',
    disabled ? 'opacity-55 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars: CSSProperties = {
    ['--bemo-base' as string]: baseColor || '#71717a',
    ['--bemo-gradient' as string]: gradientColor || '#ffffff',
    color: 'var(--bemo-base)',
    ...style,
  };

  if (disabled || !text) {
    return (
      <Component
        className={rootClass}
        style={cssVars}
        aria-disabled={disabled || undefined}
        {...(rest as object)}
      >
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      className={rootClass}
      style={cssVars}
      aria-label={text}
      {...(rest as object)}
    >
      {chars.map((char, i) => {
        const delay =
          (i * duration * (1 / Math.max(spread, 0.01))) /
          Math.max(chars.length, 1);

        return (
          <motion.span
            key={`${i}-${char}`}
            className="inline-block whitespace-pre [transform-style:preserve-3d] will-change-[transform,color] [backface-visibility:hidden] motion-reduce:!transform-none motion-reduce:!transition-none"
            initial={{
              translateZ: 0,
              scale: 1,
              rotateY: 0,
              color: 'var(--bemo-base)',
            }}
            animate={{
              translateZ: [0, zDistance, 0],
              translateX: [0, xDistance, 0],
              translateY: [0, yDistance, 0],
              scale: [1, scaleDistance, 1],
              rotateY: [0, rotateYDistance, 0],
              color: ['var(--bemo-base)', 'var(--bemo-gradient)', 'var(--bemo-base)'],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatDelay: (chars.length * 0.05) / Math.max(spread, 0.01),
              delay,
              ease: 'easeInOut',
              ...transition,
            }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}

export default TwentyFirstTextShimmerWave;

/*
  Tailwind v4 note: prefers-reduced-motion via motion-reduce: utilities.
  Optional pure-CSS keyframes fallback:
  @keyframes bemo-21st-wave-pulse {
    0%, 100% { transform: translateZ(0) scale(1) rotateY(0); color: var(--bemo-base); }
    50% { transform: translateZ(10px) scale(1.1) rotateY(10deg); color: var(--bemo-gradient); }
  }
*/
