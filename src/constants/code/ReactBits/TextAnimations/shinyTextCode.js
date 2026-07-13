import code from '@content/ReactBits/TextAnimations/ShinyText/ShinyText.jsx?raw';
import css from '@content/ReactBits/TextAnimations/ShinyText/ShinyText.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/ShinyText/ShinyText.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/ShinyText/ShinyText.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/ShinyText/ShinyText.tsx?raw';

export const shinyText = {
  dependencies: `framer-motion`,
  usage: `import ShinyText from './ShinyText';

<ShinyText
  text="✨ Shiny Text Effect"
  speed={2}
  delay={0}
  color="#b5b5b5"
  shineColor="#ffffff"
  spread={120}
  direction="left"
  yoyo={false}
  pauseOnHover={false}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
