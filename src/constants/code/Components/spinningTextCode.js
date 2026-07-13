import code from '@content/Components/SpinningText/SpinningText.jsx?raw';
import css from '@content/Components/SpinningText/SpinningText.css?raw';
import tailwind from '@tailwind/Components/SpinningText/SpinningText.jsx?raw';
import tsCode from '@ts-default/Components/SpinningText/SpinningText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/SpinningText/SpinningText.tsx?raw';

export const spinningText = {
  usage: `import { SpinningText } from './SpinningText';

export default function Example() {
  return (
    <SpinningText duration={10} radius={5} reverse={false}>
      BemoUI
    </SpinningText>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
