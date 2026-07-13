import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstSpinningText from '../../content/Components/TwentyFirstSpinningText/TwentyFirstSpinningText';
import { twentyFirstSpinningText } from '../../constants/code/Components/twentyFirstSpinningTextCode';

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text string to spin around the circle.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '10',
    description: 'Duration of one full rotation in seconds.',
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: 'Reverse the spin direction (counter-clockwise).',
  },
  {
    name: 'fontSize',
    type: 'number',
    default: '1',
    description: 'Font size multiplier in rem units.',
  },
  {
    name: 'radius',
    type: 'number',
    default: '5',
    description: 'Radius of the circular path in ch units.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional CSS class names for the container.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '—',
    description: 'Inline styles for the container.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: '{ repeat: Infinity, ease: "linear" }',
    description: 'Framer Motion transition overrides.',
  },
  {
    name: 'variants',
    type: '{ container?: Variants; item?: Variants }',
    default: '—',
    description: 'Custom Framer Motion variants for container and items.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable animation and show static text.',
  },
];

const TwentyFirstSpinningTextDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="flex flex-col items-center gap-12 py-12 px-4 w-full max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
              TwentyFirstSpinningText
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              Circular spinning text animation powered by Framer Motion. Ideal for badges, loaders, or decorative labels.
            </p>
          </div>

          <div className="relative flex items-center justify-center w-full min-h-[280px] rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 40%, #1620E4 0%, transparent 45%), radial-gradient(circle at 70% 60%, #7BE9C6 0%, transparent 40%)',
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 py-10">
              <TwentyFirstSpinningText
                duration={12}
                radius={5.5}
                fontSize={1.1}
                className="text-[#1620E4]"
              >
                BEMO • UI • SPIN •
              </TwentyFirstSpinningText>

              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#7BE9C6]/60 shadow-lg shadow-[#1620E4]/10">
                <img
                  src="/assets/demo/cs1.webp"
                  alt="Demo product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <TwentyFirstSpinningText
                    duration={8}
                    radius={6.2}
                    fontSize={0.7}
                    reverse
                    className="text-white drop-shadow-md"
                    style={{ color: '#7BE9C6' }}
                  >
                    NEW • DROP • 2025 •
                  </TwentyFirstSpinningText>
                </div>
              </div>

              <TwentyFirstSpinningText
                duration={15}
                radius={4.8}
                fontSize={0.95}
                reverse
                className="text-neutral-800 dark:text-neutral-100"
              >
                MOTION • PRIMITIVES •
              </TwentyFirstSpinningText>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <TwentyFirstSpinningText duration={6} radius={4} fontSize={0.85} className="text-[#1620E4]">
                FAST • SPIN •
              </TwentyFirstSpinningText>
              <span className="text-sm text-neutral-500">Fast (6s)</span>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <TwentyFirstSpinningText duration={10} radius={4} fontSize={0.85} className="text-[#7BE9C6]">
                DEFAULT •
              </TwentyFirstSpinningText>
              <span className="text-sm text-neutral-500">Default (10s)</span>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <TwentyFirstSpinningText disabled className="text-neutral-600">
                Disabled state
              </TwentyFirstSpinningText>
              <span className="text-sm text-neutral-500">Disabled / reduced-motion</span>
            </div>
          </div>

          <div className="w-full pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <PropTable data={propData} />
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/spinning-text"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1620E4] hover:underline font-medium"
            >
              21st.dev Spinning Text
            </a>{' '}
            by Motion Primitives · MIT License
          </p>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstSpinningText} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstSpinningTextDemo;
