import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/StarBorder/StarBorder.jsx?raw';
import css from '@content/Components/StarBorder/StarBorder.css?raw';
import tailwind from '@tailwind/Components/StarBorder/StarBorder.jsx?raw';
import tsCode from '@ts-default/Components/StarBorder/StarBorder.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/StarBorder/StarBorder.tsx?raw';

export const starBorder = {
  ...(generateCliCommands('Animations/StarBorder')),
  usage: `import StarBorder from './StarBorder'
  
<StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
  // content
</StarBorder>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
}