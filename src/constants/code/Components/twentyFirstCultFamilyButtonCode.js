import code from '@content/Components/TwentyFirstCultFamilyButton/TwentyFirstCultFamilyButton.jsx?raw';
import css from '@content/Components/TwentyFirstCultFamilyButton/TwentyFirstCultFamilyButton.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultFamilyButton/TwentyFirstCultFamilyButton.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultFamilyButton/TwentyFirstCultFamilyButton.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultFamilyButton/TwentyFirstCultFamilyButton.tsx?raw';

export const twentyFirstCultFamilyButton = {
  usage: `<TwentyFirstCultFamilyButton
  label="Open family actions"
  onExpandedChange={(open) => console.log(open)}
>
  <div style={{ padding: 4 }}>
    <p style={{ margin: 0, fontSize: 13, color: '#fafafa' }}>Family actions</p>
  </div>
</TwentyFirstCultFamilyButton>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
