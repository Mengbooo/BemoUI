import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstAnimatedBackground from '../../content/Components/TwentyFirstAnimatedBackground/TwentyFirstAnimatedBackground';
import { twentyFirstAnimatedBackground } from '../../constants/code/Components/twentyFirstAnimatedBackgroundCode';

const props = [
  {
    name: 'children',
    type: 'ReactElement | ReactElement[]',
    default: '—',
    description: 'Child elements each requiring a unique data-id prop. The animated background slides between them.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    description: 'Initial active data-id (uncontrolled).',
  },
  {
    name: 'value',
    type: 'string | null',
    default: 'undefined',
    description: 'Controlled active data-id.',
  },
  {
    name: 'onValueChange',
    type: '(id: string | null) => void',
    default: 'undefined',
    description: 'Callback when the active id changes.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Extra classes applied to the animated background element (e.g. background color, radius).',
  },
  {
    name: 'transition',
    type: 'Transition (framer-motion)',
    default: 'spring { stiffness: 300, damping: 30 }',
    description: 'Motion transition for the shared layout background.',
  },
  {
    name: 'enableHover',
    type: 'boolean',
    default: 'false',
    description: 'If true, activate on hover/focus instead of click.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and dims items.',
  },
];

export default function TwentyFirstAnimatedBackgroundDemo() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeHover, setActiveHover] = useState(null);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="space-y-12 p-6 max-w-3xl mx-auto">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Click tabs (default)</h3>
            <p className="text-sm text-neutral-600">Click an item to move the shared animated background. Keyboard: Enter / Space.</p>
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-neutral-100 border border-neutral-200">
              <TwentyFirstAnimatedBackground
                defaultValue="home"
                value={activeTab}
                onValueChange={(id) => id && setActiveTab(id)}
                className="bg-[#1620E4] rounded-lg"
              >
                <button
                  type="button"
                  data-id="home"
                  className="px-4 py-2 text-sm font-medium text-white data-[checked=false]:text-neutral-700 rounded-lg"
                >
                  Home
                </button>
                <button
                  type="button"
                  data-id="features"
                  className="px-4 py-2 text-sm font-medium text-white data-[checked=false]:text-neutral-700 rounded-lg"
                >
                  Features
                </button>
                <button
                  type="button"
                  data-id="pricing"
                  className="px-4 py-2 text-sm font-medium text-white data-[checked=false]:text-neutral-700 rounded-lg"
                >
                  Pricing
                </button>
                <button
                  type="button"
                  data-id="about"
                  className="px-4 py-2 text-sm font-medium text-white data-[checked=false]:text-neutral-700 rounded-lg"
                >
                  About
                </button>
              </TwentyFirstAnimatedBackground>
            </div>
            <p className="text-xs text-neutral-500">Active: <span className="font-mono text-[#1620E4]">{activeTab}</span></p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Hover cards</h3>
            <p className="text-sm text-neutral-600">Hover or focus items for a mint accent background.</p>
            <div className="flex flex-wrap gap-2">
              <TwentyFirstAnimatedBackground
                enableHover
                onValueChange={setActiveHover}
                className="bg-[#7BE9C6] rounded-xl"
              >
                <div
                  data-id="design"
                  className="px-5 py-3 rounded-xl border border-neutral-200 bg-white shadow-sm min-w-[120px]"
                >
                  <span className="font-medium text-neutral-900">Design</span>
                  <p className="text-xs text-neutral-500 mt-0.5">Craft UI</p>
                </div>
                <div
                  data-id="build"
                  className="px-5 py-3 rounded-xl border border-neutral-200 bg-white shadow-sm min-w-[120px]"
                >
                  <span className="font-medium text-neutral-900">Build</span>
                  <p className="text-xs text-neutral-500 mt-0.5">Ship fast</p>
                </div>
                <div
                  data-id="scale"
                  className="px-5 py-3 rounded-xl border border-neutral-200 bg-white shadow-sm min-w-[120px]"
                >
                  <span className="font-medium text-neutral-900">Scale</span>
                  <p className="text-xs text-neutral-500 mt-0.5">Grow</p>
                </div>
              </TwentyFirstAnimatedBackground>
            </div>
            {activeHover && (
              <p className="text-xs text-neutral-500">Hovering: <span className="font-mono text-[#7BE9C6]">{activeHover}</span></p>
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">With imagery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TwentyFirstAnimatedBackground
                defaultValue="cs1"
                className="bg-[#1620E4]/10 rounded-2xl ring-2 ring-[#1620E4]"
              >
                <button
                  type="button"
                  data-id="cs1"
                  className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left w-full"
                >
                  <img
                    src="/assets/demo/cs1.webp"
                    alt="Case study one"
                    className="h-28 w-full object-cover"
                  />
                  <span className="p-3 text-sm font-medium text-neutral-900">Case Study A</span>
                </button>
                <button
                  type="button"
                  data-id="cs2"
                  className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left w-full"
                >
                  <img
                    src="/assets/demo/cs2.webp"
                    alt="Case study two"
                    className="h-28 w-full object-cover"
                  />
                  <span className="p-3 text-sm font-medium text-neutral-900">Case Study B</span>
                </button>
                <button
                  type="button"
                  data-id="cs3"
                  className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left w-full"
                >
                  <img
                    src="/assets/demo/cs3.webp"
                    alt="Case study three"
                    className="h-28 w-full object-cover"
                  />
                  <span className="p-3 text-sm font-medium text-neutral-900">Case Study C</span>
                </button>
              </TwentyFirstAnimatedBackground>
            </div>
          </section>

          <footer className="pt-6 border-t border-neutral-200 text-sm text-neutral-500">
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/animated-background"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1620E4] underline underline-offset-2 hover:text-[#1620E4]/80"
            >
              21st.dev Animated Background
            </a>{' '}
            · Motion Primitives · MIT License
          </footer>
        </div>

        <div className="mt-8">
          <PropTable data={props} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstAnimatedBackground} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
