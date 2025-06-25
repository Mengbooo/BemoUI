import { generateCliCommands } from '@/utils/utils';

import code from '@content/Backgrounds/MatrixCode/MatrixCode.jsx?raw';
import css from '@content/Backgrounds/MatrixCode/MatrixCode.css?raw';
import tailwind from '@tailwind/Backgrounds/MatrixCode/MatrixCode.jsx?raw';
import tsCode from '@ts-default/Backgrounds/MatrixCode/MatrixCode.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/MatrixCode/MatrixCode.tsx?raw';

export const matrixCode = {
  ...(generateCliCommands('Backgrounds/MatrixCode')),
  usage: `import MatrixCode from './MatrixCode';
<MatrixCode
  fontSize={20}
  color="#00ff00"
  characters="01"
  fadeOpacity={0.1}
  speed={1}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}