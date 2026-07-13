import code from '@content/Components/TwentyFirstDisclosure/TwentyFirstDisclosure.jsx?raw';
import css from '@content/Components/TwentyFirstDisclosure/TwentyFirstDisclosure.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstDisclosure/TwentyFirstDisclosure.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstDisclosure/TwentyFirstDisclosure.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstDisclosure/TwentyFirstDisclosure.tsx?raw';

export const twentyFirstDisclosure = {
  usage: `import { useState } from 'react';
import TwentyFirstDisclosure from './TwentyFirstDisclosure';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <TwentyFirstDisclosure open={open} onOpenChange={setOpen}>
      <TwentyFirstDisclosure.Trigger>
        Shipping & returns
      </TwentyFirstDisclosure.Trigger>
      <TwentyFirstDisclosure.Content>
        <p>Orders ship within 2 business days. Free returns within 30 days.</p>
      </TwentyFirstDisclosure.Content>
    </TwentyFirstDisclosure>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
