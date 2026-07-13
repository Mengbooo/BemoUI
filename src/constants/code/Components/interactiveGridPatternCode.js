import code from '@content/Components/InteractiveGridPattern/InteractiveGridPattern.jsx?raw';
import css from '@content/Components/InteractiveGridPattern/InteractiveGridPattern.css?raw';
import tailwind from '@tailwind/Components/InteractiveGridPattern/InteractiveGridPattern.jsx?raw';
import tsCode from '@ts-default/Components/InteractiveGridPattern/InteractiveGridPattern.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/InteractiveGridPattern/InteractiveGridPattern.tsx?raw';

export const interactiveGridPattern = {
  usage: `<div style={{ position: 'relative', height: 400, width: '100%', overflow: 'hidden' }}>
  <InteractiveGridPattern width={40} height={40} squares={[24, 24]} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
