import code from '@content/ReactBits/Backgrounds/DotField/DotField.jsx?raw';
import css from '@content/ReactBits/Backgrounds/DotField/DotField.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/DotField/DotField.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/DotField/DotField.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/DotField/DotField.tsx?raw';

export const dotField = {
  dependencies: ``,
  usage: `import DotField from './DotField';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <DotField
    dotRadius={1.5}
    dotSpacing={14}
    bulgeStrength={67}
    glowRadius={160}
    sparkle={false}
    waveAmplitude={0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
