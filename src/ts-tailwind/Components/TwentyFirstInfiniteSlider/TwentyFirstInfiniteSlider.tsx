import React, { useState, useEffect, useRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function useMeasure(): [React.RefObject<HTMLDivElement>, { width: number; height: number }] {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setBounds({ width, height });
      }
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return [ref, bounds];
}

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}

export type TwentyFirstInfiniteSliderProps = {
  children: ReactNode;
  /** Gap between items in pixels. Default: 16 */
  gap?: number;
  /** Base speed in px/s. Default: 100 */
  speed?: number;
  /** Speed while hovered (px/s). If omitted, hover does not change speed. */
  speedOnHover?: number;
  /** Scroll direction. Default: 'horizontal' */
  direction?: 'horizontal' | 'vertical';
  /** Reverse the scroll direction. Default: false */
  reverse?: boolean;
  className?: string;
  /** Pause animation while hovered. */
  pauseOnHover?: boolean;
  /** Disable interaction and animation. */
  disabled?: boolean;
  /** Accessible label for the region. */
  'aria-label'?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function TwentyFirstInfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  pauseOnHover = false,
  disabled = false,
  'aria-label': ariaLabel = 'Infinite scrolling content',
  ...rest
}: TwentyFirstInfiniteSliderProps) {
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveSpeed =
    prefersReducedMotion || disabled
      ? 0
      : isHovering && typeof speedOnHover === 'number'
        ? speedOnHover
        : speed;
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }

    if (effectiveSpeed <= 0 || (width === 0 && height === 0)) {
      return;
    }

    const size = direction === 'horizontal' ? width : height;
    if (size <= 0) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / effectiveSpeed;

    let controls: { stop: () => void };

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / Math.max(effectiveSpeed, 1);

      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    controlsRef.current = controls;

    return () => {
      if (controls) controls.stop();
      controlsRef.current = null;
    };
  }, [
    key,
    translation,
    effectiveSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const handleHoverStart = useCallback(() => {
    if (disabled || prefersReducedMotion) return;
    if (typeof speedOnHover === 'number' || pauseOnHover) {
      setIsTransitioning(true);
      setIsHovering(true);
    }
  }, [disabled, prefersReducedMotion, speedOnHover, pauseOnHover]);

  const handleHoverEnd = useCallback(() => {
    if (disabled || prefersReducedMotion) return;
    if (typeof speedOnHover === 'number' || pauseOnHover) {
      setIsTransitioning(true);
      setIsHovering(false);
    }
  }, [disabled, prefersReducedMotion, speedOnHover, pauseOnHover]);

  const hoverProps =
    (typeof speedOnHover === 'number' || pauseOnHover) && !disabled
      ? {
          onHoverStart: handleHoverStart,
          onHoverEnd: handleHoverEnd,
        }
      : {};

  const isPaused = effectiveSpeed <= 0 || disabled || prefersReducedMotion;

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-transparent text-neutral-950 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] focus-visible:rounded data-[disabled=true]:opacity-60 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed',
        className
      )}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      aria-live={isPaused ? 'polite' : 'off'}
      data-direction={direction}
      data-disabled={disabled || undefined}
      data-reduced-motion={prefersReducedMotion || undefined}
      {...rest}
    >
      <div className="overflow-hidden w-full h-full">
        <motion.div
          className={cn(
            'flex w-max will-change-transform items-center',
            direction === 'vertical' && 'flex-col h-max w-full'
          )}
          style={{
            ...(direction === 'horizontal'
              ? { x: translation }
              : { y: translation }),
            gap: `${gap}px`,
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
          }}
          ref={ref}
          {...hoverProps}
        >
          <div
            className={cn(
              'flex shrink-0 items-center',
              direction === 'vertical' ? 'flex-col w-full' : 'flex-row'
            )}
            style={{ gap: `${gap}px` }}
            aria-hidden={false}
          >
            {children}
          </div>
          <div
            className={cn(
              'flex shrink-0 items-center',
              direction === 'vertical' ? 'flex-col w-full' : 'flex-row'
            )}
            style={{ gap: `${gap}px` }}
            aria-hidden="true"
          >
            {children}
          </div>
        </motion.div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-200 hover:opacity-85 focus-within:opacity-85 bg-gradient-to-r from-transparent via-[#1620E4] to-[#7BE9C6] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export default TwentyFirstInfiniteSlider;

/* Tailwind v4 keyframes (none required — framer-motion handles motion).
   Optional:
   @keyframes bemo-infinite-slide {
     from { transform: translateX(0); }
     to { transform: translateX(-50%); }
   }
*/
