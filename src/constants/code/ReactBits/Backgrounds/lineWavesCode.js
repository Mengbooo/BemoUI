import code from '@content/ReactBits/Backgrounds/LineWaves/LineWaves.jsx?raw';
import css from '@content/ReactBits/Backgrounds/LineWaves/LineWaves.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/LineWaves/LineWaves.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/LineWaves/LineWaves.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/LineWaves/LineWaves.tsx?raw';

export const lineWaves = {
  dependencies: `ogl`,
  usage: `import LineWaves from './LineWaves';

<LineWaves
  speed={0.3}
  innerLineCount={32}
  outerLineCount={36}
  warpIntensity={1.0}
  rotation={-45}
  edgeFadeWidth={0.0}
  colorCycleSpeed={1.0}
  brightness={0.2}
  color1="#ffffff"
  color2="#ffffff"
  color3="#ffffff"
  enableMouseInteraction={true}
  mouseInfluence={2.0}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
