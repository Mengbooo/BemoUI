import code from '@content/Components/DotPattern/DotPattern.jsx?raw';
import css from '@content/Components/DotPattern/DotPattern.css?raw';
import tailwind from '@tailwind/Components/DotPattern/DotPattern.jsx?raw';
import tsCode from '@ts-default/Components/DotPattern/DotPattern.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/DotPattern/DotPattern.tsx?raw';

export const dotPattern = {
  usage: `<div style={{ position: 'relative', height: '400px', width: '100%' }}>
  <DotPattern width={20} height={20} glow />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
