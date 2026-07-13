import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import './TwentyFirstSpotlight.css';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export function TwentyFirstSpotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
  colorFrom = '#7BE9C6',
  colorVia = '#1620E4',
  colorTo = 'transparent',
  opacity = 0.8,
  blur = 'xl',
  disabled = false,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const prevPosition = parent.style.position;
        const prevOverflow = parent.style.overflow;
        if (getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
        parent.style.overflow = 'hidden';
        setParentElement(parent);
        return () => {
          parent.style.position = prevPosition;
          parent.style.overflow = prevOverflow;
        };
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!parentElement || disabled || reducedMotion) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement, disabled, reducedMotion]
  );

  useEffect(() => {
    if (!parentElement || disabled) return;

    const abortController = new AbortController();

    parentElement.addEventListener('mousemove', handleMouseMove, {
      signal: abortController.signal,
    });
    parentElement.addEventListener('mouseenter', () => setIsHovered(true), {
      signal: abortController.signal,
    });
    parentElement.addEventListener('mouseleave', () => setIsHovered(false), {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [parentElement, handleMouseMove, disabled]);

  const blurClass =
    blur === 'none'
      ? ''
      : blur === 'sm'
        ? 'bemo-21st-spotlight-blur-sm'
        : blur === 'md'
          ? 'bemo-21st-spotlight-blur-md'
          : blur === 'lg'
            ? 'bemo-21st-spotlight-blur-lg'
            : 'bemo-21st-spotlight-blur-xl';

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'bemo-21st-spotlight',
        blurClass,
        isHovered && !disabled && !reducedMotion ? 'bemo-21st-spotlight-visible' : 'bemo-21st-spotlight-hidden',
        disabled && 'bemo-21st-spotlight-disabled',
        reducedMotion && 'bemo-21st-spotlight-reduced',
        className
      )}
      style={{
        width: size,
        height: size,
        left: reducedMotion ? '50%' : spotlightLeft,
        top: reducedMotion ? '50%' : spotlightTop,
        transform: reducedMotion ? 'translate(-50%, -50%)' : undefined,
        '--bemo-spotlight-from': colorFrom,
        '--bemo-spotlight-via': colorVia,
        '--bemo-spotlight-to': colorTo,
        '--bemo-spotlight-opacity': opacity,
      }}
      aria-hidden="true"
    />
  );
}

export default TwentyFirstSpotlight;
