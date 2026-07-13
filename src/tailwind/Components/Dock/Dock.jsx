import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const Dock = React.forwardRef(function Dock(
  {
    className = '',
    children,
    iconSize = DEFAULT_SIZE,
    iconMagnification = DEFAULT_MAGNIFICATION,
    disableMagnification = false,
    iconDistance = DEFAULT_DISTANCE,
    direction = 'middle',
    ...props
  },
  ref
) {
  const mouseX = useMotionValue(Infinity);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (event) => setPrefersReducedMotion(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === DockIcon) {
        return React.cloneElement(child, {
          mouseX,
          size: iconSize,
          magnification: iconMagnification,
          disableMagnification,
          distance: iconDistance,
          prefersReducedMotion,
        });
      }
      return child;
    });

  const directionClass =
    direction === 'top'
      ? 'items-start'
      : direction === 'bottom'
        ? 'items-end'
        : 'items-center';

  return (
    <motion.div
      ref={ref}
      role="toolbar"
      aria-label="Dock"
      onMouseMove={(event) => {
        if (!prefersReducedMotion) mouseX.set(event.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={[
        'mx-auto mt-8 flex h-[58px] w-max justify-center gap-2 rounded-2xl border border-[#1620E4]/20 bg-white/10 p-2 text-[#1620E4] shadow-[0_4px_24px_rgba(22,32,228,0.08)] backdrop-blur-md',
        directionClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {renderChildren()}
    </motion.div>
  );
});

Dock.displayName = 'Dock';

function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification = false,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className = '',
  children,
  prefersReducedMotion = false,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  ...props
}) {
  const ref = useRef(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);
  const staticMotion = disableMagnification || prefersReducedMotion;

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = staticMotion ? size : magnification;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      style={{
        width: staticMotion ? size : scaleSize,
        height: staticMotion ? size : scaleSize,
        padding,
      }}
      className={[
        'flex aspect-square cursor-pointer items-center justify-center rounded-full text-[#1620E4] outline-none transition-colors hover:bg-[#7BE9C6]/30 focus-visible:bg-[#7BE9C6]/30 focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2',
        disabled ? 'pointer-events-none cursor-not-allowed opacity-45' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="flex h-full w-full items-center justify-center">{children}</div>
    </motion.div>
  );
}

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon };

/*
 * Tailwind v4 global keyframes: none required.
 * Magnification uses framer-motion springs (mass 0.1, stiffness 150, damping 12).
 * prefers-reduced-motion disables magnification scaling entirely.
 */
