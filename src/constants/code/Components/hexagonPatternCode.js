import code from '@content/Components/HexagonPattern/HexagonPattern.jsx?raw';
import css from '@content/Components/HexagonPattern/HexagonPattern.css?raw';
import tailwind from '@tailwind/Components/HexagonPattern/HexagonPattern.jsx?raw';
import tsCode from '@ts-default/Components/HexagonPattern/HexagonPattern.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/HexagonPattern/HexagonPattern.tsx?raw';

export const hexagonPattern = {
  usage: `<Box position="relative" h="360px" w="100%" overflow="hidden">
  <HexagonPattern
    radius={36}
    gap={4}
    direction="horizontal"
    hexagons={[[1, 1], [2, 2], [3, 1]]}
  />
</Box>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
