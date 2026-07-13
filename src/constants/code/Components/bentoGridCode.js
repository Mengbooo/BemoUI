import code from '@content/Components/BentoGrid/BentoGrid.jsx?raw';
import css from '@content/Components/BentoGrid/BentoGrid.css?raw';
import tailwind from '@tailwind/Components/BentoGrid/BentoGrid.jsx?raw';
import tsCode from '@ts-default/Components/BentoGrid/BentoGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BentoGrid/BentoGrid.tsx?raw';

export const bentoGrid = {
  usage: `import { BentoGrid, BentoCard } from './BentoGrid';

export default function Example() {
  return (
    <BentoGrid>
      <BentoCard
        name="Save your files"
        className="bemo-bento-grid__card--span-2"
        href="/docs"
        cta="Learn more"
        description="Keep project assets organized in one glanceable surface."
        Icon={(props) => (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path d="M7 3.75h6.75L18.75 9v11.25A1.5 1.5 0 0 1 17.25 21.75H7A1.5 1.5 0 0 1 5.25 20.25V5.25A1.5 1.5 0 0 1 7 3.75Z" />
            <path d="M13.5 3.75V9h5.25" />
          </svg>
        )}
        background={
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(145deg, #1620E422 0%, #7BE9C633 55%, transparent 100%)',
            }}
          />
        }
      />
    </BentoGrid>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
