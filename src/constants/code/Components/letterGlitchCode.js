import code from '@content/Components/LetterGlitch/LetterGlitch.jsx?raw';
import tailwind from '@tailwind/Components/LetterGlitch/LetterGlitch.jsx?raw';
import tsCode from '@ts-default/Components/LetterGlitch/LetterGlitch.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/LetterGlitch/LetterGlitch.tsx?raw';

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

}