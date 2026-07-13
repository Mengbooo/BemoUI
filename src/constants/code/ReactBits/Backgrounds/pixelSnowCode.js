import code from '@content/ReactBits/Backgrounds/PixelSnow/PixelSnow.jsx?raw';
import css from '@content/ReactBits/Backgrounds/PixelSnow/PixelSnow.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/PixelSnow/PixelSnow.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/PixelSnow/PixelSnow.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/PixelSnow/PixelSnow.tsx?raw';

export const pixelSnow = {
  dependencies: `three`,
  usage: `import PixelSnow from './PixelSnow';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PixelSnow
    color="#ffffff"
    flakeSize={0.01}
    minFlakeSize={1.25}
    pixelResolution={200}
    speed={1.25}
    density={0.3}
    direction={125}
    brightness={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
