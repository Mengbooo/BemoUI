import code from '@content/Components/Meteors/Meteors.jsx?raw';
import css from '@content/Components/Meteors/Meteors.css?raw';
import tailwind from '@tailwind/Components/Meteors/Meteors.jsx?raw';
import tsCode from '@ts-default/Components/Meteors/Meteors.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Meteors/Meteors.tsx?raw';

export const meteors = {
  usage: `<div style={{ position: 'relative', height: '400px', overflow: 'hidden', background: '#000' }}>
  <Meteors number={20} angle={215} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
