import code from '@content/Components/AnimatedContent/AnimatedContent.jsx?raw';
import tailwind from '@tailwind/Components/AnimatedContent/AnimatedContent.jsx?raw';
import tsCode from '@ts-default/Components/AnimatedContent/AnimatedContent.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AnimatedContent/AnimatedContent.tsx?raw';

export const animatedContent = {
  installation: `npm install @react-spring/web`,
  usage: `import AnimatedContent from './AnimatedContent'

<AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  config={{ tension: 80, friction: 20 }}
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
>
  <div>Content to Animate</div>
</AnimatedContent>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}