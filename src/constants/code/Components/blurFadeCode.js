import code from '@content/Components/BlurFade/BlurFade.jsx?raw';
import css from '@content/Components/BlurFade/BlurFade.css?raw';
import tailwind from '@tailwind/Components/BlurFade/BlurFade.jsx?raw';
import tsCode from '@ts-default/Components/BlurFade/BlurFade.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BlurFade/BlurFade.tsx?raw';

export const blurFade = {
  usage: `import BlurFade from './BlurFade';

export default function Example() {
  return (
    <BlurFade delay={0.25} inView>
      <h2>Hello BemoUI</h2>
    </BlurFade>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
