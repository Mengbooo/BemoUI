import code from '@content/ReactBits/TextAnimations/TrueFocus/TrueFocus.jsx?raw';
import css from '@content/ReactBits/TextAnimations/TrueFocus/TrueFocus.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/TrueFocus/TrueFocus.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/TrueFocus/TrueFocus.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/TrueFocus/TrueFocus.tsx?raw';

export const trueFocus = {
  dependencies: `framer-motion`,
  usage: `import TrueFocus from './TrueFocus';

<TrueFocus
sentence="True Focus"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
