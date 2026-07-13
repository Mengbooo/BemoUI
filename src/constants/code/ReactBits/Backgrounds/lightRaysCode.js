import code from '@content/ReactBits/Backgrounds/LightRays/LightRays.jsx?raw';
import css from '@content/ReactBits/Backgrounds/LightRays/LightRays.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/LightRays/LightRays.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/LightRays/LightRays.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/LightRays/LightRays.tsx?raw';

export const lightRays = {
  dependencies: `ogl`,
  usage: `import LightRays from './LightRays';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#00ffff"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
