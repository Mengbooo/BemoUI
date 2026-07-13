import code from '@content/ReactBits/Backgrounds/Prism/Prism.jsx?raw';
import css from '@content/ReactBits/Backgrounds/Prism/Prism.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Prism/Prism.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Prism/Prism.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Prism/Prism.tsx?raw';

export const prism = {
  dependencies: `ogl`,
  usage: `import Prism from './Prism';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Prism
    animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0.5}
    glow={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
