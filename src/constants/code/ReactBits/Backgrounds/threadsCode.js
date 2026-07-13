import code from '@content/ReactBits/Backgrounds/Threads/Threads.jsx?raw';
import css from '@content/ReactBits/Backgrounds/Threads/Threads.css?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Threads/Threads.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Threads/Threads.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Threads/Threads.tsx?raw';

export const threads = {
  dependencies: `ogl`,
  usage: `import Threads from './Threads';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Threads
    amplitude={1}
    distance={0}
    enableMouseInteraction={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
