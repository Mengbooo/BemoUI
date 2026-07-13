import code from '@content/ReactBits/Backgrounds/LiquidChrome/LiquidChrome.jsx?raw';
import css from '@content/ReactBits/Backgrounds/LiquidChrome/LiquidChrome.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/LiquidChrome/LiquidChrome.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/LiquidChrome/LiquidChrome.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/LiquidChrome/LiquidChrome.tsx?raw';

export const liquidChrome = {
  dependencies: `ogl`,
  usage: `import LiquidChrome from './LiquidChrome';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LiquidChrome
    baseColor={[0.1, 0.1, 0.1]}
    speed={1}
    amplitude={0.6}
    interactive={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
