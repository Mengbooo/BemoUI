import code from '@content/Components/ScrollProgress/ScrollProgress.jsx?raw';
import css from '@content/Components/ScrollProgress/ScrollProgress.css?raw';
import tailwind from '@tailwind/Components/ScrollProgress/ScrollProgress.jsx?raw';
import tsCode from '@ts-default/Components/ScrollProgress/ScrollProgress.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ScrollProgress/ScrollProgress.tsx?raw';

export const scrollProgress = {
  usage: `import { ScrollProgress } from './ScrollProgress';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <main>{/* long page content */}</main>
    </>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
