import code from '@content/Components/TwentyFirstBorderTrail/TwentyFirstBorderTrail.jsx?raw';
import css from '@content/Components/TwentyFirstBorderTrail/TwentyFirstBorderTrail.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstBorderTrail/TwentyFirstBorderTrail.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstBorderTrail/TwentyFirstBorderTrail.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstBorderTrail/TwentyFirstBorderTrail.tsx?raw';

export const twentyFirstBorderTrail = {
  usage: `<div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
  <TwentyFirstBorderTrail size={48} duration={5} color="#1620E4" borderWidth={2} />
  <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
    Your content
  </div>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
