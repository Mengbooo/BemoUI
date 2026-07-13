import code from '@content/Components/TwentyFirstTextLoop/TwentyFirstTextLoop.jsx?raw';
import css from '@content/Components/TwentyFirstTextLoop/TwentyFirstTextLoop.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTextLoop/TwentyFirstTextLoop.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTextLoop/TwentyFirstTextLoop.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTextLoop/TwentyFirstTextLoop.tsx?raw';

export const twentyFirstTextLoop = {
  usage: `import { TwentyFirstTextLoop } from './TwentyFirstTextLoop';

export function Example() {
  return (
    <h1>
      Build{' '}
      <TwentyFirstTextLoop interval={2} style={{ color: '#1620E4' }}>
        <span>faster</span>
        <span>smarter</span>
        <span>together</span>
      </TwentyFirstTextLoop>
    </h1>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
