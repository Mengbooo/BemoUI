import { useState, useEffect } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstSlidingNumber from '../../content/Components/TwentyFirstSlidingNumber/TwentyFirstSlidingNumber';
import { twentyFirstSlidingNumber } from '../../constants/code/Components/twentyFirstSlidingNumberCode';

const propData = [
  {
    name: 'value',
    type: 'number',
    default: '0',
    description: 'The numeric value to display with sliding digit animation.',
  },
  {
    name: 'padStart',
    type: 'boolean',
    default: 'false',
    description: 'When true, pads single-digit integers with a leading zero.',
  },
  {
    name: 'decimalSeparator',
    type: 'string',
    default: "'.'",
    description: 'Character used to separate the integer and fractional parts.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names for the root element.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'auto-generated',
    description: 'Accessible label announced by screen readers (aria-live polite).',
  },
];

export default function TwentyFirstSlidingNumberDemo() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(42.5);
  const [score, setScore] = useState(98);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= 999 ? 0 : c + 1));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => Math.round((p + (Math.random() * 2 - 1) * 0.75) * 100) / 100);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="flex flex-col gap-10 p-6 md:p-10 max-w-3xl mx-auto">
          <header className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              Sliding Number
            </h2>
            <p className="text-neutral-600 text-sm md:text-base max-w-xl">
              Animated digits that slide into place with spring physics. Ideal for counters,
              prices, scores, and live metrics.
            </p>
          </header>

          <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm flex flex-col items-center gap-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Live counter
            </span>
            <TwentyFirstSlidingNumber
              value={count}
              padStart
              className="bemo-21st-sliding-number--2xl text-[#1620E4]"
              aria-label={`Live count ${count}`}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCount((c) => Math.max(0, c - 10))}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]"
              >
                −10
              </button>
              <button
                type="button"
                onClick={() => setCount((c) => c + 10)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1620E4] text-white hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]"
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => setCount(0)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-neutral-300 hover:bg-neutral-50 text-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]"
              >
                Reset
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section className="rounded-2xl border border-neutral-200 bg-neutral-950 p-6 flex flex-col items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Price ticker
              </span>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-2xl font-semibold text-[#7BE9C6]">$</span>
                <TwentyFirstSlidingNumber
                  value={price}
                  decimalSeparator="."
                  className="bemo-21st-sliding-number--xl text-white"
                  aria-label={`Price ${price} dollars`}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Score
              </span>
              <TwentyFirstSlidingNumber
                value={score}
                className="bemo-21st-sliding-number--xl text-[#1620E4]"
                aria-label={`Score ${score}`}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-[#1620E4]"
                aria-label="Adjust score"
              />
            </section>
          </div>

          <section className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/demo/cs1.webp"
                alt=""
                className="w-14 h-14 rounded-xl object-cover"
                width={56}
                height={56}
              />
              <div>
                <p className="font-semibold text-neutral-900">Session views</p>
                <p className="text-sm text-neutral-500">Last 24 hours</p>
              </div>
            </div>
            <TwentyFirstSlidingNumber
              value={12847}
              className="bemo-21st-sliding-number--lg text-neutral-900"
              aria-label="12847 session views"
            />
          </section>

          <footer className="pt-4 border-t border-neutral-200 text-sm text-neutral-500">
            <p>
              Source:{' '}
              <a
                href="https://21st.dev/@ibelick/components/sliding-number"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1620E4] underline underline-offset-2 hover:opacity-80"
              >
                21st.dev Sliding Number
              </a>
              {' · '}Motion Primitives · MIT License
            </p>
          </footer>
        </div>

        <div className="mt-8 px-6 md:px-10 max-w-3xl mx-auto">
          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstSlidingNumber} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
