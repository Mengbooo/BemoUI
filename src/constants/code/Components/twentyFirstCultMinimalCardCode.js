import code from '@content/Components/TwentyFirstCultMinimalCard/TwentyFirstCultMinimalCard.jsx?raw';
import css from '@content/Components/TwentyFirstCultMinimalCard/TwentyFirstCultMinimalCard.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultMinimalCard/TwentyFirstCultMinimalCard.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultMinimalCard/TwentyFirstCultMinimalCard.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultMinimalCard/TwentyFirstCultMinimalCard.tsx?raw';

export const twentyFirstCultMinimalCard = {
  usage: `import {
  TwentyFirstCultMinimalCard,
  TwentyFirstCultMinimalCardImage,
  TwentyFirstCultMinimalCardTitle,
  TwentyFirstCultMinimalCardDescription,
  TwentyFirstCultMinimalCardContent,
  TwentyFirstCultMinimalCardFooter,
} from './TwentyFirstCultMinimalCard';

export function Example() {
  return (
    <TwentyFirstCultMinimalCard tabIndex={0} role="article">
      <TwentyFirstCultMinimalCardImage
        src="/assets/demo/cs1.webp"
        alt="Product preview"
      />
      <TwentyFirstCultMinimalCardTitle>Aurora Studio</TwentyFirstCultMinimalCardTitle>
      <TwentyFirstCultMinimalCardDescription>
        Minimal card with layered shadows and a crisp image frame.
      </TwentyFirstCultMinimalCardDescription>
      <TwentyFirstCultMinimalCardContent>
        Optional middle content
      </TwentyFirstCultMinimalCardContent>
      <TwentyFirstCultMinimalCardFooter>
        <button type="button">View</button>
      </TwentyFirstCultMinimalCardFooter>
    </TwentyFirstCultMinimalCard>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
