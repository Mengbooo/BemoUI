import code from '@content/ReactBits/Backgrounds/Aurora/Aurora.jsx?raw';
import css from '@content/ReactBits/Backgrounds/Aurora/Aurora.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Aurora/Aurora.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Aurora/Aurora.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Aurora/Aurora.tsx?raw';

export const aurora = {
  dependencies: `ogl`,
  usage: `import Aurora from './Aurora';

<Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
