import code from '@content/ReactBits/Animations/MagnetLines/MagnetLines.jsx?raw';
import css from '@content/ReactBits/Animations/MagnetLines/MagnetLines.css?raw';
import tailwind from '@tailwind/ReactBits/Animations/MagnetLines/MagnetLines.jsx?raw';
import tsCode from '@ts-default/ReactBits/Animations/MagnetLines/MagnetLines.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Animations/MagnetLines/MagnetLines.tsx?raw';

export const magnetLines = {
  usage: `import MagnetLines from './MagnetLines';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
