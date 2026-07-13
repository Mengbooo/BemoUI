import * as React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const sizeMap = {
  sm: 'text-xs px-4 py-1',
  default: 'text-sm px-6 py-2',
  lg: 'text-base px-8 py-3',
};

const roundedMap = {
  full: 'rounded-full',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  sm: 'rounded-sm',
  xs: 'rounded-xs',
  base: 'rounded',
};

const shadowMap = {
  flat: '',
  soft: 'shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.3)]',
  base: 'shadow-[0_3px_5px_rgba(0,0,0,0.2),inset_0_0.5px_1px_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4)]',
  deep: 'shadow-[0_4px_6px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.5)]',
  deeper: 'shadow-[0_6px_8px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.6)]',
};

const animationMap = {
  pulse: 'animate-pulse',
  'spin-fast': 'animate-[spin_2s_linear_infinite]',
  'spin-slow': 'animate-[spin_8s_linear_infinite]',
  spin: 'animate-[spin_4s_linear_infinite]',
};

const gradientMap = {
  sunrise: 'bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a9e_0%,#fad0c4_50%,#ff9a9e_100%)]',
  ocean: 'bg-[conic-gradient(from_90deg_at_50%_50%,#a1c4fd_0%,#c2e9fb_50%,#a1c4fd_100%)]',
  candy: 'bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a9e_0%,#fad0c4_50%,#fad0c4_90%,#ff9a9e_100%)]',
  forest: 'bg-[conic-gradient(from_90deg_at_50%_50%,#85d797_0%,#1a806b_50%,#85d797_100%)]',
  sunset: 'bg-[conic-gradient(from_90deg_at_50%_50%,#fe5d75_0%,#f5af19_50%,#fe5d75_100%)]',
  nebula: 'bg-[conic-gradient(from_90deg_at_50%_50%,#A77BFE_0%,#8860D0_50%,#A77BFE_100%)]',
  default: 'bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]',
  bemo: 'bg-[conic-gradient(from_90deg_at_50%_50%,#1620E4_0%,#7BE9C6_50%,#1620E4_100%)]',
};

const textMap = {
  sunrise: 'text-black font-bold',
  ocean: 'text-black font-bold',
  candy: 'text-black font-bold',
  forest: 'text-black font-bold',
  sunset: 'text-black font-bold',
  nebula: 'text-white font-bold',
  default: 'text-white font-bold',
  bemo: 'text-white font-bold',
};

const TwentyFirstCultBgAnimateButton = React.forwardRef(
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
      'relative inline-block overflow-hidden',
      roundedMap[rounded] || roundedMap.xl,
      'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1620E4]',
      'disabled:pointer-events-none disabled:opacity-50',
      'motion-reduce:[&_span:first-child]:animate-none',
      className
    );

    const gradientClass = gradient
      ? cn(
          'absolute inset-[-1000%] m-auto block w-[2000%] h-[2000%] pointer-events-none z-0',
          gradientMap[gradient] || gradientMap.bemo,
          animation ? animationMap[animation] || animationMap.spin : null
        )
      : null;

    const innerClass = cn(
      'relative z-10 inline-flex items-center justify-center gap-2 transition-all duration-150 ease-in-out overflow-hidden',
      sizeMap[size] || sizeMap.default,
      roundedMap[rounded] || roundedMap.xl,
      shadowMap[shadow] || shadowMap.base,
      gradient ? textMap[gradient] || textMap.bemo : 'text-black font-bold',
      'hover:enabled:-translate-y-px active:enabled:translate-y-0'
    );

    const content = (
      <>
        {gradientClass && <span className={gradientClass} aria-hidden="true" />}
        <span className={innerClass}>{children ?? 'Button'}</span>
      </>
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(outerClass, children.props.className),
        ref,
        disabled: disabled || children.props.disabled,
        ...props,
        children: (
          <>
            {gradientClass && <span className={gradientClass} aria-hidden="true" />}
            <span className={innerClass}>{children.props.children}</span>
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

/*
  Required keyframes (Tailwind v4 animate-spin uses built-in spin).
  If custom needed beyond arbitrary values:
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
*/
