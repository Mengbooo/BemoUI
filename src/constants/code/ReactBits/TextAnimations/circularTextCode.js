import code from '@content/ReactBits/TextAnimations/CircularText/CircularText.jsx?raw';
import css from '@content/ReactBits/TextAnimations/CircularText/CircularText.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/CircularText/CircularText.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/CircularText/CircularText.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/CircularText/CircularText.tsx?raw';

export const circularText = {
  dependencies: `framer-motion`,
  usage: `import CircularText from './CircularText';

<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
