import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './BentoGrid.css';

export interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

export interface BentoCardProps extends ComponentPropsWithoutRef<'article'> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: ElementType<{ className?: string; 'aria-hidden'?: boolean }>;
  description: string;
  href?: string;
  cta: string;
}

function CtaLink({ href, cta }: { href?: string; cta: string }) {
  const content = (
    <>
      {cta}
      <span className="bemo-bento-grid__cta-arrow" aria-hidden={true}>
        →
      </span>
    </>
  );

  if (!href) {
    return (
      <span className="bemo-bento-grid__cta bemo-bento-grid__cta--disabled" aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a href={href} className="bemo-bento-grid__cta">
      {content}
    </a>
  );
}

export function BentoGrid({ children, className = '', ...props }: BentoGridProps) {
  const classes = ['bemo-bento-grid', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className = '',
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  const classes = ['bemo-bento-grid__card', className].filter(Boolean).join(' ');

  return (
    <article className={classes} {...props}>
      <div className="bemo-bento-grid__background" aria-hidden={true}>
        {background}
      </div>

      <div className="bemo-bento-grid__body">
        <div className="bemo-bento-grid__content">
          {Icon ? <Icon className="bemo-bento-grid__icon" aria-hidden={true} /> : null}
          <h3 className="bemo-bento-grid__title">{name}</h3>
          <p className="bemo-bento-grid__description">{description}</p>
        </div>

        <div className="bemo-bento-grid__cta-mobile">
          <CtaLink href={href} cta={cta} />
        </div>
      </div>

      <div className="bemo-bento-grid__cta-desktop">
        <CtaLink href={href} cta={cta} />
      </div>

      <div className="bemo-bento-grid__overlay" aria-hidden={true} />
      <div className="bemo-bento-grid__accent" aria-hidden={true} />
    </article>
  );
}
