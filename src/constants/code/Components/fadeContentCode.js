import code from '@content/Components/FadeContent/FadeContent.jsx?raw';
import tailwind from '@tailwind/Components/FadeContent/FadeContent.jsx?raw';
import tsCode from '@ts-default/Components/FadeContent/FadeContent.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/FadeContent/FadeContent.tsx?raw';

export const fadeContent = {
  usage: `import FadeContent from './FadeContent'
  
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</FadeContent>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}