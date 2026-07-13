import React from 'react';
import './TwentyFirstCultMinimalCard.css';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const TwentyFirstCultMinimalCard = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bemo-21st-cult-minimal-card', className)}
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
  )
);
TwentyFirstCultMinimalCardImage.displayName = 'TwentyFirstCultMinimalCardImage';

export const TwentyFirstCultMinimalCardTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('bemo-21st-cult-minimal-card-title', className)}
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
      className={cn('bemo-21st-cult-minimal-card-description', className)}
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
      className={cn('bemo-21st-cult-minimal-card-content', className)}
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
      className={cn('bemo-21st-cult-minimal-card-footer', className)}
      {...props}
    >
      {children}
    </div>
  )
);
TwentyFirstCultMinimalCardFooter.displayName = 'TwentyFirstCultMinimalCardFooter';

export default TwentyFirstCultMinimalCard;
