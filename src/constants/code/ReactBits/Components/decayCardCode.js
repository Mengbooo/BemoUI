import code from '@content/ReactBits/Components/DecayCard/DecayCard.jsx?raw';
import css from '@content/ReactBits/Components/DecayCard/DecayCard.css?raw';
import tailwind from '@tailwind/ReactBits/Components/DecayCard/DecayCard.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/DecayCard/DecayCard.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/DecayCard/DecayCard.tsx?raw';

export const decayCard = {
  dependencies: `gsap`,
  usage: `import DecayCard from './DecayCard';

<DecayCard width={200} height={300} image="https://picsum.photos/300/400?grayscale">
  <h2>Decay<br/>Card</h2>
</DecayCard>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
