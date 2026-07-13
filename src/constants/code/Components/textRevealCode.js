import code from '@content/Components/TextReveal/TextReveal.jsx?raw';
import css from '@content/Components/TextReveal/TextReveal.css?raw';
import tailwind from '@tailwind/Components/TextReveal/TextReveal.jsx?raw';
import tsCode from '@ts-default/Components/TextReveal/TextReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TextReveal/TextReveal.tsx?raw';

export const textReveal = {
  usage: `import TextReveal from './TextReveal';

export default function Example() {
  return (
    <TextReveal>
      BemoUI turns scroll into story with calm, accessible word reveals.
    </TextReveal>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
