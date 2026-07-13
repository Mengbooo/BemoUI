import React from 'react';

export interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  function ShinyButton(
    { children, className = '', disabled = false, type = 'button', ...props },
    ref
  ) {
    const classes = [
      'bemo-shiny-button relative inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#1620E4]/20 px-6 py-2 font-medium backdrop-blur-xl transition-[box-shadow,transform,opacity] duration-300 ease-in-out',
      'bg-[radial-gradient(circle_at_50%_0%,rgba(22,32,228,0.12)_0%,transparent_60%)]',
      'hover:enabled:shadow-[0_0_20px_rgba(22,32,228,0.18)]',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]',
      'active:enabled:scale-95',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'motion-reduce:active:enabled:scale-100',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} disabled={disabled} className={classes} {...props}>
        <span className="bemo-shiny-button__label relative z-[1] block w-full text-sm tracking-wide text-black/70 uppercase [mask-image:linear-gradient(-75deg,#1620E4_calc(var(--bemo-shiny-x)+20%),transparent_calc(var(--bemo-shiny-x)+30%),#1620E4_calc(var(--bemo-shiny-x)+100%))] [-webkit-mask-image:linear-gradient(-75deg,#1620E4_calc(var(--bemo-shiny-x)+20%),transparent_calc(var(--bemo-shiny-x)+30%),#1620E4_calc(var(--bemo-shiny-x)+100%))] animate-[bemo-shiny-button-x_2.4s_ease-in-out_infinite_1s] motion-reduce:animate-none motion-reduce:[--bemo-shiny-x:40%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="bemo-shiny-button__border pointer-events-none absolute inset-0 z-[2] block rounded-[inherit] p-px [mask:linear-gradient(#000,#000)_content-box_exclude,linear-gradient(#000,#000)] [-webkit-mask:linear-gradient(#000,#000)_content-box_exclude,linear-gradient(#000,#000)] [background-image:linear-gradient(-75deg,rgba(22,32,228,0.12)_calc(var(--bemo-shiny-x)+20%),rgba(123,233,198,0.55)_calc(var(--bemo-shiny-x)+25%),rgba(22,32,228,0.12)_calc(var(--bemo-shiny-x)+100%))] animate-[bemo-shiny-button-x_2.4s_ease-in-out_infinite_1s] motion-reduce:animate-none motion-reduce:[--bemo-shiny-x:40%]"
        />
      </button>
    );
  }
);

ShinyButton.displayName = 'ShinyButton';

export default ShinyButton;

/*
Required global CSS for Tailwind v4 (add once to your global stylesheet):

@property --bemo-shiny-x {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}

@keyframes bemo-shiny-button-x {
  0% { --bemo-shiny-x: 100%; }
  100% { --bemo-shiny-x: -100%; }
}

.bemo-shiny-button {
  --bemo-shiny-x: 100%;
}
*/
