import React, {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from 'react';
import './AnimatedShinyText.css';

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className = '',
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--bemo-shiny-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={['bemo-animated-shiny-text', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
};
