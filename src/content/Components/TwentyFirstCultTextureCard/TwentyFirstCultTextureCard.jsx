import React from 'react';
import './TwentyFirstCultTextureCard.css';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const TwentyFirstCultTextureCard = React.forwardRef(
  ({ className, children, variant = 'default', ...props }, ref) => {
    if (variant === 'styled') {
      return (
        <div
          ref={ref}
          className={cn('bemo-21st-cult-texture-card bemo-21st-cult-texture-card--styled', className)}
          {...props}
        >
          <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--1">
            <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--2">
              <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--3">
                <div className="bemo-21st-cult-texture-card__inner">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('bemo-21st-cult-texture-card bemo-21st-cult-texture-card--default', className)}
        {...props}
      >
        <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--1">
          <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--2">
            <div className="bemo-21st-cult-texture-card__layer bemo-21st-cult-texture-card__layer--3">
              <div className="bemo-21st-cult-texture-card__inner">
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
      className={cn('bemo-21st-cult-texture-card__header', className)}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardHeader.displayName = 'TwentyFirstCultTextureCardHeader';

const TwentyFirstCultTextureCardTitle = React.forwardRef(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('bemo-21st-cult-texture-card__title', className)}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardTitle.displayName = 'TwentyFirstCultTextureCardTitle';

const TwentyFirstCultTextureCardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('bemo-21st-cult-texture-card__description', className)}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardDescription.displayName = 'TwentyFirstCultTextureCardDescription';

const TwentyFirstCultTextureCardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bemo-21st-cult-texture-card__content', className)}
      {...props}
    />
  )
);
TwentyFirstCultTextureCardContent.displayName = 'TwentyFirstCultTextureCardContent';

const TwentyFirstCultTextureCardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bemo-21st-cult-texture-card__footer', className)}
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
      className={cn('bemo-21st-cult-texture-card__separator', className)}
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
