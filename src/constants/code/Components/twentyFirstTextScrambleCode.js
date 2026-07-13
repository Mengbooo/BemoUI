import code from '@content/Components/TwentyFirstTextScramble/TwentyFirstTextScramble.jsx?raw';
import css from '@content/Components/TwentyFirstTextScramble/TwentyFirstTextScramble.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTextScramble/TwentyFirstTextScramble.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTextScramble/TwentyFirstTextScramble.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTextScramble/TwentyFirstTextScramble.tsx?raw';

export const twentyFirstTextScramble = {
  usage: `<TwentyFirstTextScramble
  as="h1"
  duration={0.8}
  speed={0.04}
  trigger={true}
  onScrambleComplete={() => console.log('done')}
>
  Hello BemoUI
</TwentyFirstTextScramble>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
