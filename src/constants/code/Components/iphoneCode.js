import code from '@content/Components/Iphone/Iphone.jsx?raw';
import css from '@content/Components/Iphone/Iphone.css?raw';
import tailwind from '@tailwind/Components/Iphone/Iphone.jsx?raw';
import tsCode from '@ts-default/Components/Iphone/Iphone.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Iphone/Iphone.tsx?raw';

export const iphone = {
  usage: `<Iphone alt="App preview">
  <div style={{ width: '100%', height: '100%', background: '#1620E4' }} />
</Iphone>

// Or with an image
// <Iphone src="/app-screenshot.png" alt="App screenshot" />

// Or with a video (respects prefers-reduced-motion)
// <Iphone videoSrc="/demo.mp4" alt="App demo video" />`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
