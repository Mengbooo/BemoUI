import React, { useRef, useState, useCallback, useEffect, type CSSProperties } from 'react';
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion';

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export type TwentyFirstSpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  colorFrom?: string;
  colorVia?: string;
  colorTo?: string;
  opacity?: number;
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
};

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
}: TwentyFirstSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
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
    (event: MouseEvent) => {
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
        ? 'blur-sm'
        : blur === 'md'
          ? 'blur-md'
          : blur === 'lg'
            ? 'blur-lg'
            : 'blur-xl';

  const style: CSSProperties = {
    width: size,
    height: size,
    left: reducedMotion ? '50%' : (spotlightLeft as unknown as string),
    top: reducedMotion ? '50%' : (spotlightTop as unknown as string),
    opacity: isHovered && !disabled ? opacity : 0,
    background: `radial-gradient(circle at center, ${colorFrom}, ${colorVia}, ${colorTo} 80%)`,
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full transition-opacity duration-200 will-change-[left,top,opacity] z-0',
        blurClass,
        isHovered && !disabled && !reducedMotion ? 'opacity-100' : 'opacity-0',
        disabled && 'opacity-0!',
        reducedMotion && 'left-1/2! top-1/2! -translate-x-1/2 -translate-y-1/2',
        'motion-reduce:transition-opacity motion-reduce:duration-150',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

export default TwentyFirstSpotlight;

/* Tailwind v4: no custom @keyframes needed. Rely on transition-opacity + blur-* utilities. Reduced motion handled via JS matchMedia + motion-reduce: variants. */
