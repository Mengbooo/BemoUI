import code from '@content/ReactBits/Backgrounds/LetterGlitch/LetterGlitch.jsx?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/LetterGlitch/LetterGlitch.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/LetterGlitch/LetterGlitch.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/LetterGlitch/LetterGlitch.tsx?raw';

export const letterGlitch = {
  usage: `import LetterGlitch from './LetterGlitch';

<LetterGlitch
  glitchSpeed={50}
  centerVignette={true}
  outerVignette={false}
  smooth={true}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
