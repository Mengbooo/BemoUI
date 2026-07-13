import code from '@content/Components/Lens/Lens.jsx?raw';
import css from '@content/Components/Lens/Lens.css?raw';
import tailwind from '@tailwind/Components/Lens/Lens.jsx?raw';
import tsCode from '@ts-default/Components/Lens/Lens.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Lens/Lens.tsx?raw';

export const lens = {
  usage: `<Lens zoomFactor={1.5} lensSize={160} lensColor="#1620E4" ariaLabel="Zoom area">
  <img src="/hero.jpg" alt="Product" width={420} height={280} />
</Lens>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
