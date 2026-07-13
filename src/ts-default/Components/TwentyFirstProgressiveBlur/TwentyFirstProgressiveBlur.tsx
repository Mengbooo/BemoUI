import React, { type CSSProperties, type HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import './TwentyFirstProgressiveBlur.css';

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

export type ProgressiveBlurDirection = keyof typeof GRADIENT_ANGLES;

export type TwentyFirstProgressiveBlurProps = {
  direction?: ProgressiveBlurDirection;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
  /** Force reduced-motion behavior (also respects prefers-reduced-motion) */
  reducedMotion?: boolean;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(' ');
}

export function TwentyFirstProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  reducedMotion = false,
  style,
  ...props
}: TwentyFirstProgressiveBlurProps) {
  const layers = Math.max(Number(blurLayers) || 2, 2);
  const intensity = Math.max(0, Number(blurIntensity) || 0);
  const segmentSize = 1 / (layers + 1);
  const angle = GRADIENT_ANGLES[direction] ?? GRADIENT_ANGLES.bottom;

  const prefersReduced =
    reducedMotion ||
    (typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

  return (
    <div
      className={cn('bemo-21st-progressive-blur', className)}
      style={style}
      data-direction={direction}
      aria-hidden="true"
      {...(props as HTMLAttributes<HTMLDivElement>)}
    >
      {Array.from({ length: layers }).map((_, index) => {
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`;
        const blurValue = prefersReduced ? 0 : index * intensity;

        return (
          <motion.div
            key={index}
            className="bemo-21st-progressive-blur__layer"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${blurValue}px)`,
              WebkitBackdropFilter: `blur(${blurValue}px)`,
            }}
            initial={false}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default TwentyFirstProgressiveBlur;
