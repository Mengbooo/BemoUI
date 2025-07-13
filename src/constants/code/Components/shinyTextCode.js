import code from '@content/Components/ShinyText/ShinyText.jsx?raw';
import css from '@content/Components/ShinyText/ShinyText.css?raw';
import tailwind from '@tailwind/Components/ShinyText/ShinyText.jsx?raw';
import tsCode from '@ts-default/Components/ShinyText/ShinyText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ShinyText/ShinyText.tsx?raw';

export const shinyText = {
  usage: `import ShinyText from './ShinyText';
  
<ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}