import code from '@content/ReactBits/Backgrounds/PlasmaWave/PlasmaWave.jsx?raw';
import css from '@content/ReactBits/Backgrounds/PlasmaWave/PlasmaWave.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/PlasmaWave/PlasmaWave.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/PlasmaWave/PlasmaWave.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/PlasmaWave/PlasmaWave.tsx?raw';

export const plasmaWave = {
  dependencies: `ogl`,
  usage: `import PlasmaWave from './PlasmaWave';

<PlasmaWave
  colors={["#A855F7", "#06B6D4"]}
  speed1={0.05}
  speed2={0.05}
  focalLength={0.8}
  bend1={1}
  bend2={0.5}
  dir2={1.0}
  rotationDeg={0}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
