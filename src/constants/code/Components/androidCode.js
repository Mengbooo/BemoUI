import code from '@content/Components/Android/Android.jsx?raw';
import css from '@content/Components/Android/Android.css?raw';
import tailwind from '@tailwind/Components/Android/Android.jsx?raw';
import tsCode from '@ts-default/Components/Android/Android.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Android/Android.tsx?raw';

export const android = {
  usage: `import Android from './Android';

export default function Example() {
  return <Android width={300} height={610} src="/screens/home.png" />;
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
