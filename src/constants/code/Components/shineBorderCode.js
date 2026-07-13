import code from '@content/Components/ShineBorder/ShineBorder.jsx?raw';
import css from '@content/Components/ShineBorder/ShineBorder.css?raw';
import tailwind from '@tailwind/Components/ShineBorder/ShineBorder.jsx?raw';
import tsCode from '@ts-default/Components/ShineBorder/ShineBorder.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ShineBorder/ShineBorder.tsx?raw';

export const shineBorder = {
  usage: `<div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', padding: 24 }}>
  <ShineBorder borderWidth={1} duration={14} shineColor={['#1620E4', '#7BE9C6']} />
  <p>Your content</p>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
