import code from '@content/Components/StripedPattern/StripedPattern.jsx?raw';
import css from '@content/Components/StripedPattern/StripedPattern.css?raw';
import tailwind from '@tailwind/Components/StripedPattern/StripedPattern.jsx?raw';
import tsCode from '@ts-default/Components/StripedPattern/StripedPattern.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/StripedPattern/StripedPattern.tsx?raw';

export const stripedPattern = {
  usage: `<div style={{ position: 'relative', height: 200, width: '100%' }}>
  <StripedPattern direction="left" />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
