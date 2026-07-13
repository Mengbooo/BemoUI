import React, { useMemo, type CSSProperties, type ElementType, type ComponentPropsWithoutRef } from 'react';
import { motion, type HTMLMotionProps, type Transition } from 'framer-motion';
import './TwentyFirstTextShimmerWave.css';

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
 * TwentyFirstTextShimmerWave
 * A wave-style text shimmer with 3D per-character animation.
 * Adapted from Motion Primitives (MIT) – https://21st.dev/@ibelick/components/text-shimmer-wave
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
    'bemo-21st-text-shimmer-wave',
    disabled ? 'bemo-21st-text-shimmer-wave--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars: CSSProperties = {
    ['--bemo-21st-base-color' as string]:
      baseColor || 'var(--bemo-21st-text-shimmer-wave-base, #71717a)',
    ['--bemo-21st-gradient-color' as string]:
      gradientColor || 'var(--bemo-21st-text-shimmer-wave-gradient, #ffffff)',
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
            className="bemo-21st-text-shimmer-wave__char"
            initial={{
              translateZ: 0,
              scale: 1,
              rotateY: 0,
              color: 'var(--bemo-21st-base-color)',
            }}
            animate={{
              translateZ: [0, zDistance, 0],
              translateX: [0, xDistance, 0],
              translateY: [0, yDistance, 0],
              scale: [1, scaleDistance, 1],
              rotateY: [0, rotateYDistance, 0],
              color: [
                'var(--bemo-21st-base-color)',
                'var(--bemo-21st-gradient-color)',
                'var(--bemo-21st-base-color)',
              ],
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
