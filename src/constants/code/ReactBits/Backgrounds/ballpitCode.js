import code from '@content/ReactBits/Backgrounds/Ballpit/Ballpit.jsx?raw';
import tailwind from '@tailwind/ReactBits/Backgrounds/Ballpit/Ballpit.jsx?raw';
import tsCode from '@ts-default/ReactBits/Backgrounds/Ballpit/Ballpit.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Backgrounds/Ballpit/Ballpit.tsx?raw';

export const ballpit = {
  dependencies: `three`,
  usage: `//Component inspired by Kevin Levron:
//https://x.com/soju22/status/1858925191671271801

import Ballpit from './Ballpit;'

<div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
  <Ballpit
    count={200}
    gravity={0.7}
    friction={0.8}
    wallBounce={0.95}
    followCursor={true}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
