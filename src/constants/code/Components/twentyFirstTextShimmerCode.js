import code from '@content/Components/TwentyFirstTextShimmer/TwentyFirstTextShimmer.jsx?raw';
import css from '@content/Components/TwentyFirstTextShimmer/TwentyFirstTextShimmer.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstTextShimmer/TwentyFirstTextShimmer.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstTextShimmer/TwentyFirstTextShimmer.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstTextShimmer/TwentyFirstTextShimmer.tsx?raw';

export const twentyFirstTextShimmer = {
  usage: `<TwentyFirstTextShimmer as="h1" duration={2} spread={2}>
  Shimmering headline
</TwentyFirstTextShimmer>

{/* With brand accents */}
<TwentyFirstTextShimmer
  baseColor="#1620E4"
  gradientColor="#7BE9C6"
  duration={1.5}
>
  Accent text
</TwentyFirstTextShimmer>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
