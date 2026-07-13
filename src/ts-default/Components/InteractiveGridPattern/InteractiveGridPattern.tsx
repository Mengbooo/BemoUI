import React, { useState, type SVGProps } from 'react';
import './InteractiveGridPattern.css';

export interface InteractiveGridPatternProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
  disabled?: boolean;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = '',
  squaresClassName = '',
  disabled = false,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

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
