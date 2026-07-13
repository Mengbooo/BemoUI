import code from '@content/ReactBits/Backgrounds/ShapeGrid/ShapeGrid.jsx?raw';
import css from '@content/ReactBits/Backgrounds/ShapeGrid/ShapeGrid.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/ShapeGrid/ShapeGrid.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/ShapeGrid/ShapeGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/ShapeGrid/ShapeGrid.tsx?raw';

export const shapeGrid = {
  usage: `import ShapeGrid from './ShapeGrid';

<ShapeGrid
speed={0.5}
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
shape='square' // square, hexagon, circle, triangle
hoverTrailAmount={5} // number of trailing hovered shapes (0 = no trail)
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
