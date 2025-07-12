import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/Squares/Squares.jsx?raw';
import css from '@content/Components/Squares/Squares.css?raw';
import tailwind from '@tailwind/Components/Squares/Squares.jsx?raw';
import tsCode from '@ts-default/Components/Squares/Squares.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Squares/Squares.tsx?raw';

export const squares = {
  ...(generateCliCommands('Backgrounds/Squares')),
  usage: `import Squares from './Squares';
  
<Squares 
speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
