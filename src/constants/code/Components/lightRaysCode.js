import code from '@content/Components/LightRays/LightRays.jsx?raw';
import css from '@content/Components/LightRays/LightRays.css?raw';
import tailwind from '@tailwind/Components/LightRays/LightRays.jsx?raw';
import tsCode from '@ts-default/Components/LightRays/LightRays.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/LightRays/LightRays.tsx?raw';

export const lightRays = {
  usage: `<div style={{ position: 'relative', minHeight: 400, background: '#000', overflow: 'hidden' }}>
  <LightRays count={7} color="rgba(22, 32, 228, 0.35)" blur={36} speed={14} length="70vh" />
  <h1 style={{ position: 'relative', zIndex: 1, color: '#fff', padding: 24 }}>BemoUI</h1>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
