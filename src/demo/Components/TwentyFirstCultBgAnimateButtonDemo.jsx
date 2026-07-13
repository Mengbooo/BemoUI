import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultBgAnimateButton from '../../content/Components/TwentyFirstCultBgAnimateButton/TwentyFirstCultBgAnimateButton';
import { twentyFirstCultBgAnimateButton } from '../../constants/code/Components/twentyFirstCultBgAnimateButtonCode';

const propData = [
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '"Button"',
    description: 'Button label or content.',
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description: 'Controls padding and font size.',
  },
  {
    name: 'rounded',
    type: "'full' | 'xl' | '2xl' | '3xl' | 'sm' | 'xs' | 'base'",
    default: "'xl'",
    description: 'Border radius of the button and gradient.',
  },
  {
    name: 'shadow',
    type: "'flat' | 'soft' | 'base' | 'deep' | 'deeper'",
    default: "'base'",
    description: 'Inset and drop shadow intensity.',
  },
  {
    name: 'animation',
    type: "'spin' | 'pulse' | 'spin-slow' | 'spin-fast' | null",
    default: "'spin'",
    description: 'Background animation style. Respects prefers-reduced-motion.',
  },
  {
    name: 'gradient',
    type: "'bemo' | 'default' | 'sunrise' | 'ocean' | 'candy' | 'forest' | 'sunset' | 'nebula' | null",
    default: "'bemo'",
    description: 'Conic gradient theme. "bemo" uses #1620E4 and #7BE9C6. Null disables animated background.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Merge props onto the child element instead of rendering a button.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and reduces opacity.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional classes for the root element.',
  },
];

const TwentyFirstCultBgAnimateButtonDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="flex flex-col gap-10 p-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              BG Animate Button
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Spinning conic-gradient background button with multiple sizes, shadows, radii, and themes.
              Default accents use BemoUI colors #1620E4 and #7BE9C6.
            </p>
            <p className="text-sm text-neutral-500">
              Source:{' '}
              <a
                href="https://21st.dev/@cult-ui/components/bg-animated-button"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1620E4] underline underline-offset-2 hover:text-[#7BE9C6]"
              >
                Cult UI – BG Animated Button
              </a>{' '}
              · MIT License
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Default (Bemo accents)
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <TwentyFirstCultBgAnimateButton>Get started</TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton size="sm" rounded="full">
                Small
              </TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton size="lg" shadow="deeper">
                Large deep
              </TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton disabled>Disabled</TwentyFirstCultBgAnimateButton>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Gradients
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <TwentyFirstCultBgAnimateButton gradient="bemo">Bemo</TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton gradient="forest">Forest</TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton gradient="sunset">Sunset</TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton gradient="nebula">Nebula</TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton gradient="ocean">Ocean</TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton gradient="candy">Candy</TwentyFirstCultBgAnimateButton>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Animations & Shapes
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <TwentyFirstCultBgAnimateButton animation="spin-fast" rounded="full">
                Spin fast
              </TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton animation="spin-slow" rounded="3xl" shadow="soft">
                Spin slow
              </TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton animation="pulse" gradient="default">
                Pulse
              </TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton gradient={null} className="bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                No gradient
              </TwentyFirstCultBgAnimateButton>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Interactive example
            </h3>
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
              <TwentyFirstCultBgAnimateButton
                onClick={() => alert('Primary action')}
                aria-label="Confirm selection"
              >
                Confirm
              </TwentyFirstCultBgAnimateButton>
              <TwentyFirstCultBgAnimateButton
                gradient="sunset"
                rounded="full"
                size="sm"
                onClick={() => alert('Secondary')}
              >
                Secondary
              </TwentyFirstCultBgAnimateButton>
            </div>
          </section>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultBgAnimateButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCultBgAnimateButtonDemo;
