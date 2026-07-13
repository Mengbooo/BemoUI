import code from '@content/ReactBits/TextAnimations/CurvedLoop/CurvedLoop.jsx?raw';
import css from '@content/ReactBits/TextAnimations/CurvedLoop/CurvedLoop.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/CurvedLoop/CurvedLoop.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/CurvedLoop/CurvedLoop.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/CurvedLoop/CurvedLoop.tsx?raw';

export const curvedLoop = {
  usage: `import CurvedLoop from './CurvedLoop';

// Basic usage
<CurvedLoop marqueeText="Welcome to BemoUI ✦" />

// With custom props
<CurvedLoop
  marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
  speed={3}
  curveAmount={500}
  direction="right"
  interactive={true}
  className="custom-text-style"
/>

// Non-interactive with slower speed
<CurvedLoop
  marqueeText="Smooth Curved Animation"
  speed={1}
  curveAmount={300}
  interactive={false}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
