import code from '@content/ReactBits/TextAnimations/CountUp/CountUp.jsx?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/CountUp/CountUp.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/CountUp/CountUp.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/CountUp/CountUp.tsx?raw';

export const countup = {
  dependencies: `framer-motion`,
  usage: `import CountUp from './CountUp'

<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
