import { useId } from 'react';

export const NoiseTexture = ({
  className = '',
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}) => {
  const filterId = `bemo-noise-${useId().replace(/:/g, '')}`;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none dark:opacity-[0.75] ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      {...props}
    >
      <filter id={filterId} colorInterpolationFilters="sRGB">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
        <feComponentTransfer in="mono" result="contrast">
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect
        width="100%"
        height="100%"
        filter={`url(#${filterId})`}
        opacity={noiseOpacity}
      />
    </svg>
  );
};

export default NoiseTexture;

// Required global keyframes: none.
// NoiseTexture is a static SVG feTurbulence overlay and does not use CSS animations.
// Respect prefers-reduced-motion by keeping the effect static (already satisfied).
