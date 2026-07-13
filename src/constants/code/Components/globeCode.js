import code from '@content/Components/Globe/Globe.jsx?raw';
import css from '@content/Components/Globe/Globe.css?raw';
import tailwind from '@tailwind/Components/Globe/Globe.jsx?raw';
import tsCode from '@ts-default/Components/Globe/Globe.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Globe/Globe.tsx?raw';

export const globe = {
  usage: `import { Globe } from './Globe';

export default function Example() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 400 }}>
      <Globe
        autoRotate
        config={{
          markerColor: [22 / 255, 32 / 255, 228 / 255],
          glowColor: [123 / 255, 233 / 255, 198 / 255],
          markers: [
            { location: [40.7128, -74.006], size: 0.1 },
            { location: [51.5074, -0.1278], size: 0.08 },
          ],
        }}
      />
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
