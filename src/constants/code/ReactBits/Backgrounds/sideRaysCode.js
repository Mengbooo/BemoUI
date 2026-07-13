import code from '@content/ReactBits/Backgrounds/SideRays/SideRays.jsx?raw';
import css from '@content/ReactBits/Backgrounds/SideRays/SideRays.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/SideRays/SideRays.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/SideRays/SideRays.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/SideRays/SideRays.tsx?raw';

export const sideRays = {
  dependencies: `ogl`,
  usage: `import SideRays from './SideRays';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <SideRays
    speed={2.5}
    rayColor1="#EAB308"
    rayColor2="#96c8ff"
    intensity={2}
    spread={2}
    origin="top-right"
    tilt={0}
    saturation={1.5}
    blend={0.75}
    falloff={1.6}
    opacity={1.0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
