import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const TwentyFirstCultMinimalCard = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[24px] bg-neutral-50 p-2 no-underline text-neutral-900',
        'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
        'shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.08)_0_1px_2px_-1px,rgba(17,24,28,0.04)_0_2px_4px]',
        'transition-colors duration-200 ease-out hover:bg-neutral-100',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]',
        'disabled:opacity-55 disabled:pointer-events-none disabled:cursor-not-allowed',
        'dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
        'motion-reduce:transition-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
TwentyFirstCultMinimalCard.displayName = 'TwentyFirstCultMinimalCard';

export const TwentyFirstCultMinimalCardImage = React.forwardRef(
  ({ className, alt = '', src, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative h-[190px] w-full rounded-[20px] mb-6 overflow-hidden',
        'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
        'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
        'max-sm:h-[150px] max-sm:mb-4',
        className
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        width={200}
        height={200}
        loading="lazy"
        decoding="async"
        className="rounded-[16px] object-cover absolute h-full w-full inset-0"
      />
      <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden="true">
        <div
          className={cn(
            'absolute inset-0 rounded-[16px]',
            'shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_#fff,0px_0px_0px_4px_rgba(0,0,0,.08)]',
            'dark:shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_rgba(100,100,100,0.3),0px_0px_0px_4px_rgba(0,0,0,.08)]'
          )}
        />
        <div
          className={cn(
            'absolute inset-0 rounded-[16px]',
            'dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0px_0px_1px_rgba(0,0,0,0.15)_inset,0px_0px_1px_0px_rgba(0,0,0,0.15)]'
          )}
        />
      </div>
    </div>
  )
);
TwentyFirstCultMinimalCardImage.displayName = 'TwentyFirstCultMinimalCardImage';

export const TwentyFirstCultMinimalCardTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg mt-2 font-semibold leading-tight px-1 max-sm:text-base',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
TwentyFirstCultMinimalCardTitle.displayName = 'TwentyFirstCultMinimalCardTitle';

export const TwentyFirstCultMinimalCardDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-500 pb-2 px-1 dark:text-neutral-400', className)}
      {...props}
    >
      {children}
    </p>
  )
);
TwentyFirstCultMinimalCardDescription.displayName = 'TwentyFirstCultMinimalCardDescription';

export const TwentyFirstCultMinimalCardContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0 max-sm:px-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
TwentyFirstCultMinimalCardContent.displayName = 'TwentyFirstCultMinimalCardContent';

export const TwentyFirstCultMinimalCardFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 p-6 pt-0 max-sm:px-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
TwentyFirstCultMinimalCardFooter.displayName = 'TwentyFirstCultMinimalCardFooter';

export default TwentyFirstCultMinimalCard;

/* Tailwind v4 keyframes (none required for this static card component)
   Accent colors: #1620E4, #7BE9C6
*/
