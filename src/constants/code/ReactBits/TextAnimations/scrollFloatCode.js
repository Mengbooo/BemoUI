import code from '@content/ReactBits/TextAnimations/ScrollFloat/ScrollFloat.jsx?raw';
import css from '@content/ReactBits/TextAnimations/ScrollFloat/ScrollFloat.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/ScrollFloat/ScrollFloat.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/ScrollFloat/ScrollFloat.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/ScrollFloat/ScrollFloat.tsx?raw';

export const scrollFloat = {
  dependencies: `gsap`,
  usage: `import ScrollFloat from './ScrollFloat';

<ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  BemoUI
</ScrollFloat>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
