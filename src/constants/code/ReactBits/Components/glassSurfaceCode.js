import code from '@content/ReactBits/Components/GlassSurface/GlassSurface.jsx?raw';
import css from '@content/ReactBits/Components/GlassSurface/GlassSurface.css?raw';
import tailwind from '@tailwind/ReactBits/Components/GlassSurface/GlassSurface.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/GlassSurface/GlassSurface.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/GlassSurface/GlassSurface.tsx?raw';

export const glassSurface = {
  usage: `import GlassSurface from './GlassSurface'

// Basic usage
<GlassSurface
  width={300}
  height={200}
  borderRadius={24}
  className="my-custom-class"
>
  <h2>Glass Surface Content</h2>
</GlassSurface>

// Custom displacement effects
<GlassSurface
  displace={15}
  distortionScale={-150}
  redOffset={5}
  greenOffset={15}
  blueOffset={25}
  brightness={60}
  opacity={0.8}
  mixBlendMode="screen"
>
  <span>Advanced Glass Distortion</span>
</GlassSurface>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
