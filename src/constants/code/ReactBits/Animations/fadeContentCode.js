import code from '@content/ReactBits/Animations/FadeContent/FadeContent.jsx?raw';
import tailwind from '@tailwind/ReactBits/Animations/FadeContent/FadeContent.jsx?raw';
import tsCode from '@ts-default/ReactBits/Animations/FadeContent/FadeContent.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Animations/FadeContent/FadeContent.tsx?raw';

export const fadeContent = {
  usage: `import FadeContent from './FadeContent'

<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</FadeContent>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
