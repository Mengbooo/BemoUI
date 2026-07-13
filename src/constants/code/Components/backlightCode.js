import code from '@content/Components/Backlight/Backlight.jsx?raw';
import css from '@content/Components/Backlight/Backlight.css?raw';
import tailwind from '@tailwind/Components/Backlight/Backlight.jsx?raw';
import tsCode from '@ts-default/Components/Backlight/Backlight.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Backlight/Backlight.tsx?raw';

export const backlight = {
  usage: `import Backlight from './Backlight';

export default function Example() {
  return (
    <Backlight blur={20}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          background: '#1620E4',
        }}
      />
    </Backlight>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
