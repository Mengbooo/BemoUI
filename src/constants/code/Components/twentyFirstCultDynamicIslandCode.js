import code from '@content/Components/TwentyFirstCultDynamicIsland/TwentyFirstCultDynamicIsland.jsx?raw';
import css from '@content/Components/TwentyFirstCultDynamicIsland/TwentyFirstCultDynamicIsland.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultDynamicIsland/TwentyFirstCultDynamicIsland.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultDynamicIsland/TwentyFirstCultDynamicIsland.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultDynamicIsland/TwentyFirstCultDynamicIsland.tsx?raw';

export const twentyFirstCultDynamicIsland = {
  usage: `import TwentyFirstCultDynamicIsland, {
  DynamicIslandProvider,
  DynamicIsland,
  DynamicContainer,
  DynamicTitle,
  DynamicDescription,
  useDynamicIslandSize,
  SIZE_PRESETS,
} from './TwentyFirstCultDynamicIsland';

function Controls() {
  const { setSize } = useDynamicIslandSize();
  return (
    <button type="button" onClick={() => setSize(SIZE_PRESETS.COMPACT)}>
      Compact
    </button>
  );
}

export default function Example() {
  return (
    <DynamicIslandProvider initialSize={SIZE_PRESETS.DEFAULT}>
      <Controls />
      <DynamicIsland id="my-island">
        <DynamicContainer>
          <DynamicTitle>Now Playing</DynamicTitle>
          <DynamicDescription>Midnight Drive</DynamicDescription>
        </DynamicContainer>
      </DynamicIsland>
    </DynamicIslandProvider>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
