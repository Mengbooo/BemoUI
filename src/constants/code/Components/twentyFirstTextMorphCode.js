import code from '@content/Components/TwentyFirstTextMorph/TwentyFirstTextMorph.jsx?raw';
import css from '@content/Components/TwentyFirstTextMorph/TwentyFirstTextMorph.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTextMorph/TwentyFirstTextMorph.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTextMorph/TwentyFirstTextMorph.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTextMorph/TwentyFirstTextMorph.tsx?raw';

export const twentyFirstTextMorph = {
  usage: `import TwentyFirstTextMorph from './TwentyFirstTextMorph';

export default function Example() {
  return (
    <TwentyFirstTextMorph as="h1" className="bemo-21st-text-morph--accent">
      Hello BemoUI
    </TwentyFirstTextMorph>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
