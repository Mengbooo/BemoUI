import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const TwentyFirstCultTextureCard = React.forwardRef(
  ({ className, children, variant = 'default', ...props }, ref) => {
    const baseOuter =
      variant === 'styled'
        ? 'rounded-[24px] border border-white/60 bg-gradient-to-b from-neutral-100 to-white/70 dark:border-stone-950/60 dark:from-neutral-800 dark:to-neutral-900'
        : 'rounded-[24px] border border-white/60 dark:border-neutral-800/30';

    return (
      <div
        ref={ref}
        className={cn(baseOuter, 'text-neutral-500 isolation-isolate', className)}
        {...props}
      >
        <div className="rounded-[23px] border border-black/10 dark:border-neutral-900/80">
          <div className="rounded-[22px] border border-white/50 dark:border-neutral-950">
            <div className="rounded-[21px] border border-neutral-950/20 dark:border-neutral-900/70">
              <div
                className={cn(
                  'w-full rounded-[20px] border border-white/50 text-neutral-500 dark:border-neutral-700/50 dark:text-neutral-400',
                  variant === 'default' &&
                    'bg-gradient-to-b from-white/70 to-neutral-100/50 dark:from-neutral-800/70 dark:to-neutral-900/50'
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TwentyFirstCultTextureCard.displayName = 'TwentyFirstCultTextureCard';

const TwentyFirstCultTextureCardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('first:pt-6 last:pb-6', className)}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardHeader.displayName = 'TwentyFirstCultTextureCardHeader';

const TwentyFirstCultTextureCardTitle = React.forwardRef(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'pl-2 pr-2 text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100',
        className
      )}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardTitle.displayName = 'TwentyFirstCultTextureCardTitle';

const TwentyFirstCultTextureCardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'mt-1 pl-2 pr-2 text-sm text-neutral-600 dark:text-neutral-400',
        className
      )}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardDescription.displayName = 'TwentyFirstCultTextureCardDescription';

const TwentyFirstCultTextureCardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 sm:px-6', className)}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardContent.displayName = 'TwentyFirstCultTextureCardContent';

const TwentyFirstCultTextureCardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 px-6 py-4',
        className
      )}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardFooter.displayName = 'TwentyFirstCultTextureCardFooter';

const TwentyFirstCultTextureSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        'border-l-transparent border-r-transparent border-t-neutral-50 border-b-neutral-300/50 dark:border-t-neutral-950 dark:border-b-neutral-700/50 border-y',
        className
      )}
      {...props}
    />
  )
);
TwentyFirstCultTextureSeparator.displayName = 'TwentyFirstCultTextureSeparator';

export {
  TwentyFirstCultTextureCard,
  TwentyFirstCultTextureCardHeader,
  TwentyFirstCultTextureCardTitle,
  TwentyFirstCultTextureCardDescription,
  TwentyFirstCultTextureCardContent,
  TwentyFirstCultTextureCardFooter,
  TwentyFirstCultTextureSeparator,
};

export default TwentyFirstCultTextureCard;

/*
No custom keyframes required for this texture card.
Focus rings use browser defaults or can be extended with:
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]
*/
