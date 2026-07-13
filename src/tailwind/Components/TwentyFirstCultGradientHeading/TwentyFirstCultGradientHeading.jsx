import React from 'react';

const variantClasses = {
  default: 'bg-gradient-to-t from-neutral-700 to-neutral-800 dark:from-stone-200 dark:to-neutral-200',
  pink: 'bg-gradient-to-t from-[#1620E4] to-[#1620E4]/90 dark:from-stone-200 dark:to-neutral-200',
  light: 'bg-gradient-to-t from-neutral-200 to-neutral-300',
  secondary: 'bg-gradient-to-t from-neutral-500 to-neutral-600 dark:from-stone-200 dark:to-neutral-200',
  accent: 'bg-gradient-to-t from-[#1620E4] to-[#7BE9C6]',
};

const sizeClasses = {
  default: 'text-2xl sm:text-3xl lg:text-4xl',
  xxs: 'text-base sm:text-lg lg:text-lg',
  xs: 'text-lg sm:text-xl lg:text-2xl',
  sm: 'text-xl sm:text-2xl lg:text-3xl',
  md: 'text-2xl sm:text-3xl lg:text-4xl',
  lg: 'text-3xl sm:text-4xl lg:text-5xl',
  xl: 'text-4xl sm:text-5xl lg:text-6xl',
  xll: 'text-4xl sm:text-6xl lg:text-[5.4rem] lg:leading-[0.9]',
  xxl: 'text-5xl sm:text-6xl lg:text-[6rem]',
  xxxl: 'text-5xl sm:text-6xl lg:text-[8rem]',
};

const weightClasses = {
  default: 'font-bold',
  thin: 'font-thin',
  base: 'font-normal',
  semi: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

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
    const spanClass = [
      'tracking-tight pb-3 bg-clip-text text-transparent',
      variantClasses[variant] || variantClasses.default,
      sizeClasses[size] || sizeClasses.default,
      weightClasses[weight] || weightClasses.default,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (asChild) {
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        ...props,
        ref,
        className: [child.props?.className, spanClass].filter(Boolean).join(' '),
      });
    }

    const Comp = as;
    return (
      <Comp ref={ref} {...props}>
        <span className={spanClass}>{children}</span>
      </Comp>
    );
  }
);

TwentyFirstCultGradientHeading.displayName = 'TwentyFirstCultGradientHeading';

export default TwentyFirstCultGradientHeading;
export { TwentyFirstCultGradientHeading };

/*
  Tailwind v4 note: keyframes not required for this component.
  If animated gradients are desired later:
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
*/
