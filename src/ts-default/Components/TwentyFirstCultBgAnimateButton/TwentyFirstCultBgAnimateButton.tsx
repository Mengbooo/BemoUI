import * as React from 'react';
import './TwentyFirstCultBgAnimateButton.css';

type Size = 'sm' | 'default' | 'lg';
type Rounded = 'full' | 'xl' | '2xl' | '3xl' | 'sm' | 'xs' | 'base';
type Shadow = 'flat' | 'soft' | 'base' | 'deep' | 'deeper';
type Animation = 'spin' | 'pulse' | 'spin-slow' | 'spin-fast';
type Gradient =
  | 'sunrise'
  | 'ocean'
  | 'candy'
  | 'forest'
  | 'sunset'
  | 'nebula'
  | 'default'
  | 'bemo';

export interface TwentyFirstCultBgAnimateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  rounded?: Rounded;
  shadow?: Shadow;
  animation?: Animation | null;
  gradient?: Gradient | null;
  asChild?: boolean;
}

const sizeClasses: Record<Size, string> = {
  sm: 'bemo-21st-cult-bg-animate-button--size-sm',
  default: 'bemo-21st-cult-bg-animate-button--size-default',
  lg: 'bemo-21st-cult-bg-animate-button--size-lg',
};

const roundedClasses: Record<Rounded, string> = {
  full: 'bemo-21st-cult-bg-animate-button--rounded-full',
  xl: 'bemo-21st-cult-bg-animate-button--rounded-xl',
  '2xl': 'bemo-21st-cult-bg-animate-button--rounded-2xl',
  '3xl': 'bemo-21st-cult-bg-animate-button--rounded-3xl',
  sm: 'bemo-21st-cult-bg-animate-button--rounded-sm',
  xs: 'bemo-21st-cult-bg-animate-button--rounded-xs',
  base: 'bemo-21st-cult-bg-animate-button--rounded-base',
};

const shadowClasses: Record<Shadow, string> = {
  flat: 'bemo-21st-cult-bg-animate-button--shadow-flat',
  soft: 'bemo-21st-cult-bg-animate-button--shadow-soft',
  base: 'bemo-21st-cult-bg-animate-button--shadow-base',
  deep: 'bemo-21st-cult-bg-animate-button--shadow-deep',
  deeper: 'bemo-21st-cult-bg-animate-button--shadow-deeper',
};

const animationClasses: Record<Animation, string> = {
  pulse: 'bemo-21st-cult-bg-animate-button--animation-pulse',
  'spin-fast': 'bemo-21st-cult-bg-animate-button--animation-spin-fast',
  'spin-slow': 'bemo-21st-cult-bg-animate-button--animation-spin-slow',
  spin: 'bemo-21st-cult-bg-animate-button--animation-spin',
};

const gradientClasses: Record<Gradient, string> = {
  sunrise: 'bemo-21st-cult-bg-animate-button--gradient-sunrise',
  ocean: 'bemo-21st-cult-bg-animate-button--gradient-ocean',
  candy: 'bemo-21st-cult-bg-animate-button--gradient-candy',
  forest: 'bemo-21st-cult-bg-animate-button--gradient-forest',
  sunset: 'bemo-21st-cult-bg-animate-button--gradient-sunset',
  nebula: 'bemo-21st-cult-bg-animate-button--gradient-nebula',
  default: 'bemo-21st-cult-bg-animate-button--gradient-default',
  bemo: 'bemo-21st-cult-bg-animate-button--gradient-bemo',
};

const textClasses: Record<Gradient, string> = {
  sunrise: 'bemo-21st-cult-bg-animate-button--text-dark',
  ocean: 'bemo-21st-cult-bg-animate-button--text-dark',
  candy: 'bemo-21st-cult-bg-animate-button--text-dark',
  forest: 'bemo-21st-cult-bg-animate-button--text-dark',
  sunset: 'bemo-21st-cult-bg-animate-button--text-dark',
  nebula: 'bemo-21st-cult-bg-animate-button--text-light',
  default: 'bemo-21st-cult-bg-animate-button--text-light',
  bemo: 'bemo-21st-cult-bg-animate-button--text-light',
};

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const TwentyFirstCultBgAnimateButton = React.forwardRef<
  HTMLButtonElement,
  TwentyFirstCultBgAnimateButtonProps
>(
  (
    {
      children,
      className,
      size = 'default',
      rounded = 'xl',
      shadow = 'base',
      animation = 'spin',
      gradient = 'bemo',
      asChild = false,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const outerClass = cn(
      'bemo-21st-cult-bg-animate-button',
      sizeClasses[size],
      roundedClasses[rounded],
      className
    );

    const gradientClass = gradient
      ? cn(
          'bemo-21st-cult-bg-animate-button__gradient',
          gradientClasses[gradient],
          animation ? animationClasses[animation] : null
        )
      : null;

    const innerClass = cn(
      'bemo-21st-cult-bg-animate-button__inner',
      sizeClasses[size],
      roundedClasses[rounded],
      shadowClasses[shadow],
      gradient ? textClasses[gradient] : 'bemo-21st-cult-bg-animate-button--text-dark'
    );

    const content = (
      <>
        {gradientClass && <span className={gradientClass} aria-hidden="true" />}
        <span className={innerClass}>{children ?? 'Button'}</span>
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(outerClass, child.props.className),
        ref,
        disabled: disabled || child.props.disabled,
        ...props,
        children: (
          <>
            {gradientClass && <span className={gradientClass} aria-hidden="true" />}
            <span className={innerClass}>{child.props.children}</span>
          </>
        ),
      });
    }

    return (
      <button
        type={type}
        className={outerClass}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

TwentyFirstCultBgAnimateButton.displayName = 'TwentyFirstCultBgAnimateButton';

export default TwentyFirstCultBgAnimateButton;
export type { Size, Rounded, Shadow, Animation, Gradient };
