import code from '@content/Components/TwentyFirstCultThreeDCarousel/TwentyFirstCultThreeDCarousel.jsx?raw';
import css from '@content/Components/TwentyFirstCultThreeDCarousel/TwentyFirstCultThreeDCarousel.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultThreeDCarousel/TwentyFirstCultThreeDCarousel.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultThreeDCarousel/TwentyFirstCultThreeDCarousel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultThreeDCarousel/TwentyFirstCultThreeDCarousel.tsx?raw';

export const twentyFirstCultThreeDCarousel = {
  usage: `import TwentyFirstCultThreeDCarousel from './TwentyFirstCultThreeDCarousel';

const images = [
  { src: '/assets/demo/cs1.webp', alt: 'City skyline' },
  { src: '/assets/demo/cs2.webp', alt: 'Architecture' },
  { src: '/assets/demo/cs3.webp', alt: 'Night street' },
];

export default function Example() {
  return (
    <TwentyFirstCultThreeDCarousel
      images={images}
      height={500}
      onImageOpen={(img, i) => console.log('open', img, i)}
      onImageClose={() => console.log('close')}
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
