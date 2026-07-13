import code from '@content/ReactBits/TextAnimations/GradientText/GradientText.jsx?raw';
import css from '@content/ReactBits/TextAnimations/GradientText/GradientText.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/GradientText/GradientText.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/GradientText/GradientText.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/GradientText/GradientText.tsx?raw';

export const gradientText = {
  usage: `import GradientText from './GradientText'

// For a smoother animation, the gradient should start and end with the same color

<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</GradientText>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
