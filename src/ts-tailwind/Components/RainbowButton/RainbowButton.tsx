import React from 'react';

export type RainbowButtonVariant = 'default' | 'outline';
export type RainbowButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: RainbowButtonVariant;
  size?: RainbowButtonSize;
}

const sizeClasses: Record<RainbowButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-xl px-3 text-xs',
  lg: 'h-11 rounded-xl px-8',
  icon: 'size-9',
};

const variantClasses: Record<RainbowButtonVariant, string> = {
  default:
    'border-0 text-white bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,#1620E4,#ff4d9a,#00d4ff,#a855f7,#7BE9C6)] bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-[bemo-rainbow_2s_linear_infinite] before:bg-[linear-gradient(90deg,#1620E4,#ff4d9a,#00d4ff,#a855f7,#7BE9C6)] before:bg-[length:200%] before:[filter:blur(0.75rem)]',
  outline:
    'border border-neutral-200 border-b-transparent text-neutral-900 bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,#1620E4,#ff4d9a,#00d4ff,#a855f7,#7BE9C6)] bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-[bemo-rainbow_2s_linear_infinite] before:bg-[linear-gradient(90deg,#1620E4,#ff4d9a,#00d4ff,#a855f7,#7BE9C6)] before:bg-[length:200%] before:[filter:blur(0.75rem)]',
};

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  function RainbowButton(
    {
      className = '',
      variant = 'default',
      size = 'default',
      disabled = false,
      type = 'button',
      children,
      ...props
    },
    ref
  ) {
    const resolvedVariant: RainbowButtonVariant =
      variant === 'outline' ? 'outline' : 'default';
    const resolvedSize: RainbowButtonSize = sizeClasses[size] ? size : 'default';

    const classes = [
      'relative cursor-pointer group transition-all animate-[bemo-rainbow_2s_linear_infinite]',
      'inline-flex items-center justify-center gap-2 shrink-0',
      'rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-[#1620E4]/45',
      'text-sm font-medium whitespace-nowrap',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0',
      'motion-reduce:animate-none before:motion-reduce:animate-none',
      'before:pointer-events-none before:content-[""]',
      sizeClasses[resolvedSize],
      variantClasses[resolvedVariant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

RainbowButton.displayName = 'RainbowButton';

export { RainbowButton };
export default RainbowButton;

/*
Required global Tailwind v4 keyframes (add to your CSS entry):

@theme {
  --animate-bemo-rainbow: bemo-rainbow 2s linear infinite;
}

@keyframes bemo-rainbow {
  0% { background-position: 0%; }
  100% { background-position: 200%; }
}

@media (prefers-reduced-motion: reduce) {
  .animate-\\[bemo-rainbow_2s_linear_infinite\\],
  .before\\:animate-\\[bemo-rainbow_2s_linear_infinite\\]::before {
    animation: none !important;
  }
}
*/
