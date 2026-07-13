import code from '@content/Components/Marquee/Marquee.jsx?raw';
import css from '@content/Components/Marquee/Marquee.css?raw';
import tailwind from '@tailwind/Components/Marquee/Marquee.jsx?raw';
import tsCode from '@ts-default/Components/Marquee/Marquee.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Marquee/Marquee.tsx?raw';

export const marquee = {
  usage: `import Marquee from './Marquee';

<Marquee pauseOnHover fade duration="28s" gap="1rem">
  {items.map((item) => (
    <article key={item.id}>{item.content}</article>
  ))}
</Marquee>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
