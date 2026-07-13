import code from '@content/Components/TwentyFirstCultDirectionAwareTabs/TwentyFirstCultDirectionAwareTabs.jsx?raw';
import css from '@content/Components/TwentyFirstCultDirectionAwareTabs/TwentyFirstCultDirectionAwareTabs.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultDirectionAwareTabs/TwentyFirstCultDirectionAwareTabs.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultDirectionAwareTabs/TwentyFirstCultDirectionAwareTabs.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultDirectionAwareTabs/TwentyFirstCultDirectionAwareTabs.tsx?raw';

export const twentyFirstCultDirectionAwareTabs = {
  usage: `<TwentyFirstCultDirectionAwareTabs\\n  tabs={[\\n    { id: 0, label: 'Overview', content: <div>Overview panel</div> },\\n    { id: 1, label: 'Details', content: <div>Details panel</div> },\\n    { id: 2, label: 'Pricing', content: <div>Pricing panel</div> },\\n  ]}\\n  defaultActiveId={0}\\n  onChange={(id) => console.log(id)}\\n  accentColor=\\"#1620E4\\"\\n  accentColorAlt=\\"#7BE9C6\\"\\n/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
