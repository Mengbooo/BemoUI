import code from '@content/ReactBits/Animations/Antigravity/Antigravity.jsx?raw';
import tailwind from '@tailwind/ReactBits/Animations/Antigravity/Antigravity.jsx?raw';
import tsCode from '@ts-default/ReactBits/Animations/Antigravity/Antigravity.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Animations/Antigravity/Antigravity.tsx?raw';

export const antigravity = {
  dependencies: `three @react-three/fiber`,
  usage: `import Antigravity from './Antigravity';

<div style={{ width: '100%', height: '400px', position: 'relative' }}>
  <Antigravity
    count={300}
    magnetRadius={6}
    ringRadius={7}
    waveSpeed={0.4}
    waveAmplitude={1}
    particleSize={1.5}
    lerpSpeed={0.05}
    color={'#FF9FFC'}
    autoAnimate={true}
    particleVariance={1}
  />
</div>
  `,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
