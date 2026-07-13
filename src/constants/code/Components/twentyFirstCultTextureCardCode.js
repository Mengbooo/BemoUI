import code from '@content/Components/TwentyFirstCultTextureCard/TwentyFirstCultTextureCard.jsx?raw';
import css from '@content/Components/TwentyFirstCultTextureCard/TwentyFirstCultTextureCard.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultTextureCard/TwentyFirstCultTextureCard.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultTextureCard/TwentyFirstCultTextureCard.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultTextureCard/TwentyFirstCultTextureCard.tsx?raw';

export const twentyFirstCultTextureCard = {
  usage: `import TwentyFirstCultTextureCard, {
  TwentyFirstCultTextureCardHeader,
  TwentyFirstCultTextureCardTitle,
  TwentyFirstCultTextureCardDescription,
  TwentyFirstCultTextureCardContent,
  TwentyFirstCultTextureCardFooter,
  TwentyFirstCultTextureSeparator,
} from './TwentyFirstCultTextureCard';

export default function Example() {
  return (
    <TwentyFirstCultTextureCard variant="default">
      <TwentyFirstCultTextureCardHeader>
        <TwentyFirstCultTextureCardTitle>Project Alpha</TwentyFirstCultTextureCardTitle>
        <TwentyFirstCultTextureCardDescription>
          Nested borders with a soft gradient surface.
        </TwentyFirstCultTextureCardDescription>
      </TwentyFirstCultTextureCardHeader>
      <TwentyFirstCultTextureSeparator />
      <TwentyFirstCultTextureCardContent>
        Your content here.
      </TwentyFirstCultTextureCardContent>
      <TwentyFirstCultTextureCardFooter>
        <span>Meta</span>
        <button type="button">Action</button>
      </TwentyFirstCultTextureCardFooter>
    </TwentyFirstCultTextureCard>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
