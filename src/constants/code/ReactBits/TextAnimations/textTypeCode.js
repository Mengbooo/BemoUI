import code from '@content/ReactBits/TextAnimations/TextType/TextType.jsx?raw';
import css from '@content/ReactBits/TextAnimations/TextType/TextType.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/TextType/TextType.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/TextType/TextType.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/TextType/TextType.tsx?raw';

export const textType = {
  dependencies: `gsap`,
  usage: `import TextType from './TextType';

<TextType
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
