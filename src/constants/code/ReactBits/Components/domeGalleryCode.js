import code from '@content/ReactBits/Components/DomeGallery/DomeGallery.jsx?raw';
import css from '@content/ReactBits/Components/DomeGallery/DomeGallery.css?raw';
import tailwind from '@tailwind/ReactBits/Components/DomeGallery/DomeGallery.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/DomeGallery/DomeGallery.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/DomeGallery/DomeGallery.tsx?raw';

export const domeGallery = {
  dependencies: `@use-gesture/react`,
  usage: `import DomeGallery from './DomeGallery';
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery />
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
