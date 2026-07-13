import code from '@content/Components/MagicAnimatedList/MagicAnimatedList.jsx?raw';
import css from '@content/Components/MagicAnimatedList/MagicAnimatedList.css?raw';
import tailwind from '@tailwind/Components/MagicAnimatedList/MagicAnimatedList.jsx?raw';
import tsCode from '@ts-default/Components/MagicAnimatedList/MagicAnimatedList.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/MagicAnimatedList/MagicAnimatedList.tsx?raw';

export const magicAnimatedList = {
  usage: `import MagicAnimatedList from './MagicAnimatedList';

export default function Example() {
  return (
    <MagicAnimatedList delay={1000}>
      <div>Payment received</div>
      <div>User signed up</div>
      <div>New message</div>
    </MagicAnimatedList>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
