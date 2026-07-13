import { useId } from 'react';
import './NoiseTexture.css';

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
      className={`bemo-noise-texture${className ? ` ${className}` : ''}`}
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
