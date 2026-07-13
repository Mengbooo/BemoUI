import { useId } from 'react';

export function StripedPattern({
  direction = 'left',
  className = '',
  width = 10,
  height = 10,
  ...props
}) {
  const id = useId();
  const w = Number(width);
  const h = Number(height);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5] text-[#1620E4] ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          {direction === 'left' ? (
            <>
              <line x1="0" y1={h} x2={w} y2="0" stroke="currentColor" />
              <line x1={-w} y1={h} x2="0" y2="0" stroke="currentColor" />
              <line x1={w} y1={h} x2={w * 2} y2="0" stroke="currentColor" />
            </>
          ) : (
            <>
              <line x1="0" y1="0" x2={w} y2={h} stroke="currentColor" />
              <line x1={-w} y1="0" x2="0" y2={h} stroke="currentColor" />
              <line x1={w} y1="0" x2={w * 2} y2={h} stroke="currentColor" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// Required global keyframes (add to your global CSS if needed):
// None required — StripedPattern is a static decorative SVG pattern with no animations.
// prefers-reduced-motion is respected (no motion is present).
