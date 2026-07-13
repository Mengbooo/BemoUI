import code from '@content/Components/TwentyFirstSpotlight/TwentyFirstSpotlight.jsx?raw';
import css from '@content/Components/TwentyFirstSpotlight/TwentyFirstSpotlight.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstSpotlight/TwentyFirstSpotlight.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstSpotlight/TwentyFirstSpotlight.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstSpotlight/TwentyFirstSpotlight.tsx?raw';

export const twentyFirstSpotlight = {
  usage: `import { TwentyFirstSpotlight } from './TwentyFirstSpotlight';

export default function Example() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280, borderRadius: 16 }}>
      <TwentyFirstSpotlight size={240} colorFrom="#7BE9C6" colorVia="#1620E4" />
      <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
        Hover me — the spotlight follows your cursor.
      </div>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
