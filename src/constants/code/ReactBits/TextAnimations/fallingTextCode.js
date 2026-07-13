import code from '@content/ReactBits/TextAnimations/FallingText/FallingText.jsx?raw';
import css from '@content/ReactBits/TextAnimations/FallingText/FallingText.css?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/FallingText/FallingText.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/FallingText/FallingText.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/FallingText/FallingText.tsx?raw';

export const fallingText = {
  dependencies: 'matter-js',
  usage: `import FallingText from './FallingText';

<FallingText
  text={\`BemoUI is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.\`}
  highlightWords={["React", "Bits", "animated", "components", "simplify"]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
