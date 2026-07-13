import code from '@content/Components/ScrollBasedVelocity/ScrollBasedVelocity.jsx?raw';
import css from '@content/Components/ScrollBasedVelocity/ScrollBasedVelocity.css?raw';
import tailwind from '@tailwind/Components/ScrollBasedVelocity/ScrollBasedVelocity.jsx?raw';
import tsCode from '@ts-default/Components/ScrollBasedVelocity/ScrollBasedVelocity.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ScrollBasedVelocity/ScrollBasedVelocity.tsx?raw';

export const scrollBasedVelocity = {
  usage: `import { ScrollBasedVelocity, ScrollBasedVelocityRow } from './ScrollBasedVelocity';

export default function Example() {
  return (
    <ScrollBasedVelocity>
      <ScrollBasedVelocityRow baseVelocity={5} direction={1}>
        <span style={{ color: '#1620E4', marginRight: '2rem', fontSize: '2rem', fontWeight: 700 }}>
          BemoUI
        </span>
        <span style={{ color: '#7BE9C6', marginRight: '2rem', fontSize: '2rem', fontWeight: 700 }}>
          Scroll Velocity
        </span>
      </ScrollBasedVelocityRow>
      <ScrollBasedVelocityRow baseVelocity={5} direction={-1}>
        <span style={{ color: '#7BE9C6', marginRight: '2rem', fontSize: '2rem', fontWeight: 700 }}>
          React Components
        </span>
        <span style={{ color: '#1620E4', marginRight: '2rem', fontSize: '2rem', fontWeight: 700 }}>
          Production Ready
        </span>
      </ScrollBasedVelocityRow>
    </ScrollBasedVelocity>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
