import code from '@content/Components/TwentyFirstInView/TwentyFirstInView.jsx?raw';
import css from '@content/Components/TwentyFirstInView/TwentyFirstInView.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstInView/TwentyFirstInView.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstInView/TwentyFirstInView.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstInView/TwentyFirstInView.tsx?raw';

export const twentyFirstInView = {
  usage: `<TwentyFirstInView
  once
  variants={{
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  viewOptions={{ amount: 0.3 }}
  className="p-6 rounded-xl bg-white shadow"
>
  <h3>Animated content</h3>
  <p>Fades and slides up when scrolled into view.</p>
</TwentyFirstInView>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
