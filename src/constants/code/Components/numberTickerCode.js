import code from '@content/Components/NumberTicker/NumberTicker.jsx?raw';
import css from '@content/Components/NumberTicker/NumberTicker.css?raw';
import tailwind from '@tailwind/Components/NumberTicker/NumberTicker.jsx?raw';
import tsCode from '@ts-default/Components/NumberTicker/NumberTicker.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/NumberTicker/NumberTicker.tsx?raw';

export const numberTicker = {
  usage: `import NumberTicker from './NumberTicker';

export default function Example() {
  return (
    <p>
      Users: <NumberTicker value={1000} />
    </p>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
