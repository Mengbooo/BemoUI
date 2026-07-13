import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstImageComparison from '../../content/Components/TwentyFirstImageComparison/TwentyFirstImageComparison';
import { twentyFirstImageComparison } from '../../constants/code/Components/twentyFirstImageComparisonCode';

const propsData = [
  {
    name: 'enableHover',
    type: 'boolean',
    default: 'false',
    description: 'When true, the slider follows the pointer on hover without requiring a drag.',
  },
  {
    name: 'springOptions',
    type: 'SpringOptions',
    default: '{ bounce: 0, duration: 0 }',
    description: 'framer-motion spring configuration applied to the slider position.',
  },
  {
    name: 'initialPosition',
    type: 'number',
    default: '50',
    description: 'Initial slider position as a percentage (0–100).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer and keyboard interaction.',
  },
  {
    name: 'onPositionChange',
    type: '(position: number) => void',
    default: '—',
    description: 'Callback fired when the comparison position changes.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the root container.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: "'Image comparison slider'",
    description: 'Accessible label for the comparison group.',
  },
  {
    name: 'Image.src / Image.alt / Image.position',
    type: 'string / string / "left" | "right"',
    default: '—',
    description: 'Image subcomponent props. position clips the image to the left or right of the slider.',
  },
  {
    name: 'Slider.children',
    type: 'ReactNode',
    default: '—',
    description: 'Optional custom handle content for the vertical slider rail.',
  },
];

export default function TwentyFirstImageComparisonDemo() {
  const [position, setPosition] = useState(50);
  const [enableHover, setEnableHover] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="space-y-8 p-4 md:p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Image Comparison</h2>
            <p className="text-sm text-neutral-400 max-w-2xl">
              Drag the slider (or use arrow keys when focused) to compare two images. Toggle hover mode
              for pointer-following interaction. Accents use BemoUI blue (#1620E4) and mint (#7BE9C6).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableHover}
                onChange={(e) => setEnableHover(e.target.checked)}
                className="rounded border-neutral-600 bg-neutral-900 text-[#1620E4] focus-visible:ring-2 focus-visible:ring-[#7BE9C6]"
              />
              Enable hover
            </label>
            <span className="text-xs text-neutral-500 tabular-nums">
              Position: {Math.round(position)}%
            </span>
          </div>

          <div className="max-w-3xl mx-auto w-full rounded-xl overflow-hidden border border-neutral-800 shadow-lg shadow-black/40">
            <TwentyFirstImageComparison
              className="aspect-[16/10] w-full"
              enableHover={enableHover}
              initialPosition={50}
              onPositionChange={setPosition}
              aria-label="Before and after design comparison"
            >
              <TwentyFirstImageComparison.Image
                src="/assets/demo/cs1.webp"
                alt="Before"
                position="left"
              />
              <TwentyFirstImageComparison.Image
                src="/assets/demo/cs2.webp"
                alt="After"
                position="right"
              />
              <TwentyFirstImageComparison.Slider className="">
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full border-2 border-[#7BE9C6] bg-gradient-to-br from-[#1620E4] to-[#0f14a0] shadow-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="flex gap-1">
                    <span className="w-0.5 h-2.5 bg-white/90 rounded-full" />
                    <span className="w-0.5 h-2.5 bg-white/90 rounded-full" />
                  </span>
                </span>
              </TwentyFirstImageComparison.Slider>
            </TwentyFirstImageComparison>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-4 text-sm text-neutral-400">
            <p>
              Source credit:{' '}
              <a
                href="https://21st.dev/@ibelick/components/image-comparison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7BE9C6] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7BE9C6] rounded"
              >
                21st.dev Image Comparison
              </a>
              {' · '}Motion Primitives · MIT License
            </p>
          </div>

          <PropTable data={propsData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstImageComparison} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
