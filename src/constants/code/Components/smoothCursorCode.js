import code from '@content/Components/SmoothCursor/SmoothCursor.jsx?raw';
import css from '@content/Components/SmoothCursor/SmoothCursor.css?raw';
import tailwind from '@tailwind/Components/SmoothCursor/SmoothCursor.jsx?raw';
import tsCode from '@ts-default/Components/SmoothCursor/SmoothCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/SmoothCursor/SmoothCursor.tsx?raw';

export const smoothCursor = {
  usage: `import SmoothCursor from './SmoothCursor';

export default function App() {
  return (
    <>
      <SmoothCursor />
      <main>Hover to see the smooth cursor.</main>
    </>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
