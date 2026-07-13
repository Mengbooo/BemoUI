import code from '@content/Components/TwentyFirstTextRoll/TwentyFirstTextRoll.jsx?raw';
import css from '@content/Components/TwentyFirstTextRoll/TwentyFirstTextRoll.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTextRoll/TwentyFirstTextRoll.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTextRoll/TwentyFirstTextRoll.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTextRoll/TwentyFirstTextRoll.tsx?raw';

export const twentyFirstTextRoll = {
  usage: `import { TwentyFirstTextRoll } from './TwentyFirstTextRoll';

export default function Example() {
  return (
    <TwentyFirstTextRoll
      as="h1"
      className="bemo-21st-text-roll--accent"
      duration={0.5}
      getEnterDelay={(i) => i * 0.1}
      getExitDelay={(i) => i * 0.1 + 0.2}
      onAnimationComplete={() => console.log('done')}
    >
      Hello BemoUI
    </TwentyFirstTextRoll>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
