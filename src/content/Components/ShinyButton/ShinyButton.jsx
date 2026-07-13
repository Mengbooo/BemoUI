import React from 'react';
import './ShinyButton.css';

const ShinyButton = React.forwardRef(function ShinyButton(
  { children, className = '', disabled = false, type = 'button', ...props },
  ref
) {
  const classes = ['bemo-shiny-button', className].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      <span className="bemo-shiny-button__label">{children}</span>
      <span className="bemo-shiny-button__border" aria-hidden="true" />
    </button>
  );
});

ShinyButton.displayName = 'ShinyButton';

export default ShinyButton;
