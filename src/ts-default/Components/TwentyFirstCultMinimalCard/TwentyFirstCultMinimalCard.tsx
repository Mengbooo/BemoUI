import React from 'react';
import './TwentyFirstCultMinimalCard.css';

const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(' ');

export interface TwentyFirstCultMinimalCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const TwentyFirstCultMinimalCard = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultMinimalCardProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bemo-21st-cult-minimal-card', className)}
    {...props}
  >
    {children}
  </div>
));
TwentyFirstCultMinimalCard.displayName = 'TwentyFirstCultMinimalCard';

export interface TwentyFirstCultMinimalCardImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
}

export const TwentyFirstCultMinimalCardImage = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultMinimalCardImageProps
>(({ className, alt = '', src, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bemo-21st-cult-minimal-card-image', className)}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      width={200}
      height={200}
      className="bemo-21st-cult-minimal-card-image-img"
      loading="lazy"
      decoding="async"
    />
    <div className="bemo-21st-cult-minimal-card-image-overlay" aria-hidden="true">
      <div className="bemo-21st-cult-minimal-card-image-ring" />
      <div className="bemo-21st-cult-minimal-card-image-inner-shadow" />
    </div>
  </div>
));
TwentyFirstCultMinimalCardImage.displayName = 'TwentyFirstCultMinimalCardImage';

export interface TwentyFirstCultMinimalCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const TwentyFirstCultMinimalCardTitle = React.forwardRef<
  HTMLHeadingElement,
  TwentyFirstCultMinimalCardTitleProps
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('bemo-21st-cult-minimal-card-title', className)}
    {...props}
  >
    {children}
  </h3>
));
TwentyFirstCultMinimalCardTitle.displayName = 'TwentyFirstCultMinimalCardTitle';

export interface TwentyFirstCultMinimalCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const TwentyFirstCultMinimalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  TwentyFirstCultMinimalCardDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('bemo-21st-cult-minimal-card-description', className)}
    {...props}
  >
    {children}
  </p>
));
TwentyFirstCultMinimalCardDescription.displayName =
  'TwentyFirstCultMinimalCardDescription';

export interface TwentyFirstCultMinimalCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TwentyFirstCultMinimalCardContent = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultMinimalCardContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bemo-21st-cult-minimal-card-content', className)}
    {...props}
  >
    {children}
  </div>
));
TwentyFirstCultMinimalCardContent.displayName =
  'TwentyFirstCultMinimalCardContent';

export interface TwentyFirstCultMinimalCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TwentyFirstCultMinimalCardFooter = React.forwardRef<
  HTMLDivElement,
  TwentyFirstCultMinimalCardFooterProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bemo-21st-cult-minimal-card-footer', className)}
    {...props}
  >
    {children}
  </div>
));
TwentyFirstCultMinimalCardFooter.displayName =
  'TwentyFirstCultMinimalCardFooter';

export default TwentyFirstCultMinimalCard;
