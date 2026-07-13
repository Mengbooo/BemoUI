import React from 'react';
import './RainbowButton.css';

const RainbowButton = React.forwardRef(function RainbowButton(
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
  const resolvedVariant = variant === 'outline' ? 'outline' : 'default';
  const resolvedSize = ['sm', 'lg', 'icon'].includes(size) ? size : 'default';

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
});

RainbowButton.displayName = 'RainbowButton';

export { RainbowButton };
export default RainbowButton;
