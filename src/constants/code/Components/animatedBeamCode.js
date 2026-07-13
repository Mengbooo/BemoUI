import code from '@content/Components/AnimatedBeam/AnimatedBeam.jsx?raw';
import css from '@content/Components/AnimatedBeam/AnimatedBeam.css?raw';
import tailwind from '@tailwind/Components/AnimatedBeam/AnimatedBeam.jsx?raw';
import tsCode from '@ts-default/Components/AnimatedBeam/AnimatedBeam.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AnimatedBeam/AnimatedBeam.tsx?raw';

export const animatedBeam = {
  usage: `import { useRef } from 'react';
import { AnimatedBeam } from './AnimatedBeam';

export default function Example() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
      <div ref={fromRef}>A</div>
      <div ref={toRef}>B</div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        curvature={40}
        gradientStartColor="#1620E4"
        gradientStopColor="#7BE9C6"
      />
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
