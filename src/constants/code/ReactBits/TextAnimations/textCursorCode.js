import code from '@content/ReactBits/TextAnimations/TextCursor/TextCursor.jsx?raw';
import css from '@content/ReactBits/TextAnimations/TextCursor/TextCursor.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/TextCursor/TextCursor.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/TextCursor/TextCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/TextCursor/TextCursor.tsx?raw';

export const textCursor = {
  dependencies: `framer-motion`,
  usage: `import TextCursor from './TextCursor';

<TextCursor
  text="Hello!"
  spacing={80}
  followMouseDirection={true}
  randomFloat={true}
  exitDuration={0.3}
  removalInterval={20}
  maxPoints={10}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
