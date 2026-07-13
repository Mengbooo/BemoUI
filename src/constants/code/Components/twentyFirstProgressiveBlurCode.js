import code from '@content/Components/TwentyFirstProgressiveBlur/TwentyFirstProgressiveBlur.jsx?raw';
import css from '@content/Components/TwentyFirstProgressiveBlur/TwentyFirstProgressiveBlur.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstProgressiveBlur/TwentyFirstProgressiveBlur.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstProgressiveBlur/TwentyFirstProgressiveBlur.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstProgressiveBlur/TwentyFirstProgressiveBlur.tsx?raw';

export const twentyFirstProgressiveBlur = {
  usage: `import { TwentyFirstProgressiveBlur } from './TwentyFirstProgressiveBlur';

export function HeroCard() {
  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
      <img src="/assets/demo/cs1.webp" alt="" style={{ width: '100%', display: 'block' }} />
      <TwentyFirstProgressiveBlur
        direction="bottom"
        blurLayers={8}
        blurIntensity={0.35}
        style={{ position: 'absolute', inset: 0, borderRadius: 16 }}
      />
      <div style={{ position: 'absolute', bottom: 16, left: 16, color: '#fff' }}>
        Soft edge depth
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
