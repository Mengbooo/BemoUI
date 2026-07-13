import code from '@content/Components/ProgressiveBlur/ProgressiveBlur.jsx?raw';
import css from '@content/Components/ProgressiveBlur/ProgressiveBlur.css?raw';
import tailwind from '@tailwind/Components/ProgressiveBlur/ProgressiveBlur.jsx?raw';
import tsCode from '@ts-default/Components/ProgressiveBlur/ProgressiveBlur.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ProgressiveBlur/ProgressiveBlur.tsx?raw';

export const progressiveBlur = {
  usage: `<div style={{ position: 'relative', height: 240, overflow: 'hidden', borderRadius: 12 }}>
  <div style={{ height: '100%', background: 'linear-gradient(135deg, #1620E4, #7BE9C6)' }} />
  <ProgressiveBlur position="bottom" height="45%" />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
