import code from '@content/ReactBits/Backgrounds/Dither/Dither.jsx?raw';
import css from '@content/ReactBits/Backgrounds/Dither/Dither.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Dither/Dither.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Dither/Dither.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Dither/Dither.tsx?raw';

export const dither = {
  dependencies: 'three postprocessing @react-three/fiber @react-three/postprocessing',
  usage: `import Dither from './Dither';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Dither
    waveColor={[0.5, 0.5, 0.5]}
    disableAnimation={false}
    enableMouseInteraction={true}
    mouseRadius={0.3}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
