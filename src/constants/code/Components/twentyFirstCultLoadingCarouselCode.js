import code from '@content/Components/TwentyFirstCultLoadingCarousel/TwentyFirstCultLoadingCarousel.jsx?raw';
import css from '@content/Components/TwentyFirstCultLoadingCarousel/TwentyFirstCultLoadingCarousel.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultLoadingCarousel/TwentyFirstCultLoadingCarousel.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultLoadingCarousel/TwentyFirstCultLoadingCarousel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultLoadingCarousel/TwentyFirstCultLoadingCarousel.tsx?raw';

export const twentyFirstCultLoadingCarousel = {
  usage: `<TwentyFirstCultLoadingCarousel
  tips={[
    { text: 'Keep users engaged while content loads.', image: '/assets/demo/cs1.webp' },
    { text: 'Progress segments show remaining wait time.', image: '/assets/demo/cs2.webp' },
    { text: 'Keyboard arrows and indicators for control.', image: '/assets/demo/cs3.webp' },
  ]}
  autoplayInterval={4500}
  showNavigation
  showIndicators
  showProgress
  aspectRatio="video"
  backgroundGradient
  onTipChange={(index) => console.log(index)}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
