import code from '@content/Components/NoiseTexture/NoiseTexture.jsx?raw';
import css from '@content/Components/NoiseTexture/NoiseTexture.css?raw';
import tailwind from '@tailwind/Components/NoiseTexture/NoiseTexture.jsx?raw';
import tsCode from '@ts-default/Components/NoiseTexture/NoiseTexture.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/NoiseTexture/NoiseTexture.tsx?raw';

export const noiseTexture = {
  usage: `<div style={{ position: 'relative', height: 240, background: '#1620E4', overflow: 'hidden' }}>
  <NoiseTexture />
  <p style={{ position: 'relative', zIndex: 1, color: 'white', padding: 16 }}>
    Overlay content
  </p>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
