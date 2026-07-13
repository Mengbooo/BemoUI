import code from '@content/ReactBits/Animations/TargetCursor/TargetCursor.jsx?raw';
import css from '@content/ReactBits/Animations/TargetCursor/TargetCursor.css?raw';
import tailwind from '@tailwind/ReactBits/Animations/TargetCursor/TargetCursor.jsx?raw';
import tsCode from '@ts-default/ReactBits/Animations/TargetCursor/TargetCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Animations/TargetCursor/TargetCursor.tsx?raw';

export const targetCursor = {
  dependencies: 'gsap',
  usage: `import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
