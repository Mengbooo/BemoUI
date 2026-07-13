import code from '@content/Components/TwentyFirstCarousel/TwentyFirstCarousel.jsx?raw';
import css from '@content/Components/TwentyFirstCarousel/TwentyFirstCarousel.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCarousel/TwentyFirstCarousel.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCarousel/TwentyFirstCarousel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCarousel/TwentyFirstCarousel.tsx?raw';

export const twentyFirstCarousel = {
  usage: `import TwentyFirstCarousel from './TwentyFirstCarousel';

export default function Example() {
  return (
    <TwentyFirstCarousel alwaysShowNavigation onIndexChange={(i) => console.log(i)}>
      <TwentyFirstCarousel.Item>
        <div>Slide 1</div>
      </TwentyFirstCarousel.Item>
      <TwentyFirstCarousel.Item>
        <div>Slide 2</div>
      </TwentyFirstCarousel.Item>
      <TwentyFirstCarousel.Item>
        <div>Slide 3</div>
      </TwentyFirstCarousel.Item>
    </TwentyFirstCarousel>
  );
}

// Compound API:
// <Carousel>
//   <CarouselContent>
//     <CarouselItem>...</CarouselItem>
//   </CarouselContent>
//   <CarouselNavigation alwaysShow />
//   <CarouselIndicator />
// </Carousel>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
