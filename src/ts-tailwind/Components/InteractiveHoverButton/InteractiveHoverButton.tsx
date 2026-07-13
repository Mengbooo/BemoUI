import React from 'react';

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  children = 'Button',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const classes = [
    'group relative inline-flex w-auto cursor-pointer overflow-hidden rounded-full border border-gray-200 bg-white p-2 px-6 text-center font-semibold text-gray-900 transition-[border-color,box-shadow,opacity,background-color,color] duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] focus-visible:shadow-[0_0_0_4px_rgba(22,32,228,0.2)] disabled:cursor-not-allowed disabled:opacity-50',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      <span className="flex items-center justify-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-[#1620E4] transition-transform duration-300 group-hover:scale-[100.8] group-disabled:group-hover:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:bg-[#7BE9C6]"
          aria-hidden="true"
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 group-disabled:group-hover:translate-x-0 group-disabled:group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:opacity-0">
          {children}
        </span>
      </span>
      <span
        className="pointer-events-none absolute inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 group-disabled:group-hover:translate-x-12 group-disabled:group-hover:opacity-0 motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:opacity-100"
        aria-hidden="true"
      >
        <span>{children}</span>
        <svg
          className="h-4 w-4 shrink-0 text-[#7BE9C6]"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
      <span
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-transparent transition-colors duration-200 motion-reduce:group-hover:bg-[#1620E4]"
        aria-hidden="true"
      />
    </button>
  );
};

export default InteractiveHoverButton;

// Required global keyframes: none. This component uses CSS transitions only (no @keyframes).
// Optional reduced-motion polish: ensure Tailwind motion-reduce utilities are available in your Tailwind v4 setup.
