import code from '@content/Components/Highlighter/Highlighter.jsx?raw';
import css from '@content/Components/Highlighter/Highlighter.css?raw';
import tailwind from '@tailwind/Components/Highlighter/Highlighter.jsx?raw';
import tsCode from '@ts-default/Components/Highlighter/Highlighter.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Highlighter/Highlighter.tsx?raw';

export const highlighter = {
  usage: `import { Highlighter } from './Highlighter';

export default function Example() {
  return (
    <p>
      Launch with{' '}
      <Highlighter action="underline" color="#1620E4">
        BemoUI Highlighter
      </Highlighter>{' '}
      and a soft{' '}
      <Highlighter action="highlight" color="#7BE9C6">
        marker accent
      </Highlighter>
      .
    </p>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
