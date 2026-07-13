import code from '@content/Components/FlickeringGrid/FlickeringGrid.jsx?raw';
import css from '@content/Components/FlickeringGrid/FlickeringGrid.css?raw';
import tailwind from '@tailwind/Components/FlickeringGrid/FlickeringGrid.jsx?raw';
import tsCode from '@ts-default/Components/FlickeringGrid/FlickeringGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/FlickeringGrid/FlickeringGrid.tsx?raw';

export const flickeringGrid = {
  usage: `<div style={{ height: 320, width: '100%', position: 'relative' }}>
  <FlickeringGrid
    squareSize={4}
    gridGap={6}
    flickerChance={0.3}
    color="#1620E4"
    maxOpacity={0.4}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
