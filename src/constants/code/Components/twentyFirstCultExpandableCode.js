import code from '@content/Components/TwentyFirstCultExpandable/TwentyFirstCultExpandable.jsx?raw';
import css from '@content/Components/TwentyFirstCultExpandable/TwentyFirstCultExpandable.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultExpandable/TwentyFirstCultExpandable.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultExpandable/TwentyFirstCultExpandable.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultExpandable/TwentyFirstCultExpandable.tsx?raw';

export const twentyFirstCultExpandable = {
  usage: `import TwentyFirstCultExpandable from './TwentyFirstCultExpandable';

export default function Example() {
  return (
    <TwentyFirstCultExpandable expandDirection="both">
      <TwentyFirstCultExpandable.Card
        collapsedSize={{ width: 300, height: 200 }}
        expandedSize={{ width: 420, height: 360 }}
      >
        <TwentyFirstCultExpandable.Trigger>
          <TwentyFirstCultExpandable.CardHeader>
            <h3>Title</h3>
          </TwentyFirstCultExpandable.CardHeader>
        </TwentyFirstCultExpandable.Trigger>
        <TwentyFirstCultExpandable.CardContent>
          Visible summary content.
        </TwentyFirstCultExpandable.CardContent>
        <TwentyFirstCultExpandable.Content preset="slide-up" stagger>
          <p>Hidden details that animate in on expand.</p>
        </TwentyFirstCultExpandable.Content>
        <TwentyFirstCultExpandable.CardFooter>
          Footer actions
        </TwentyFirstCultExpandable.CardFooter>
      </TwentyFirstCultExpandable.Card>
    </TwentyFirstCultExpandable>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
