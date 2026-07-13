import code from '@content/ReactBits/TextAnimations/ASCIIText/ASCIIText.jsx?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/ASCIIText/ASCIIText.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/ASCIIText/ASCIIText.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/ASCIIText/ASCIIText.tsx?raw';

export const asciiText = {
  dependencies: `three`,
  usage: `// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE

import ASCIIText from './ASCIIText';

<ASCIIText
  text='hello_world'
  enableWaves={true}
  asciiFontSize={8}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
