import code from '@content/Components/TwentyFirstTransitionPanel/TwentyFirstTransitionPanel.jsx?raw';
import css from '@content/Components/TwentyFirstTransitionPanel/TwentyFirstTransitionPanel.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTransitionPanel/TwentyFirstTransitionPanel.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTransitionPanel/TwentyFirstTransitionPanel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTransitionPanel/TwentyFirstTransitionPanel.tsx?raw';

export const twentyFirstTransitionPanel = {
  usage: `import { useState } from 'react';
import TwentyFirstTransitionPanel from './TwentyFirstTransitionPanel';

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <TwentyFirstTransitionPanel activeIndex={activeIndex}>
        <div>Panel one content</div>
        <div>Panel two content</div>
        <div>Panel three content</div>
      </TwentyFirstTransitionPanel>
      <button type="button" onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}>Prev</button>
      <button type="button" onClick={() => setActiveIndex((i) => Math.min(2, i + 1))}>Next</button>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
