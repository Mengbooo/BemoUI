import code from '@content/ReactBits/TextAnimations/Shuffle/Shuffle.jsx?raw';
import css from '@content/ReactBits/TextAnimations/Shuffle/Shuffle.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/Shuffle/Shuffle.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/Shuffle/Shuffle.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/Shuffle/Shuffle.tsx?raw';

export const shuffle = {
  dependencies: `gsap @gsap/react`,
  usage: `import Shuffle from './Shuffle';

<Shuffle
  text="Hello World"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover={true}
  respectReducedMotion={true}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
