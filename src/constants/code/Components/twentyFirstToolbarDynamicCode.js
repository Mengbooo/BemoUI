import code from '@content/Components/TwentyFirstToolbarDynamic/TwentyFirstToolbarDynamic.jsx?raw';
import css from '@content/Components/TwentyFirstToolbarDynamic/TwentyFirstToolbarDynamic.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstToolbarDynamic/TwentyFirstToolbarDynamic.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstToolbarDynamic/TwentyFirstToolbarDynamic.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstToolbarDynamic/TwentyFirstToolbarDynamic.tsx?raw';

export const twentyFirstToolbarDynamic = {
  usage: `import { TwentyFirstToolbarDynamic } from './TwentyFirstToolbarDynamic';

export default function Example() {
  return (
    <TwentyFirstToolbarDynamic
      placeholder="Search notes"
      onSearch={(query) => console.log(query)}
      onOpenChange={(open) => console.log('open', open)}
      closedWidth={98}
      openWidth={300}
      accentColor="#1620E4"
      accentSecondary="#7BE9C6"
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
