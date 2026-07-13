import React from 'react';
import './InteractiveHoverButton.css';

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  children = 'Button',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const classes = ['bemo-interactive-hover-button', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      <span className="bemo-interactive-hover-button__content">
        <span className="bemo-interactive-hover-button__dot" aria-hidden="true" />
        <span className="bemo-interactive-hover-button__label">{children}</span>
      </span>
      <span className="bemo-interactive-hover-button__hover" aria-hidden="true">
        <span className="bemo-interactive-hover-button__hover-label">{children}</span>
        <svg
          className="bemo-interactive-hover-button__arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </button>
  );
};

export default InteractiveHoverButton;
