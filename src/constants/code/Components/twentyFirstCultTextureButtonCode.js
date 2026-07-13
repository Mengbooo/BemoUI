import code from '@content/Components/TwentyFirstCultTextureButton/TwentyFirstCultTextureButton.jsx?raw';
import css from '@content/Components/TwentyFirstCultTextureButton/TwentyFirstCultTextureButton.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultTextureButton/TwentyFirstCultTextureButton.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultTextureButton/TwentyFirstCultTextureButton.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultTextureButton/TwentyFirstCultTextureButton.tsx?raw';

export const twentyFirstCultTextureButton = {
  usage: `import TwentyFirstCultTextureButton from './TwentyFirstCultTextureButton';

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <TwentyFirstCultTextureButton variant="primary">
        Primary
      </TwentyFirstCultTextureButton>
      <TwentyFirstCultTextureButton variant="accent" size="sm">
        Accent
      </TwentyFirstCultTextureButton>
      <TwentyFirstCultTextureButton variant="icon" size="icon" aria-label="Like">
        ♥
      </TwentyFirstCultTextureButton>
      <TwentyFirstCultTextureButton variant="destructive" disabled>
        Delete
      </TwentyFirstCultTextureButton>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
