import code from '@content/Components/KineticText/KineticText.jsx?raw';
import css from '@content/Components/KineticText/KineticText.css?raw';
import tailwind from '@tailwind/Components/KineticText/KineticText.jsx?raw';
import tsCode from '@ts-default/Components/KineticText/KineticText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/KineticText/KineticText.tsx?raw';

export const kineticText = {
  usage: `import { KineticText } from './KineticText';

export default function Example() {
  return <KineticText text="Kinetic Text" as="h1" />;
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
