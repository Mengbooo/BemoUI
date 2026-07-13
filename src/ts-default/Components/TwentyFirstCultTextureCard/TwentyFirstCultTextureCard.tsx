import React from 'react';
import './TwentyFirstCultTextureCard.css';

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
  if (variant === 'styled') {
    return (
      <div
        ref={ref}
        className={cn(
          'bemo-21st-cult-texture-card bemo-21st-cult-texture-card--styled',
          className
        )}
        {...props}
      >
        <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--1">
          <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--2">
            <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--3">
              <div className="bemo-21st-cult-texture-card__inner">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'bemo-21st-cult-texture-card bemo-21st-cult-texture-card--default',
        className
      )}
      {...props}
    >
      <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--1">
        <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--2">
          <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--3">
            <div className="bemo-21st-cult-texture-card__inner">{children}</div>
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
    className={cn('bemo-21st-cult-texture-card__header', className)}
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
    className={cn('bemo-21st-cult-texture-card__title', className)}
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
    className={cn('bemo-21st-cult-texture-card__description', className)}
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
    className={cn('bemo-21st-cult-texture-card__content', className)}
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
    className={cn('bemo-21st-cult-texture-card__footer', className)}
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
    className={cn('bemo-21st-cult-texture-card__separator', className)}
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
