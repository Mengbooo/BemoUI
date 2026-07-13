import code from '@content/Components/Ripple/Ripple.jsx?raw';
import css from '@content/Components/Ripple/Ripple.css?raw';
import tailwind from '@tailwind/Components/Ripple/Ripple.jsx?raw';
import tsCode from '@ts-default/Components/Ripple/Ripple.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Ripple/Ripple.tsx?raw';

export const ripple = {
  usage: `<div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
  <Ripple mainCircleSize={210} mainCircleOpacity={0.24} numCircles={8} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
