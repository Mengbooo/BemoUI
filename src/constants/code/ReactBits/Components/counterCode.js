import code from '@content/ReactBits/Components/Counter/Counter.jsx?raw';
import css from '@content/ReactBits/Components/Counter/Counter.css?raw';
import tailwind from '@tailwind/ReactBits/Components/Counter/Counter.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/Counter/Counter.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/Counter/Counter.tsx?raw';

export const counter = {
  dependencies: `framer-motion`,
  usage: `import Counter from './Counter';

<Counter
  value={1}
  places={[100, 10, 1]}
  fontSize={80}
  padding={5}
  gap={10}
  textColor="white"
  fontWeight={900}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
