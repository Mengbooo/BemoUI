import React, { useEffect, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { motion, type Transition } from 'framer-motion';

export type TwentyFirstBorderTrailProps = {
  /** Extra class names on the root wrapper */
  className?: string;
  /** Trail marker size in px (also used for path corner radius) */
  size?: number;
  /** Animation duration in seconds when using the default transition */
  duration?: number;
  /** framer-motion transition override */
  transition?: Transition;
  /** Called when a cycle completes */
  onAnimationComplete?: () => void;
  /** Inline styles applied to the moving trail element */
  style?: CSSProperties;
  /** Primary trail color (default Bemo accent #1620E4) */
  color?: string;
  /** Optional explicit trail background (falls back to color) */
  trailColor?: string;
  /** Mask border width in px */
  borderWidth?: number | string;
  /** Disables animation and dims the trail */
  disabled?: boolean;
  /** When true, respects prefers-reduced-motion */
  reducedMotionFallback?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'style' | 'onAnimationComplete'>;

/**
 * TwentyFirstBorderTrail (Tailwind v4 self-contained TSX)
 */
export function TwentyFirstBorderTrail({
  className = '',
  size = 60,
  duration = 5,
  transition,
  onAnimationComplete,
  style,
  color = '#1620E4',
  trailColor,
  borderWidth = 1,
  disabled = false,
  reducedMotionFallback = true,
  ...rest
}: TwentyFirstBorderTrailProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const shouldAnimate = !disabled && !(reducedMotionFallback && prefersReducedMotion);
  const defaultTransition: Transition = {
    repeat: Infinity,
    duration,
    ease: 'linear',
  };
  const resolvedTransition = transition || defaultTransition;
  const trailBg = trailColor || color || '#1620E4';

  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] z-0 ${className}`.trim()}
      data-disabled={disabled || undefined}
      data-reduced-motion={!shouldAnimate || undefined}
      aria-hidden="true"
      {...rest}
    >
      <div
        className="absolute inset-0 rounded-[inherit] border-solid border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [-webkit-mask-composite:destination-out] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [-webkit-mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        style={{
          borderWidth: typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
        }}
      >
        {shouldAnimate ? (
          <motion.div
            className="absolute aspect-square rounded-full will-change-[offset-distance] shadow-[0_0_8px_color-mix(in_srgb,#7BE9C6_55%,transparent),0_0_16px_color-mix(in_srgb,#1620E4_40%,transparent)] max-sm:shadow-[0_0_4px_color-mix(in_srgb,#7BE9C6_45%,transparent),0_0_10px_color-mix(in_srgb,#1620E4_30%,transparent)]"
            style={{
              width: size,
              height: size,
              backgroundColor: trailBg,
              offsetPath: `rect(0 auto auto 0 round ${size}px)`,
              ...style,
            }}
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            transition={resolvedTransition}
            onAnimationComplete={onAnimationComplete}
          />
        ) : (
          <div
            className="absolute aspect-square rounded-full opacity-85 top-0 left-0 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_color-mix(in_srgb,#7BE9C6_40%,transparent),0_0_12px_color-mix(in_srgb,#1620E4_30%,transparent)]"
            style={{
              width: size,
              height: size,
              backgroundColor: trailBg,
              ...style,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TwentyFirstBorderTrail;

/*
  Optional keyframes if replacing framer-motion later:
  @keyframes bemo-21st-border-trail-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
*/
