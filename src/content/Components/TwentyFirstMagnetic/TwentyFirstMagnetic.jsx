import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TwentyFirstMagnetic.css';

const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

export function TwentyFirstMagnetic({
  children,
  intensity = 0.6,
  range = 100,
  actionArea = 'self',
  springOptions = SPRING_CONFIG,
  className = '',
  disabled = false,
  as: Component = 'div',
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      x.set(0);
      y.set(0);
      return;
    }

    const calculateDistance = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (isHovered && absoluteDistance <= range) {
        const scale = 1 - absoluteDistance / range;
        x.set(distanceX * intensity * scale);
        y.set(distanceY * intensity * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    document.addEventListener('mousemove', calculateDistance);
    return () => {
      document.removeEventListener('mousemove', calculateDistance);
    };
  }, [isHovered, intensity, range, disabled, prefersReducedMotion, x, y]);

  useEffect(() => {
    if (disabled || prefersReducedMotion) return;

    if (actionArea === 'parent' && ref.current?.parentElement) {
      const parent = ref.current.parentElement;
      const handleParentEnter = () => setIsHovered(true);
      const handleParentLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      };
      parent.addEventListener('mouseenter', handleParentEnter);
      parent.addEventListener('mouseleave', handleParentLeave);
      return () => {
        parent.removeEventListener('mouseenter', handleParentEnter);
        parent.removeEventListener('mouseleave', handleParentLeave);
      };
    } else if (actionArea === 'global') {
      setIsHovered(true);
    }
  }, [actionArea, disabled, prefersReducedMotion, x, y]);

  const handleMouseEnter = () => {
    if (actionArea === 'self' && !disabled && !prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (actionArea === 'self') {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  const handleFocus = () => {
    if (actionArea === 'self' && !disabled && !prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handleBlur = () => {
    if (actionArea === 'self') {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      ref={ref}
      className={`bemo-21st-magnetic-root ${disabled ? 'bemo-21st-magnetic-disabled' : ''} ${className}`.trim()}
      onMouseEnter={actionArea === 'self' ? handleMouseEnter : undefined}
      onMouseLeave={actionArea === 'self' ? handleMouseLeave : undefined}
      onFocus={actionArea === 'self' ? handleFocus : undefined}
      onBlur={actionArea === 'self' ? handleBlur : undefined}
      style={{
        x: prefersReducedMotion || disabled ? 0 : springX,
        y: prefersReducedMotion || disabled ? 0 : springY,
      }}
      tabIndex={actionArea === 'self' && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

export default TwentyFirstMagnetic;
