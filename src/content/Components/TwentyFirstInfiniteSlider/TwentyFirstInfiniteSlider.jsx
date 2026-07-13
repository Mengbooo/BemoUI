import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import './TwentyFirstInfiniteSlider.css';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function useMeasure() {
  const ref = useRef(null);
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

function usePrefersReducedMotion() {
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
}) {
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveSpeed = prefersReducedMotion || disabled
    ? 0
    : isHovering && typeof speedOnHover === 'number'
      ? speedOnHover
      : speed;
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const controlsRef = useRef(null);

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

    let controls;

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
      className={cn('bemo-21st-infinite-slider', className)}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      aria-live={isPaused ? 'polite' : 'off'}
      data-direction={direction}
      data-disabled={disabled || undefined}
      data-reduced-motion={prefersReducedMotion || undefined}
      {...rest}
    >
      <div className="bemo-21st-infinite-slider__viewport">
        <motion.div
          className="bemo-21st-infinite-slider__track"
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
          <div className="bemo-21st-infinite-slider__content" aria-hidden={false}>
            {children}
          </div>
          <div className="bemo-21st-infinite-slider__content" aria-hidden="true">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TwentyFirstInfiniteSlider;
