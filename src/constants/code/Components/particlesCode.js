import code from '@content/Components/Particles/Particles.jsx?raw';
import css from '@content/Components/Particles/Particles.css?raw';
import tailwind from '@tailwind/Components/Particles/Particles.jsx?raw';
import tsCode from '@ts-default/Components/Particles/Particles.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Particles/Particles.tsx?raw';

export const particles = {
  usage: `<div style={{ position: 'relative', height: 400, background: '#0a0a0a' }}>
  <Particles quantity={100} color="#1620E4" ease={60} />
  <Particles quantity={40} color="#7BE9C6" size={0.5} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
