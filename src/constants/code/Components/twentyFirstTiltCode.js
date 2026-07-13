import code from '@content/Components/TwentyFirstTilt/TwentyFirstTilt.jsx?raw';
import css from '@content/Components/TwentyFirstTilt/TwentyFirstTilt.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTilt/TwentyFirstTilt.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTilt/TwentyFirstTilt.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTilt/TwentyFirstTilt.tsx?raw';

export const twentyFirstTilt = {
  usage: `<TwentyFirstTilt rotationFactor={15} isReverse={false}>
  <div className="your-card">Hover me</div>
</TwentyFirstTilt>

// With spring tuning & reverse
<TwentyFirstTilt
  rotationFactor={20}
  isReverse
  springOptions={{ stiffness: 250, damping: 25 }}
  className="rounded-xl shadow-lg"
>
  <img src="/photo.webp" alt="Tilted" />
</TwentyFirstTilt>

// Disabled
<TwentyFirstTilt disabled>
  <span>Static content</span>
</TwentyFirstTilt>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
