import React from 'react';

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className = '',
  ...props
}) {
  const count = Math.min(Math.max(0, Math.floor(Number(numCircles) || 0)), 32);
  const baseSize = Math.max(0, Number(mainCircleSize) || 0);
  const baseOpacity = Math.min(1, Math.max(0, Number(mainCircleOpacity) || 0));

  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`.trim()}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const size = baseSize + i * 70;
        const opacity = Math.max(0, baseOpacity - i * 0.03);
        const color = i % 2 === 0 ? '#1620E4' : '#7BE9C6';

        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border border-solid shadow-xl animate-[bemo-ripple_2s_ease_infinite] motion-reduce:animate-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay: `${i * 0.06}s`,
              borderColor: color,
              backgroundColor: `${color}40`,
              transform: 'translate(-50%, -50%) scale(1)',
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';

/*
Required global keyframes for Tailwind v4 (add to your global CSS):

@keyframes bemo-ripple {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.9);
  }
}
*/
