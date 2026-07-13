import React, { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
  type SpringOptions,
  type HTMLMotionProps,
} from 'framer-motion';
import './TwentyFirstTilt.css';

export type TwentyFirstTiltProps = {
  children: ReactNode;
  className?: string;
  style?: MotionStyle | CSSProperties;
  /** Degrees of max rotation. Default 15. */
  rotationFactor?: number;
  /** Invert tilt direction. Default false. (Note: upstream typo was isRevese) */
  isReverse?: boolean;
  springOptions?: SpringOptions;
  disabled?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'style' | 'className' | 'onMouseMove' | 'onMouseLeave'>;

export function TwentyFirstTilt({
  children,
  className = '',
  style,
  rotationFactor = 15,
  isReverse = false,
  springOptions = { stiffness: 300, damping: 30 },
  disabled = false,
  ...props
}: TwentyFirstTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    isReverse
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor]
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    isReverse
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor]
  );

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = mouseX / width - 0.5;
    const yPos = mouseY / height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleBlur = () => {
    x.set(0);
    y.set(0);
  };

  const combinedStyle: MotionStyle = prefersReducedMotion || disabled
    ? {
        transformStyle: 'preserve-3d',
        ...(style as MotionStyle),
      }
    : {
        transformStyle: 'preserve-3d',
        ...(style as MotionStyle),
        transform,
      };

  return (
    <motion.div
      ref={ref}
      className={`bemo-21st-tilt ${className}`.trim()}
      style={combinedStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
      role="presentation"
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default TwentyFirstTilt;
