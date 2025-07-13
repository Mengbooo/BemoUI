import code from '@content/Components/MatrixCode/MatrixCode.jsx?raw';
import css from '@content/Components/MatrixCode/MatrixCode.css?raw';
import tailwind from '@tailwind/Components/MatrixCode/MatrixCode.jsx?raw';
import tsCode from '@ts-default/Components/MatrixCode/MatrixCode.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/MatrixCode/MatrixCode.tsx?raw';

export const matrixCode = {
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