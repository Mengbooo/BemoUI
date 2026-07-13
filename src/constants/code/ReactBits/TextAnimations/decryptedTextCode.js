import code from '@content/ReactBits/TextAnimations/DecryptedText/DecryptedText.jsx?raw';
import tailwind from '@tailwind/ReactBits/TextAnimations/DecryptedText/DecryptedText.jsx?raw';
import tsCode from '@ts-default/ReactBits/TextAnimations/DecryptedText/DecryptedText.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/TextAnimations/DecryptedText/DecryptedText.tsx?raw';

export const decryptedText = {
  dependencies: `framer-motion`,
  usage: `import DecryptedText from './DecryptedText';

{/* Example 1: Defaults (hover to decrypt) */}
<DecryptedText text="Hover me!" />

{/* Example 2: Customized speed and characters */}
<DecryptedText
text="Customize me"
speed={100}
maxIterations={20}
characters="ABCD1234!?"
className="revealed"
parentClassName="all-letters"
encryptedClassName="encrypted"
/>

{/* Example 3: Click to decrypt (toggle mode) */}
<DecryptedText
text="Click to decrypt"
animateOn="click"
clickMode="toggle"
/>

{/* Example 4: Animate on view (runs once) */}
<div style={{ marginTop: '4rem' }}>
  <DecryptedText
  text="This text animates when in view"
  animateOn="view"
  revealDirection="center"
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
