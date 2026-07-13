import code from '@content/Components/RetroGrid/RetroGrid.jsx?raw';
import css from '@content/Components/RetroGrid/RetroGrid.css?raw';
import tailwind from '@tailwind/Components/RetroGrid/RetroGrid.jsx?raw';
import tsCode from '@ts-default/Components/RetroGrid/RetroGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/RetroGrid/RetroGrid.tsx?raw';

export const retroGrid = {
  usage: `<div style={{ position: 'relative', height: 420 }}>
  <RetroGrid angle={65} cellSize={60} opacity={0.5} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
