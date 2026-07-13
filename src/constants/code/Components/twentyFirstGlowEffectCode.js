import code from '@content/Components/TwentyFirstGlowEffect/TwentyFirstGlowEffect.jsx?raw';
import css from '@content/Components/TwentyFirstGlowEffect/TwentyFirstGlowEffect.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstGlowEffect/TwentyFirstGlowEffect.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstGlowEffect/TwentyFirstGlowEffect.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstGlowEffect/TwentyFirstGlowEffect.tsx?raw';

export const twentyFirstGlowEffect = {
  usage: `<div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
  <TwentyFirstGlowEffect
    mode="rotate"
    blur="medium"
    colors={['#1620E4', '#7BE9C6']}
    duration={5}
    scale={1}
  />
  <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
    Your content here
  </div>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
