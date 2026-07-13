import code from '@content/ReactBits/Backgrounds/Lightning/Lightning.jsx?raw';
import css from '@content/ReactBits/Backgrounds/Lightning/Lightning.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Lightning/Lightning.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Lightning/Lightning.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Lightning/Lightning.tsx?raw';

export const lightning = {
  usage: `import Lightning from './Lightning';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Lightning
    hue={220}
    xOffset={0}
    speed={1}
    intensity={1}
    size={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
