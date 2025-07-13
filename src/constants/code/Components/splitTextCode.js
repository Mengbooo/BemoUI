import code from '@content/Components/SplitText/SplitText.jsx?raw';
import tailwind from '@tailwind/Components/SplitText/SplitText.jsx?raw';
import tsCode from '@ts-default/Components/SplitText/SplitText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/SplitText/SplitText.tsx?raw';

export const splitText = {
  installation: `npm install @react-spring/web`,
  usage: `import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

<SplitText
  text="Hello, Tailwind!"
  className="text-2xl font-semibold text-center"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}