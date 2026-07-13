import React, { useMemo, type CSSProperties } from 'react';
import { motion, type HTMLMotionProps, type Transition } from 'framer-motion';

function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(' ');
}

export type GlowEffectMode =
  | 'rotate'
  | 'pulse'
  | 'breathe'
  | 'colorShift'
  | 'flowHorizontal'
  | 'static';

export type GlowEffectBlur =
  | number
  | 'softest'
  | 'soft'
  | 'medium'
  | 'strong'
  | 'stronger'
  | 'strongest'
  | 'none';

export interface TwentyFirstGlowEffectProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  className?: string;
  style?: CSSProperties;
  colors?: string[];
  mode?: GlowEffectMode;
  blur?: GlowEffectBlur;
  transition?: Transition;
  scale?: number;
  duration?: number;
}

const DEFAULT_COLORS = ['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6'];

const BASE_TRANSITION: Transition = {
  repeat: Infinity,
  duration: 5,
  ease: 'linear',
};

function getBlurClass(blur: GlowEffectBlur): string {
  if (typeof blur === 'number') {
    return '';
  }
  const presets: Record<Exclude<GlowEffectBlur, number>, string> = {
    softest: 'blur-[2px]',
    soft: 'blur-sm',
    medium: 'blur-md',
    strong: 'blur-lg',
    stronger: 'blur-xl',
    strongest: 'blur-2xl',
    none: 'blur-none',
  };
  return presets[blur] || presets.medium;
}

export function TwentyFirstGlowEffect({
  className,
  style,
  colors = DEFAULT_COLORS,
  mode = 'rotate',
  blur = 'medium',
  transition,
  scale = 1,
  duration = 5,
  ...rest
}: TwentyFirstGlowEffectProps) {
  const safeColors = Array.isArray(colors) && colors.length > 0 ? colors : DEFAULT_COLORS;
  const safeDuration = typeof duration === 'number' && duration > 0 ? duration : 5;
  const safeScale = typeof scale === 'number' && scale > 0 ? scale : 1;

  const baseTransition = useMemo(
    () => ({
      ...BASE_TRANSITION,
      duration: safeDuration,
    }),
    [safeDuration]
  );

  const animations = useMemo(() => {
    return {
      rotate: {
        background: [
          `conic-gradient(from 0deg at 50% 50%, ${safeColors.join(', ')})`,
          `conic-gradient(from 360deg at 50% 50%, ${safeColors.join(', ')})`,
        ],
        transition: {
          ...(transition ?? baseTransition),
        },
      },
      pulse: {
        background: safeColors.map(
          (color) =>
            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
        ),
        scale: [1 * safeScale, 1.1 * safeScale, 1 * safeScale],
        opacity: [0.5, 0.8, 0.5],
        transition: {
          ...(transition ?? {
            ...baseTransition,
            repeatType: 'mirror' as const,
          }),
        },
      },
      breathe: {
        background: [
          ...safeColors.map(
            (color) =>
              `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
          ),
        ],
        scale: [1 * safeScale, 1.05 * safeScale, 1 * safeScale],
        transition: {
          ...(transition ?? {
            ...baseTransition,
            repeatType: 'mirror' as const,
          }),
        },
      },
      colorShift: {
        background: safeColors.map((color, index) => {
          const nextColor = safeColors[(index + 1) % safeColors.length];
          return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
        }),
        transition: {
          ...(transition ?? {
            ...baseTransition,
            repeatType: 'mirror' as const,
          }),
        },
      },
      flowHorizontal: {
        background: safeColors.map((color, index) => {
          const nextColor = safeColors[(index + 1) % safeColors.length];
          return `linear-gradient(to right, ${color}, ${nextColor})`;
        }),
        transition: {
          ...(transition ?? {
            ...baseTransition,
            repeatType: 'mirror' as const,
          }),
        },
      },
      static: {
        background: `linear-gradient(to right, ${safeColors.join(', ')})`,
      },
    };
  }, [safeColors, safeScale, transition, baseTransition]);

  const blurClass = getBlurClass(blur);
  const customBlurStyle: CSSProperties | undefined =
    typeof blur === 'number'
      ? { filter: `blur(${Math.max(0, blur)}px)` }
      : undefined;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateProps = prefersReducedMotion
    ? { background: animations.static.background }
    : animations[mode] || animations.rotate;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        ...style,
        ...customBlurStyle,
        '--scale': safeScale,
        willChange: 'transform, opacity, background',
        backfaceVisibility: 'hidden',
      } as CSSProperties}
      animate={animateProps}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'scale-[var(--scale)] transform-gpu',
        blurClass,
        'motion-reduce:animate-none motion-reduce:transition-none',
        className
      )}
      {...rest}
    />
  );
}

export default TwentyFirstGlowEffect;

/* Tailwind v4 keyframes comment:
Animations are handled by framer-motion. No custom @keyframes required for core functionality.
Optional global:
@keyframes bemo-glow-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}
*/
