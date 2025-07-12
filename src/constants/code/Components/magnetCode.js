import { generateCliCommands } from '@/utils/utils';

import code from '../../../content/Components/Magnet/Magnet.jsx?raw';
import tailwind from '@tailwind/Components/Magnet/Magnet.jsx?raw';
import tsCode from '@ts-default/Components/Magnet/Magnet.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Magnet/Magnet.tsx?raw';

export const magnet = {
  ...(generateCliCommands('Animations/Magnet')),
  usage: `import Magnet from './Magnet'

<Magnet padding={50} disabled={false} magnetStrength={50}>
  <p>Star React Bits on GitHub!</p>
</Magnet>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}