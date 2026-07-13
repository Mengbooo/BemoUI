import code from '@content/Components/CoolMode/CoolMode.jsx?raw';
import css from '@content/Components/CoolMode/CoolMode.css?raw';
import tailwind from '@tailwind/Components/CoolMode/CoolMode.jsx?raw';
import tsCode from '@ts-default/Components/CoolMode/CoolMode.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/CoolMode/CoolMode.tsx?raw';

export const coolMode = {
  usage: `<CoolMode options={{ particle: 'circle', size: 20 }}>
  <button type="button">Click and hold</button>
</CoolMode>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
