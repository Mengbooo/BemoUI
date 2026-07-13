import React from 'react';
import './RainbowButton.css';

export type RainbowButtonVariant = 'default' | 'outline';
export type RainbowButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: RainbowButtonVariant;
  size?: RainbowButtonSize;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  function RainbowButton(
    {
      className = '',
      variant = 'default',
      size = 'default',
      disabled = false,
      type = 'button',
      children,
      ...props
    },
    ref
  ) {
    const resolvedVariant: RainbowButtonVariant =
      variant === 'outline' ? 'outline' : 'default';
    const resolvedSize: RainbowButtonSize = (['sm', 'lg', 'icon'] as const).includes(
      size as Exclude<RainbowButtonSize, 'default'>
    )
      ? size
      : 'default';

    const classNames = [
      'bemo-rainbow-button',
      `bemo-rainbow-button--${resolvedVariant}`,
      `bemo-rainbow-button--size-${resolvedSize}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        <span className="bemo-rainbow-button__content">{children}</span>
      </button>
    );
  }
);

RainbowButton.displayName = 'RainbowButton';

export { RainbowButton };
export default RainbowButton;
