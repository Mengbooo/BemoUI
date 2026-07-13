import code from '@content/ReactBits/Backgrounds/Orb/Orb.jsx?raw';
import css from '@content/ReactBits/Backgrounds/Orb/Orb.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Orb/Orb.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Orb/Orb.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Orb/Orb.tsx?raw';

export const orb = {
  dependencies: `ogl`,
  usage: `import Orb from './Orb';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Orb
    hoverIntensity={0.5}
    rotateOnHover={true}
    hue={0}
    forceHoverState={false}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
