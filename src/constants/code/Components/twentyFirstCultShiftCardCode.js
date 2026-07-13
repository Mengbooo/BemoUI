import code from '@content/Components/TwentyFirstCultShiftCard/TwentyFirstCultShiftCard.jsx?raw';
import css from '@content/Components/TwentyFirstCultShiftCard/TwentyFirstCultShiftCard.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultShiftCard/TwentyFirstCultShiftCard.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultShiftCard/TwentyFirstCultShiftCard.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultShiftCard/TwentyFirstCultShiftCard.tsx?raw';

export const twentyFirstCultShiftCard = {
  usage: `import TwentyFirstCultShiftCard from './TwentyFirstCultShiftCard';

export default function Example() {
  return (
    <TwentyFirstCultShiftCard
      topContent={<span className="bemo-badge">Featured</span>}
      topAnimateContent={<p className="bemo-muted">Extra header details on expand</p>}
      middleContent={
        <div>
          <img src="/assets/demo/cs1.webp" alt="" className="bemo-media" />
          <h3 className="bemo-title">Shift Card</h3>
        </div>
      }
      bottomContent={
        <div className="bemo-row">
          <span className="bemo-title">Details</span>
          <span className="bemo-soft-text">$48</span>
        </div>
      }
      onHoverChange={(open) => console.log(open)}
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
