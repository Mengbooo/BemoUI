import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import './Dock.css';

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
      ? 'bemo-dock--top'
      : direction === 'bottom'
        ? 'bemo-dock--bottom'
        : 'bemo-dock--middle';

  return (
    <motion.div
      ref={ref}
      role="toolbar"
      aria-label="Dock"
      onMouseMove={(event) => {
        if (!prefersReducedMotion) mouseX.set(event.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={['bemo-dock', directionClass, className].filter(Boolean).join(' ')}
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
        'bemo-dock__icon',
        disableMagnification ? 'bemo-dock__icon--static' : '',
        disabled ? 'bemo-dock__icon--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="bemo-dock__icon-inner">{children}</div>
    </motion.div>
  );
}

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon };
