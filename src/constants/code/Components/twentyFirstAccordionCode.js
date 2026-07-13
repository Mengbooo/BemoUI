import code from '@content/Components/TwentyFirstAccordion/TwentyFirstAccordion.jsx?raw';
import css from '@content/Components/TwentyFirstAccordion/TwentyFirstAccordion.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstAccordion/TwentyFirstAccordion.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstAccordion/TwentyFirstAccordion.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstAccordion/TwentyFirstAccordion.tsx?raw';

export const twentyFirstAccordion = {
  usage: `import {
  TwentyFirstAccordion,
  TwentyFirstAccordionItem,
  TwentyFirstAccordionTrigger,
  TwentyFirstAccordionContent,
} from './TwentyFirstAccordion';

export default function Example() {
  return (
    <TwentyFirstAccordion>
      <TwentyFirstAccordionItem value="item-1">
        <TwentyFirstAccordionTrigger>Is it animated?</TwentyFirstAccordionTrigger>
        <TwentyFirstAccordionContent>
          <p>Yes — height and opacity animate with Framer Motion.</p>
        </TwentyFirstAccordionContent>
      </TwentyFirstAccordionItem>
      <TwentyFirstAccordionItem value="item-2">
        <TwentyFirstAccordionTrigger>Is it accessible?</TwentyFirstAccordionTrigger>
        <TwentyFirstAccordionContent>
          <p>Native button, ARIA attributes, keyboard support, and focus rings.</p>
        </TwentyFirstAccordionContent>
      </TwentyFirstAccordionItem>
    </TwentyFirstAccordion>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
