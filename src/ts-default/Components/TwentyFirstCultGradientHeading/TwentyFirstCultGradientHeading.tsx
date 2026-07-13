import React from 'react';
import './TwentyFirstCultGradientHeading.css';

export type GradientHeadingVariant = 'default' | 'pink' | 'light' | 'secondary' | 'accent';
export type GradientHeadingSize =
  | 'default'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xll'
  | 'xxl'
  | 'xxxl';
export type GradientHeadingWeight = 'default' | 'thin' | 'base' | 'semi' | 'bold' | 'black';

export interface TwentyFirstCultGradientHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
  variant?: GradientHeadingVariant;
  size?: GradientHeadingSize;
  weight?: GradientHeadingWeight;
  children: React.ReactNode;
  className?: string;
  /** Semantic element when not using asChild. Defaults to 'h3'. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const VARIANT_CLASSES: Record<GradientHeadingVariant, string> = {
  default: 'bemo-21st-cult-gradient-heading--variant-default',
  pink: 'bemo-21st-cult-gradient-heading--variant-pink',
  light: 'bemo-21st-cult-gradient-heading--variant-light',
  secondary: 'bemo-21st-cult-gradient-heading--variant-secondary',
  accent: 'bemo-21st-cult-gradient-heading--variant-accent',
};

const SIZE_CLASSES: Record<GradientHeadingSize, string> = {
  default: 'bemo-21st-cult-gradient-heading--size-default',
  xxs: 'bemo-21st-cult-gradient-heading--size-xxs',
  xs: 'bemo-21st-cult-gradient-heading--size-xs',
  sm: 'bemo-21st-cult-gradient-heading--size-sm',
  md: 'bemo-21st-cult-gradient-heading--size-md',
  lg: 'bemo-21st-cult-gradient-heading--size-lg',
  xl: 'bemo-21st-cult-gradient-heading--size-xl',
  xll: 'bemo-21st-cult-gradient-heading--size-xll',
  xxl: 'bemo-21st-cult-gradient-heading--size-xxl',
  xxxl: 'bemo-21st-cult-gradient-heading--size-xxxl',
};

const WEIGHT_CLASSES: Record<GradientHeadingWeight, string> = {
  default: 'bemo-21st-cult-gradient-heading--weight-default',
  thin: 'bemo-21st-cult-gradient-heading--weight-thin',
  base: 'bemo-21st-cult-gradient-heading--weight-base',
  semi: 'bemo-21st-cult-gradient-heading--weight-semi',
  bold: 'bemo-21st-cult-gradient-heading--weight-bold',
  black: 'bemo-21st-cult-gradient-heading--weight-black',
};

/**
 * TwentyFirstCultGradientHeading - Production-ready gradient text heading.
 * Adapted from Cult UI (MIT). Supports variants, responsive sizes, weights, and asChild.
 */
const TwentyFirstCultGradientHeading = React.forwardRef<
  HTMLHeadingElement,
  TwentyFirstCultGradientHeadingProps
>(
  (
    {
      asChild = false,
      variant = 'default',
      size = 'default',
      weight = 'default',
      className = '',
      children,
      as = 'h3',
      ...props
    },
    ref
  ) => {
    const spanClassName = [
      'bemo-21st-cult-gradient-heading',
      VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default,
      SIZE_CLASSES[size] ?? SIZE_CLASSES.default,
      WEIGHT_CLASSES[weight] ?? WEIGHT_CLASSES.default,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, {
        ...props,
        ref,
        className: [ (child.props as { className?: string }).className, spanClassName ]
          .filter(Boolean)
          .join(' '),
      } as any);
    }

    const Comp = as as React.ElementType;
    return (
      <Comp ref={ref} {...props}>
        <span className={spanClassName}>{children}</span>
      </Comp>
    );
  }
);

TwentyFirstCultGradientHeading.displayName = 'TwentyFirstCultGradientHeading';

export default TwentyFirstCultGradientHeading;
export { TwentyFirstCultGradientHeading };
