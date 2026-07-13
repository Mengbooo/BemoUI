import code from '@content/Components/TwentyFirstCursor/TwentyFirstCursor.jsx?raw';
import css from '@content/Components/TwentyFirstCursor/TwentyFirstCursor.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCursor/TwentyFirstCursor.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCursor/TwentyFirstCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCursor/TwentyFirstCursor.tsx?raw';

export const twentyFirstCursor = {
  usage: `import { TwentyFirstCursor } from './TwentyFirstCursor';

function Example() {
  return (
    <div style={{ position: 'relative', minHeight: 240 }}>
      <TwentyFirstCursor
        attachToParent
        springConfig={{ stiffness: 420, damping: 28 }}
        onPositionChange={(x, y) => console.log(x, y)}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#1620E4',
            boxShadow: '0 0 0 2px rgba(22,32,228,0.25)',
          }}
        />
      </TwentyFirstCursor>
      Hover me
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
