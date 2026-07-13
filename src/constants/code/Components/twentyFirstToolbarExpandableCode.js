import code from '@content/Components/TwentyFirstToolbarExpandable/TwentyFirstToolbarExpandable.jsx?raw';
import css from '@content/Components/TwentyFirstToolbarExpandable/TwentyFirstToolbarExpandable.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstToolbarExpandable/TwentyFirstToolbarExpandable.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstToolbarExpandable/TwentyFirstToolbarExpandable.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstToolbarExpandable/TwentyFirstToolbarExpandable.tsx?raw';

export const twentyFirstToolbarExpandable = {
  usage: `import TwentyFirstToolbarExpandable from './TwentyFirstToolbarExpandable';
import { User, MessageCircle } from 'lucide-react';

const items = [
  {
    id: 1,
    label: 'User',
    icon: User,
    content: <div>Profile panel content</div>,
  },
  {
    id: 2,
    label: 'Messages',
    icon: MessageCircle,
    content: <div>You have 3 new messages.</div>,
  },
];

export default function Example() {
  return (
    <TwentyFirstToolbarExpandable
      items={items}
      accentColor="#1620E4"
      secondaryColor="#7BE9C6"
      onActiveChange={(id) => console.log('active', id)}
      onOpenChange={(open) => console.log('open', open)}
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
