import code from '@content/Components/TwentyFirstCultGradientHeading/TwentyFirstCultGradientHeading.jsx?raw';
import css from '@content/Components/TwentyFirstCultGradientHeading/TwentyFirstCultGradientHeading.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultGradientHeading/TwentyFirstCultGradientHeading.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultGradientHeading/TwentyFirstCultGradientHeading.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultGradientHeading/TwentyFirstCultGradientHeading.tsx?raw';

export const twentyFirstCultGradientHeading = {
  usage: `import TwentyFirstCultGradientHeading from './TwentyFirstCultGradientHeading';

// Basic
<TwentyFirstCultGradientHeading>
  Gradient Heading
</TwentyFirstCultGradientHeading>

// Custom variant, size, weight & semantic tag
<TwentyFirstCultGradientHeading
  as="h1"
  variant="accent"
  size="xl"
  weight="black"
>
  Brand Accent Title
</TwentyFirstCultGradientHeading>

// Polymorphic (asChild merges onto child)
<TwentyFirstCultGradientHeading asChild variant="pink" size="lg">
  <h2>Wrapped Heading</h2>
</TwentyFirstCultGradientHeading>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
