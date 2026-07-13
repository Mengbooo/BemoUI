import code from '@content/Components/TwentyFirstAnimatedNumber/TwentyFirstAnimatedNumber.jsx?raw';
import css from '@content/Components/TwentyFirstAnimatedNumber/TwentyFirstAnimatedNumber.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstAnimatedNumber/TwentyFirstAnimatedNumber.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstAnimatedNumber/TwentyFirstAnimatedNumber.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstAnimatedNumber/TwentyFirstAnimatedNumber.tsx?raw';

export const twentyFirstAnimatedNumber = {
  usage: `import { TwentyFirstAnimatedNumber } from './TwentyFirstAnimatedNumber';

export function Stats() {
  return (
    <div>
      <TwentyFirstAnimatedNumber value={12840} className="bemo-21st-animated-number--large" />
      <TwentyFirstAnimatedNumber
        value={48250}
        format={(n) =>
          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
        }
        springOptions={{ stiffness: 100, damping: 20 }}
      />
      <TwentyFirstAnimatedNumber as="strong" value={99} aria-label="Score: 99" />
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
