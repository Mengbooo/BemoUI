import code from '@content/ReactBits/Components/FlyingPosters/FlyingPosters.jsx?raw';
import css from '@content/ReactBits/Components/FlyingPosters/FlyingPosters.css?raw';
import tailwind from '@tailwind/ReactBits/Components/FlyingPosters/FlyingPosters.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/FlyingPosters/FlyingPosters.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/FlyingPosters/FlyingPosters.tsx?raw';

export const flyingPosters = {
  dependencies: `ogl`,
  usage: `import FlyingPosters from './FlyingPosters'

const items = [
  'https://picsum.photos/500/500?grayscale',
  'https://picsum.photos/600/600?grayscale',
  'https://picsum.photos/400/400?grayscale'
];

<div style={{ height: '600px', position: 'relative' }}>
  <FlyingPosters items={items}/>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
