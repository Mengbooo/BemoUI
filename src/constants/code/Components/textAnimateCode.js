import code from '@content/Components/TextAnimate/TextAnimate.jsx?raw';
import css from '@content/Components/TextAnimate/TextAnimate.css?raw';
import tailwind from '@tailwind/Components/TextAnimate/TextAnimate.jsx?raw';
import tsCode from '@ts-default/Components/TextAnimate/TextAnimate.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TextAnimate/TextAnimate.tsx?raw';

export const textAnimate = {
  usage: `import TextAnimate from './TextAnimate';

<TextAnimate as="h2" by="word" animation="blurInUp" duration={0.45} once>
  Animate text with BemoUI
</TextAnimate>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
