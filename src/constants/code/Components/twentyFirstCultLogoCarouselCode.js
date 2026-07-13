import code from '@content/Components/TwentyFirstCultLogoCarousel/TwentyFirstCultLogoCarousel.jsx?raw';
import css from '@content/Components/TwentyFirstCultLogoCarousel/TwentyFirstCultLogoCarousel.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultLogoCarousel/TwentyFirstCultLogoCarousel.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultLogoCarousel/TwentyFirstCultLogoCarousel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultLogoCarousel/TwentyFirstCultLogoCarousel.tsx?raw';

export const twentyFirstCultLogoCarousel = {
  usage: `import TwentyFirstCultLogoCarousel from './TwentyFirstCultLogoCarousel';

const logos = [
  { name: 'Acme', id: 1, src: '/assets/demo/cs1.webp' },
  { name: 'Nova', id: 2, src: '/assets/demo/cs2.webp' },
  { name: 'Orbit', id: 3 },
  { name: 'Pulse', id: 4 },
];

export default function Example() {
  return (
    <TwentyFirstCultLogoCarousel
      logos={logos}
      columnCount={3}
      cycleInterval={2000}
      aria-label="Trusted by"
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
