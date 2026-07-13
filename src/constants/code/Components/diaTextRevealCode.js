import code from '@content/Components/DiaTextReveal/DiaTextReveal.jsx?raw';
import css from '@content/Components/DiaTextReveal/DiaTextReveal.css?raw';
import tailwind from '@tailwind/Components/DiaTextReveal/DiaTextReveal.jsx?raw';
import tsCode from '@ts-default/Components/DiaTextReveal/DiaTextReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/DiaTextReveal/DiaTextReveal.tsx?raw';

export const diaTextReveal = {
  usage: `import DiaTextReveal from './DiaTextReveal';

export default function Example() {
  return (
    <h1>
      Build with{' '}
      <DiaTextReveal
        text={['speed', 'clarity', 'delight']}
        repeat
        colors={['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6', '#1620E4']}
      />
    </h1>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
