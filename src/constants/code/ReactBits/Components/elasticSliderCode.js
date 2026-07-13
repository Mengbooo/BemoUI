import code from '@content/ReactBits/Components/ElasticSlider/ElasticSlider.jsx?raw';
import css from '@content/ReactBits/Components/ElasticSlider/ElasticSlider.css?raw';
import tailwind from '@tailwind/ReactBits/Components/ElasticSlider/ElasticSlider.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/ElasticSlider/ElasticSlider.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/ElasticSlider/ElasticSlider.tsx?raw';

export const elasticSlider = {
  dependencies: `framer-motion`,
  usage: `import ElasticSlider from './ElasticSlider'

<ElasticSlider
  leftIcon={<>...your icon...</>}
  rightIcon={<>...your icon...</>}
  startingValue={500}
  defaultValue={750}
  maxValue={1000}
  isStepped
  stepSize={10}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
