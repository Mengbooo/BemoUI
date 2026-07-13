import code from '@content/ReactBits/TextAnimations/ScrollReveal/ScrollReveal.jsx?raw';
import css from '@content/ReactBits/TextAnimations/ScrollReveal/ScrollReveal.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/ScrollReveal/ScrollReveal.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/ScrollReveal/ScrollReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/ScrollReveal/ScrollReveal.tsx?raw';

export const scrollReveal = {
  dependencies: `gsap`,
  usage: `import ScrollReveal from './ScrollReveal';

<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</ScrollReveal>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
