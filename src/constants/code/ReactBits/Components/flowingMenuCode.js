import code from '@content/ReactBits/Components/FlowingMenu/FlowingMenu.jsx?raw';
import css from '@content/ReactBits/Components/FlowingMenu/FlowingMenu.css?raw';
import tailwind from '@tailwind/ReactBits/Components/FlowingMenu/FlowingMenu.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/FlowingMenu/FlowingMenu.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/FlowingMenu/FlowingMenu.tsx?raw';

export const flowingMenu = {
  dependencies: `gsap`,
  usage: `import FlowingMenu from './FlowingMenu'

const demoItems = [
  { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
];

<div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
