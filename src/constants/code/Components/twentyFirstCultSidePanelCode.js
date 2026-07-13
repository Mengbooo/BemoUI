import code from '@content/Components/TwentyFirstCultSidePanel/TwentyFirstCultSidePanel.jsx?raw';
import css from '@content/Components/TwentyFirstCultSidePanel/TwentyFirstCultSidePanel.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultSidePanel/TwentyFirstCultSidePanel.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultSidePanel/TwentyFirstCultSidePanel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultSidePanel/TwentyFirstCultSidePanel.tsx?raw';

export const twentyFirstCultSidePanel = {
  usage: `import { useState } from 'react';
import TwentyFirstCultSidePanel from './TwentyFirstCultSidePanel';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <TwentyFirstCultSidePanel
      panelOpen={open}
      onPanelOpenChange={setOpen}
      videoPoster="/assets/demo/cs1.webp"
      videoTitle="Product walkthrough"
      accentColor="#1620E4"
      accentSecondary="#7BE9C6"
    >
      <h3>Feature panel</h3>
      <p>Expand for details, media, and actions. Press Escape to close.</p>
    </TwentyFirstCultSidePanel>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
