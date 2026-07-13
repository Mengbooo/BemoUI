import code from '@content/Components/TwentyFirstImageComparison/TwentyFirstImageComparison.jsx?raw';
import css from '@content/Components/TwentyFirstImageComparison/TwentyFirstImageComparison.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstImageComparison/TwentyFirstImageComparison.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstImageComparison/TwentyFirstImageComparison.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstImageComparison/TwentyFirstImageComparison.tsx?raw';

export const twentyFirstImageComparison = {
  usage: `<TwentyFirstImageComparison
  className="aspect-video w-full"
  enableHover={false}
  initialPosition={50}
  onPositionChange={(pos) => console.log(pos)}
>
  <TwentyFirstImageComparison.Image
    src="/assets/demo/cs1.webp"
    alt="Before"
    position="left"
  />
  <TwentyFirstImageComparison.Image
    src="/assets/demo/cs2.webp"
    alt="After"
    position="right"
  />
  <TwentyFirstImageComparison.Slider />
</TwentyFirstImageComparison>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
