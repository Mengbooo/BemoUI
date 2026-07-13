import code from '@content/Components/TwentyFirstAnimatedGroup/TwentyFirstAnimatedGroup.jsx?raw';
import css from '@content/Components/TwentyFirstAnimatedGroup/TwentyFirstAnimatedGroup.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstAnimatedGroup/TwentyFirstAnimatedGroup.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstAnimatedGroup/TwentyFirstAnimatedGroup.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstAnimatedGroup/TwentyFirstAnimatedGroup.tsx?raw';

export const twentyFirstAnimatedGroup = {
  usage: `import TwentyFirstAnimatedGroup from './TwentyFirstAnimatedGroup';

export default function Example() {
  return (
    <TwentyFirstAnimatedGroup
      preset="blur-slide"
      stagger={0.12}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div>Card one</div>
      <div>Card two</div>
      <div>Card three</div>
    </TwentyFirstAnimatedGroup>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
