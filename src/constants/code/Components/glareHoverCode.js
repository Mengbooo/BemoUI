import code from '@content/Components/GlareHover/GlareHover.jsx?raw';
import css from '@content/Components/GlareHover/GlareHover.css?raw';
import tailwind from '@tailwind/Components/GlareHover/GlareHover.jsx?raw';
import tsCode from '@ts-default/Components/GlareHover/GlareHover.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/GlareHover/GlareHover.tsx?raw';

export const glareHover = {
  usage: `import GlareHover from './GlareHover';

export default function Example() {
  return (
    <GlareHover
      width="320px"
      height="200px"
      background="#111111"
      color="#7BE9C6"
      opacity={0.45}
      angle={-45}
      size={250}
      duration={650}
      tabIndex={0}
    >
      <span style={{ color: '#fff', fontWeight: 600 }}>Hover me</span>
    </GlareHover>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
