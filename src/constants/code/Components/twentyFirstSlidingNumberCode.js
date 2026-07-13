import code from '@content/Components/TwentyFirstSlidingNumber/TwentyFirstSlidingNumber.jsx?raw';
import css from '@content/Components/TwentyFirstSlidingNumber/TwentyFirstSlidingNumber.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstSlidingNumber/TwentyFirstSlidingNumber.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstSlidingNumber/TwentyFirstSlidingNumber.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstSlidingNumber/TwentyFirstSlidingNumber.tsx?raw';

export const twentyFirstSlidingNumber = {
  usage: `import { TwentyFirstSlidingNumber } from './TwentyFirstSlidingNumber';

// Basic counter
<TwentyFirstSlidingNumber value={42} />

// Padded single digit + custom decimal separator
<TwentyFirstSlidingNumber value={7.5} padStart decimalSeparator="." />

// With accent styling (CSS variant or Tailwind)
<TwentyFirstSlidingNumber
  value={1284}
  className="bemo-21st-sliding-number--xl text-[#1620E4]"
  aria-label="1,284 items"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
