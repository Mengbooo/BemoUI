import code from '@content/Components/Dock/Dock.jsx?raw';
import css from '@content/Components/Dock/Dock.css?raw';
import tailwind from '@tailwind/Components/Dock/Dock.jsx?raw';
import tsCode from '@ts-default/Components/Dock/Dock.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Dock/Dock.tsx?raw';

export const dock = {
  usage: `import { Dock, DockIcon } from './Dock';

export default function Example() {
  return (
    <Dock>
      <DockIcon aria-label="Home">🏠</DockIcon>
      <DockIcon aria-label="Search">🔍</DockIcon>
      <DockIcon aria-label="Settings">⚙️</DockIcon>
    </Dock>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
