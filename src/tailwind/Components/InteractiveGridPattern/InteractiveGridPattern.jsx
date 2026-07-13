import { useState } from 'react';

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
      className={`absolute inset-0 block h-full w-full border border-gray-400/30 box-border${disabled ? ' pointer-events-none opacity-55' : ''}${className ? ` ${className}` : ''}`}
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
            className={`stroke-gray-400/30 transition-all duration-1000 ease-in-out motion-reduce:transition-none${isHovered ? ' fill-[#1620E4]/15 stroke-[#7BE9C6]/55 duration-100' : ' fill-transparent'}${squaresClassName ? ` ${squaresClassName}` : ''}`}
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

/* Required global keyframes: none. This component uses CSS transitions only.
   Tailwind v4: motion-reduce:transition-none covers prefers-reduced-motion.
   Accent colors: BemoUI blue #1620E4 and green #7BE9C6. */
