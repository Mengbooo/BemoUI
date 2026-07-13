import code from '@content/Components/AnimatedGridPattern/AnimatedGridPattern.jsx?raw';
import css from '@content/Components/AnimatedGridPattern/AnimatedGridPattern.css?raw';
import tailwind from '@tailwind/Components/AnimatedGridPattern/AnimatedGridPattern.jsx?raw';
import tsCode from '@ts-default/Components/AnimatedGridPattern/AnimatedGridPattern.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AnimatedGridPattern/AnimatedGridPattern.tsx?raw';

export const animatedGridPattern = {
  usage: `<Box position="relative" h="400px" w="100%" overflow="hidden">
  <AnimatedGridPattern
    numSquares={30}
    maxOpacity={0.5}
    duration={4}
    repeatDelay={0.5}
    color="#1620E4"
  />
</Box>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
