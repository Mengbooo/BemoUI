import code from '@content/Components/TwentyFirstAnimatedBackground/TwentyFirstAnimatedBackground.jsx?raw';
import css from '@content/Components/TwentyFirstAnimatedBackground/TwentyFirstAnimatedBackground.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstAnimatedBackground/TwentyFirstAnimatedBackground.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstAnimatedBackground/TwentyFirstAnimatedBackground.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstAnimatedBackground/TwentyFirstAnimatedBackground.tsx?raw';

export const twentyFirstAnimatedBackground = {
  usage: `import { TwentyFirstAnimatedBackground } from './TwentyFirstAnimatedBackground';

export default function Example() {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-neutral-100">
      <TwentyFirstAnimatedBackground
        defaultValue="home"
        className="bg-[#1620E4] rounded-lg"
        onValueChange={(id) => console.log(id)}
      >
        <button type="button" data-id="home" className="px-4 py-2 text-sm text-white data-[checked=false]:text-neutral-700">
          Home
        </button>
        <button type="button" data-id="about" className="px-4 py-2 text-sm text-white data-[checked=false]:text-neutral-700">
          About
        </button>
      </TwentyFirstAnimatedBackground>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
