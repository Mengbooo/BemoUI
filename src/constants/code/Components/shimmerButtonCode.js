import code from '@content/Components/ShimmerButton/ShimmerButton.jsx?raw';
import css from '@content/Components/ShimmerButton/ShimmerButton.css?raw';
import tailwind from '@tailwind/Components/ShimmerButton/ShimmerButton.jsx?raw';
import tsCode from '@ts-default/Components/ShimmerButton/ShimmerButton.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ShimmerButton/ShimmerButton.tsx?raw';

export const shimmerButton = {
  usage: `import ShimmerButton from './ShimmerButton';

<ShimmerButton
  shimmerColor="#7BE9C6"
  background="rgba(15, 12, 35, 1)"
  onClick={handleClick}
>
  Start building
</ShimmerButton>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
