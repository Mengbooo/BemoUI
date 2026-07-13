import React from 'react';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className = '',
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / Math.max(speed, 0.001);
  const childArray = React.Children.toArray(children);
  const count = Math.max(childArray.length, 1);

  return (
    <div
      className={['relative h-full w-full', className].filter(Boolean).join(' ')}
      role="presentation"
      {...props}
    >
      {path ? (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="rgba(22, 32, 228, 0.2)"
            strokeWidth="1"
          />
        </svg>
      ) : null}
      {childArray.map((child, index) => {
        const angle = (360 / count) * index;
        return (
          <div
            key={index}
            className={[
              'absolute top-1/2 left-1/2 flex items-center justify-center rounded-full',
              '[animation:bemo-orbit_var(--duration)_linear_infinite]',
              reverse ? '[animation-direction:reverse]' : '',
              'motion-reduce:![animation:none]',
              'motion-reduce:[transform:rotate(var(--angle))_translateY(var(--radius))_rotate(calc(var(--angle)*-1))]',
            ]
              .filter(Boolean)
              .join(' ')}
            style={
              {
                width: iconSize,
                height: iconSize,
                marginTop: -iconSize / 2,
                marginLeft: -iconSize / 2,
                '--duration': `${calculatedDuration}s`,
                '--radius': `${radius}px`,
                '--angle': `${angle}deg`,
                animationDelay: `${delay}s`,
              } as React.CSSProperties
            }
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitingCircles;

/*
Required global keyframes (add to your global CSS for Tailwind v4):

@keyframes bemo-orbit {
  from {
    transform: rotate(var(--angle)) translateY(var(--radius)) rotate(calc(var(--angle) * -1));
  }
  to {
    transform: rotate(calc(var(--angle) + 360deg)) translateY(var(--radius)) rotate(calc(var(--angle) * -1 - 360deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes bemo-orbit {
    from,
    to {
      transform: rotate(var(--angle)) translateY(var(--radius)) rotate(calc(var(--angle) * -1));
    }
  }
}
*/
