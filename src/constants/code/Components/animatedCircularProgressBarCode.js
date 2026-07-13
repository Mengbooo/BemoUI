import code from '@content/Components/AnimatedCircularProgressBar/AnimatedCircularProgressBar.jsx?raw';
import css from '@content/Components/AnimatedCircularProgressBar/AnimatedCircularProgressBar.css?raw';
import tailwind from '@tailwind/Components/AnimatedCircularProgressBar/AnimatedCircularProgressBar.jsx?raw';
import tsCode from '@ts-default/Components/AnimatedCircularProgressBar/AnimatedCircularProgressBar.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AnimatedCircularProgressBar/AnimatedCircularProgressBar.tsx?raw';

export const animatedCircularProgressBar = {
  usage: `import { AnimatedCircularProgressBar } from './AnimatedCircularProgressBar';

export default function Example() {
  return (
    <AnimatedCircularProgressBar
      value={66}
      min={0}
      max={100}
      gaugePrimaryColor="#1620E4"
      gaugeSecondaryColor="#7BE9C6"
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
