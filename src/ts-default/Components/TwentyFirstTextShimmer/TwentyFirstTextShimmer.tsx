import React, { useMemo, type ElementType, type ComponentPropsWithoutRef, type JSX } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import './TwentyFirstTextShimmer.css';

export type TwentyFirstTextShimmerProps<T extends ElementType = 'p'> = {
  children: string;
  as?: T;
  className?: string;
  duration?: number;
  spread?: number;
  baseColor?: string;
  gradientColor?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'as' | 'className'>;

function TwentyFirstTextShimmerComponent<T extends ElementType = 'p'>({
  children,
  as,
  className = '',
  duration = 2,
  spread = 2,
  baseColor,
  gradientColor,
  ...props
}: TwentyFirstTextShimmerProps<T>) {
  const Component = (as || 'p') as ElementType;
  const prefersReducedMotion = useReducedMotion();
  const dynamicSpread = useMemo(() => {
    return (typeof children === 'string' ? children.length : 0) * spread;
  }, [children, spread]);

  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);

  const style: React.CSSProperties & {
    '--spread'?: string;
    '--base-color'?: string;
    '--base-gradient-color'?: string;
  } = {
    '--spread': `${dynamicSpread}px`,
  };
  if (baseColor) style['--base-color'] = baseColor;
  if (gradientColor) style['--base-gradient-color'] = gradientColor;

  if (prefersReducedMotion) {
    return (
      <Component
        className={`bemo-21st-text-shimmer bemo-21st-text-shimmer--reduced ${className}`.trim()}
        style={style}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      className={`bemo-21st-text-shimmer ${className}`.trim()}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={{
        ...style,
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
      }}
      {...(props as any)}
    >
      {children}
    </MotionComponent>
  );
}

export const TwentyFirstTextShimmer = React.memo(TwentyFirstTextShimmerComponent) as <
  T extends ElementType = 'p'
>(
  props: TwentyFirstTextShimmerProps<T>
) => JSX.Element;

(TwentyFirstTextShimmer as any).displayName = 'TwentyFirstTextShimmer';

export default TwentyFirstTextShimmer;
