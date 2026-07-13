import { useId, type ComponentProps } from 'react';
import './NoiseTexture.css';

export interface NoiseTextureProps extends ComponentProps<'svg'> {
  /** Extra classes merged onto the root svg element. */
  className?: string;
  /**
   * baseFrequency for feTurbulence; higher values yield finer-grained noise.
   * @default 0.4
   */
  frequency?: number;
  /**
   * numOctaves for feTurbulence; more octaves add detail at smaller scales.
   * @default 6
   */
  octaves?: number;
  /**
   * Linear slope on each channel after desaturation; adjusts noise contrast.
   * @default 0.15
   */
  slope?: number;
  /**
   * Opacity of the filled noise layer (rect).
   * @default 0.6
   */
  noiseOpacity?: number;
}

export const NoiseTexture = ({
  className = '',
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps) => {
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
