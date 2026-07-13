import { useState } from 'react';
import './InteractiveGridPattern.css';

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = '',
  squaresClassName = '',
  disabled = false,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`bemo-interactive-grid-pattern${disabled ? ' bemo-interactive-grid-pattern--disabled' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        const isHovered = !disabled && hoveredSquare === index;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={`bemo-interactive-grid-pattern__square${isHovered ? ' bemo-interactive-grid-pattern__square--hovered' : ''}${squaresClassName ? ` ${squaresClassName}` : ''}`}
            onMouseEnter={() => {
              if (!disabled) setHoveredSquare(index);
            }}
            onMouseLeave={() => {
              if (!disabled) setHoveredSquare(null);
            }}
          />
        );
      })}
    </svg>
  );
}

export default InteractiveGridPattern;
