import code from '@content/Components/LineShadowText/LineShadowText.jsx?raw';
import css from '@content/Components/LineShadowText/LineShadowText.css?raw';
import tailwind from '@tailwind/Components/LineShadowText/LineShadowText.jsx?raw';
import tsCode from '@ts-default/Components/LineShadowText/LineShadowText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/LineShadowText/LineShadowText.tsx?raw';

export const lineShadowText = {
  usage: `import { LineShadowText } from './LineShadowText';

export default function Example() {
  return (
    <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#fff' }}>
      <LineShadowText shadowColor="#1620E4">BemoUI</LineShadowText>
    </h1>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
