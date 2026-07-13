import code from '@content/ReactBits/TextAnimations/TextPressure/TextPressure.jsx?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/TextPressure/TextPressure.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/TextPressure/TextPressure.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/TextPressure/TextPressure.tsx?raw';

export const textPressure = {
  usage: `// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/

import TextPressure from './TextPressure';

// Note:
// Make sure the font you're using supports all the variable properties.
// BemoUI does not take responsibility for the fonts used

<div style={{position: 'relative', height: '300px'}}>
  <TextPressure
    text="Hello!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
