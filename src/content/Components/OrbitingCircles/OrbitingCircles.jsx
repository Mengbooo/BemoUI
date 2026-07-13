import React from 'react';
import './OrbitingCircles.css';

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
}) {
  const calculatedDuration = duration / Math.max(speed, 0.001);
  const childArray = React.Children.toArray(children);
  const count = Math.max(childArray.length, 1);

  return (
    <div
      className={['bemo-orbiting-circles', className].filter(Boolean).join(' ')}
      role="presentation"
      {...props}
    >
      {path ? (
        <svg
          className="bemo-orbiting-circles__path"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className="bemo-orbiting-circles__path-circle"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      ) : null}
      {childArray.map((child, index) => {
        const angle = (360 / count) * index;
        return (
          <div
            key={index}
            className={[
              'bemo-orbiting-circles__item',
              reverse ? 'bemo-orbiting-circles__item--reverse' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              '--duration': String(calculatedDuration),
              '--radius': String(radius),
              '--angle': String(angle),
              '--icon-size': `${iconSize}px`,
              '--delay': String(delay),
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitingCircles;
