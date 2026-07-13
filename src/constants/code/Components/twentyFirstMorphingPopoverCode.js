import code from '@content/Components/TwentyFirstMorphingPopover/TwentyFirstMorphingPopover.jsx?raw';
import css from '@content/Components/TwentyFirstMorphingPopover/TwentyFirstMorphingPopover.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstMorphingPopover/TwentyFirstMorphingPopover.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstMorphingPopover/TwentyFirstMorphingPopover.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstMorphingPopover/TwentyFirstMorphingPopover.tsx?raw';

export const twentyFirstMorphingPopover = {
  usage: `import {
  TwentyFirstMorphingPopover,
  TwentyFirstMorphingPopoverTrigger,
  TwentyFirstMorphingPopoverContent,
} from './TwentyFirstMorphingPopover';

export default function Example() {
  return (
    <TwentyFirstMorphingPopover>
      <TwentyFirstMorphingPopoverTrigger>Open</TwentyFirstMorphingPopoverTrigger>
      <TwentyFirstMorphingPopoverContent>
        <p>Morphing popover content</p>
      </TwentyFirstMorphingPopoverContent>
    </TwentyFirstMorphingPopover>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
