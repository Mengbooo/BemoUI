import code from '@content/Components/GradientText/GradientText.jsx?raw';
import css from '@content/Components/GradientText/GradientText.css?raw';
import tailwind from '@tailwind/Components/GradientText/GradientText.jsx?raw';
import tsCode from '@ts-default/Components/GradientText/GradientText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/GradientText/GradientText.tsx?raw';


export const gradientText = {
  usage: `import GradientText from './GradientText'
  
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
}