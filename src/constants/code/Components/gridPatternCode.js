import code from '@content/Components/GridPattern/GridPattern.jsx?raw';
import css from '@content/Components/GridPattern/GridPattern.css?raw';
import tailwind from '@tailwind/Components/GridPattern/GridPattern.jsx?raw';
import tsCode from '@ts-default/Components/GridPattern/GridPattern.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/GridPattern/GridPattern.tsx?raw';

export const gridPattern = {
  usage: `<div style={{ position: 'relative', height: 400, width: '100%' }}>
  <GridPattern
    width={40}
    height={40}
    squares={[[4, 4], [5, 1], [8, 2], [5, 3], [5, 5]]}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
