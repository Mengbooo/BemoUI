import code from '@content/Components/TwentyFirstDock/TwentyFirstDock.jsx?raw';
import css from '@content/Components/TwentyFirstDock/TwentyFirstDock.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstDock/TwentyFirstDock.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstDock/TwentyFirstDock.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstDock/TwentyFirstDock.tsx?raw';

export const twentyFirstDock = {
  usage: `import TwentyFirstDock, { DockItem, DockLabel, DockIcon } from './TwentyFirstDock';
import { Home, Settings } from 'lucide-react';

export default function Example() {
  return (
    <TwentyFirstDock magnification={80} distance={150} panelHeight={64}>
      <DockItem onClick={() => console.log('home')}>
        <DockLabel>Home</DockLabel>
        <DockIcon>
          <Home />
        </DockIcon>
      </DockItem>
      <DockItem onClick={() => console.log('settings')}>
        <DockLabel>Settings</DockLabel>
        <DockIcon>
          <Settings />
        </DockIcon>
      </DockItem>
    </TwentyFirstDock>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
