import code from '@content/ReactBits/Components/Carousel/Carousel.jsx?raw';
import css from '@content/ReactBits/Components/Carousel/Carousel.css?raw';
import tailwind from '@tailwind/ReactBits/Components/Carousel/Carousel.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/Carousel/Carousel.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/Carousel/Carousel.tsx?raw';

export const carousel = {
  dependencies: `framer-motion`,
  usage: `import Carousel from './Carousel'

<div style={{ height: '600px', position: 'relative' }}>
  <Carousel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
