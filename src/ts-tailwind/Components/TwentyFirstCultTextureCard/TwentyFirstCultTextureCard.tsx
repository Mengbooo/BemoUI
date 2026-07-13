import React from 'react';

type CnInput = string | false | null | undefined;
const cn = (...classes: CnInput[]) => classes.filter(Boolean).join(' ');

export interface TwentyFirstCultTextureCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'default' | 'styled';
}

const TwentyFirstCultTextureCard = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultTextureCardProps
>(({ className, children, variant = 'default', ...props }, ref) => {
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
});

TwentyFirstCultTextureCard.displayName = 'TwentyFirstCultTextureCard';

export interface TwentyFirstCultTextureCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TwentyFirstCultTextureCardHeader = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultTextureCardHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('first:pt-6 last:pb-6', className)}
    {...props}
  />
));
TwentyFirstCultTextureCardHeader.displayName = 'TwentyFirstCultTextureCardHeader';

export interface TwentyFirstCultTextureCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const TwentyFirstCultTextureCardTitle = React.forwardRef<
  HTMLHeadingElement,
  TwentyFirstCultTextureCardTitleProps
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      'pl-2 pr-2 text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100',
      className
    )}
    {...props}
  />
));
TwentyFirstCultTextureCardTitle.displayName = 'TwentyFirstCultTextureCardTitle';

export interface TwentyFirstCultTextureCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TwentyFirstCultTextureCardDescription = React.forwardRef<
  HTMLParagraphElement,
  TwentyFirstCultTextureCardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mt-1 pl-2 pr-2 text-sm text-neutral-600 dark:text-neutral-400',
      className
    )}
    {...props}
  />
));
TwentyFirstCultTextureCardDescription.displayName =
  'TwentyFirstCultTextureCardDescription';

export interface TwentyFirstCultTextureCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TwentyFirstCultTextureCardContent = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultTextureCardContentProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4 sm:px-6', className)}
    {...props}
  />
));
TwentyFirstCultTextureCardContent.displayName = 'TwentyFirstCultTextureCardContent';

export interface TwentyFirstCultTextureCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TwentyFirstCultTextureCardFooter = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultTextureCardFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-wrap items-center justify-between gap-2 px-6 py-4',
      className
    )}
    {...props}
  />
));
TwentyFirstCultTextureCardFooter.displayName = 'TwentyFirstCultTextureCardFooter';

export interface TwentyFirstCultTextureSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TwentyFirstCultTextureSeparator = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultTextureSeparatorProps
>(({ className, ...props }, ref) => (
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
));
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
Optional focus utility: focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]
*/
