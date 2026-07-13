import React from 'react';
import './TwentyFirstCultGradientHeading.css';

const VARIANT_CLASSES = {
  default: 'bemo-21st-cult-gradient-heading--variant-default',
  pink: 'bemo-21st-cult-gradient-heading--variant-pink',
  light: 'bemo-21st-cult-gradient-heading--variant-light',
  secondary: 'bemo-21st-cult-gradient-heading--variant-secondary',
};

const SIZE_CLASSES = {
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

const WEIGHT_CLASSES = {
  default: 'bemo-21st-cult-gradient-heading--weight-default',
  thin: 'bemo-21st-cult-gradient-heading--weight-thin',
  base: 'bemo-21st-cult-gradient-heading--weight-base',
  semi: 'bemo-21st-cult-gradient-heading--weight-semi',
  bold: 'bemo-21st-cult-gradient-heading--weight-bold',
  black: 'bemo-21st-cult-gradient-heading--weight-black',
};

/**
 * TwentyFirstCultGradientHeading - Gradient text heading component adapted from Cult UI.
 * Supports variants, sizes, weights, and asChild polymorphism.
 */
const TwentyFirstCultGradientHeading = React.forwardRef(
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
    const Comp = asChild ? React.Fragment : as;
    const spanClassName = [
      'bemo-21st-cult-gradient-heading',
      VARIANT_CLASSES[variant] || VARIANT_CLASSES.default,
      SIZE_CLASSES[size] || SIZE_CLASSES.default,
      WEIGHT_CLASSES[weight] || WEIGHT_CLASSES.default,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (asChild) {
      // When asChild, clone the single child and merge classes onto it
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        ...props,
        ref,
        className: [child.props.className, spanClassName].filter(Boolean).join(' '),
      });
    }

    return (
      <Comp ref={ref} {...props} className={className || undefined}>
        <span className={spanClassName}>{children}</span>
      </Comp>
    );
  }
);

TwentyFirstCultGradientHeading.displayName = 'TwentyFirstCultGradientHeading';

export default TwentyFirstCultGradientHeading;
export { TwentyFirstCultGradientHeading };
