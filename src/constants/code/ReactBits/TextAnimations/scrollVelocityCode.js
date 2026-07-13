import code from '@content/ReactBits/TextAnimations/ScrollVelocity/ScrollVelocity.jsx?raw';
import css from '@content/ReactBits/TextAnimations/ScrollVelocity/ScrollVelocity.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/ScrollVelocity/ScrollVelocity.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/ScrollVelocity/ScrollVelocity.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/ScrollVelocity/ScrollVelocity.tsx?raw';

export const scrollVelocity = {
  dependencies: `framer-motion`,
  usage: `import ScrollVelocity from './ScrollVelocity';

<ScrollVelocity
  texts={['BemoUI', 'Scroll Down']}
  velocity={velocity}
  className="custom-scroll-text"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
