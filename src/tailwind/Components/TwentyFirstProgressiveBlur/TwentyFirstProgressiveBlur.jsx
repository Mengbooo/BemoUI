import { motion } from 'framer-motion';

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

function cn(...classes) {
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
}) {
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
      className={cn(
        'relative block pointer-events-none isolate focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]',
        className
      )}
      style={style}
      data-direction={direction}
      aria-hidden="true"
      {...props}
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
            className="pointer-events-none absolute inset-0 rounded-[inherit] motion-reduce:backdrop-blur-none"
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

/* Tailwind v4 keyframes (none required for progressive blur layers) */
