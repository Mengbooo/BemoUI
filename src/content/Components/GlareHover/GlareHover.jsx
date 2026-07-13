import { useMemo } from 'react';
import './GlareHover.css';

function parseHEX(color, opacity) {
  const hex = String(color).replace('#', '');
  const parse = (h) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}

export default function GlareHover({
  background = '#000000',
  children,
  color = '#7BE9C6',
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className = '',
  style,
  width,
  height,
  disabled = false,
  ...props
}) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity]);

  const cssVars = {
    '--bemo-gh-angle': `${angle}deg`,
    '--bemo-gh-duration': `${duration}ms`,
    '--bemo-gh-size': `${size}%`,
    '--bemo-gh-rgba': rgba,
    background,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  const classes = [
    'bemo-glare-hover',
    playOnce ? 'bemo-glare-hover--play-once' : '',
    disabled ? 'bemo-glare-hover--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...props}
      className={classes}
      style={cssVars}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
