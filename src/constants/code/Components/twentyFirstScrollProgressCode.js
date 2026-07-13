import code from '@content/Components/TwentyFirstScrollProgress/TwentyFirstScrollProgress.jsx?raw';
import css from '@content/Components/TwentyFirstScrollProgress/TwentyFirstScrollProgress.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstScrollProgress/TwentyFirstScrollProgress.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstScrollProgress/TwentyFirstScrollProgress.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstScrollProgress/TwentyFirstScrollProgress.tsx?raw';

export const twentyFirstScrollProgress = {
  usage: `<TwentyFirstScrollProgress
  color="#1620E4"
  height={4}
  position="top"
  springOptions={{ stiffness: 200, damping: 50 }}
/>

{/* Or track a specific scroll container */}
const ref = useRef(null);
<div ref={ref} className="h-96 overflow-auto">
  <TwentyFirstScrollProgress containerRef={ref} color="#7BE9C6" />
  {/* long content */}
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
