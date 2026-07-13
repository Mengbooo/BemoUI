import { useMemo } from 'react';

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

  const base = [
    'relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent outline-none',
    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
    'before:[background-image:linear-gradient(var(--bemo-gh-angle),transparent_60%,var(--bemo-gh-rgba)_70%,transparent,transparent_100%)]',
    'before:[background-size:var(--bemo-gh-size)_var(--bemo-gh-size),100%_100%]',
    'before:[background-position:-100%_-100%,0_0]',
    'focus-visible:shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#1620E4]',
    'motion-reduce:before:!transition-none',
  ].join(' ');

  const transition = playOnce
    ? [
        'before:transition-none',
        'hover:before:transition-[background-position] hover:before:duration-[var(--bemo-gh-duration)] hover:before:ease-in-out',
        'focus-visible:before:transition-[background-position] focus-visible:before:duration-[var(--bemo-gh-duration)] focus-visible:before:ease-in-out',
      ].join(' ')
    : 'before:transition-[background-position] before:duration-[var(--bemo-gh-duration)] before:ease-in-out';

  const interaction = disabled
    ? 'cursor-not-allowed opacity-60'
    : 'hover:before:[background-position:100%_100%,0_0] focus-visible:before:[background-position:100%_100%,0_0]';

  return (
    <div
      {...props}
      className={[base, transition, interaction, className].filter(Boolean).join(' ')}
      style={cssVars}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? 'true' : undefined}
    >
      {children}
    </div>
  );
}

/*
 * Global keyframes: none required.
 * GlareHover relies on CSS transitions of background-position only.
 * Ensure Tailwind v4 built-in motion-reduce variant is enabled (default).
 */
