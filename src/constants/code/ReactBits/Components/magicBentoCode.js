import code from '@content/ReactBits/Components/MagicBento/MagicBento.jsx?raw';
import css from '@content/ReactBits/Components/MagicBento/MagicBento.css?raw';
import tailwind from '@tailwind/ReactBits/Components/MagicBento/MagicBento.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/MagicBento/MagicBento.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/MagicBento/MagicBento.tsx?raw';

export const magicBento = {
  dependencies: `gsap`,
  usage: `import MagicBento from './MagicBento'

<MagicBento
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
