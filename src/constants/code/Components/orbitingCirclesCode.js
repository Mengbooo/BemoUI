import code from '@content/Components/OrbitingCircles/OrbitingCircles.jsx?raw';
import css from '@content/Components/OrbitingCircles/OrbitingCircles.css?raw';
import tailwind from '@tailwind/Components/OrbitingCircles/OrbitingCircles.jsx?raw';
import tsCode from '@ts-default/Components/OrbitingCircles/OrbitingCircles.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/OrbitingCircles/OrbitingCircles.tsx?raw';

export const orbitingCircles = {
  usage: `<div style={{ position: 'relative', width: 320, height: 320 }}>
  <OrbitingCircles radius={120} iconSize={36}>
    <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '9999px', background: '#1620E4' }} />
    <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '9999px', background: '#7BE9C6' }} />
    <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '9999px', background: '#1620E4' }} />
    <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '9999px', background: '#7BE9C6' }} />
  </OrbitingCircles>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
