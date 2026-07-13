import code from '@content/Components/AnimatedGradientText/AnimatedGradientText.jsx?raw';
import css from '@content/Components/AnimatedGradientText/AnimatedGradientText.css?raw';
import tailwind from '@tailwind/Components/AnimatedGradientText/AnimatedGradientText.jsx?raw';
import tsCode from '@ts-default/Components/AnimatedGradientText/AnimatedGradientText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AnimatedGradientText/AnimatedGradientText.tsx?raw';

export const animatedGradientText = {
  usage: `import { AnimatedGradientText } from './AnimatedGradientText';

export default function Example() {
  return (
    <AnimatedGradientText speed={1} colorFrom="#1620E4" colorTo="#7BE9C6">
      BemoUI Animated Gradient Text
    </AnimatedGradientText>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
