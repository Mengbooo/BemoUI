import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstInView from '../../content/Components/TwentyFirstInView/TwentyFirstInView';
import { twentyFirstInView } from '../../constants/code/Components/twentyFirstInViewCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Content to animate when entering the viewport.',
  },
  {
    name: 'variants',
    type: '{ hidden: Variant; visible: Variant }',
    default: '{ hidden: { opacity: 0 }, visible: { opacity: 1 } }',
    description: 'Framer Motion variants for hidden and visible states.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: 'undefined',
    description: 'Framer Motion transition configuration.',
  },
  {
    name: 'viewOptions',
    type: 'UseInViewOptions',
    default: '{ amount: 0.2, margin: "0px" }',
    description: 'Options passed to useInView (amount, margin, root, etc.).',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'HTML element or component to render as the motion wrapper.',
  },
  {
    name: 'once',
    type: 'boolean',
    default: 'false',
    description: 'If true, animation plays only once and stays visible thereafter.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the wrapper.',
  },
];

const DemoSection = ({ title, children }) => (
  <section className="mb-16">
    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
    {children}
  </section>
);

export default function TwentyFirstInViewDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              TwentyFirstInView
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Animate elements into view as they enter the viewport. Built with Framer Motion for
              smooth, accessible entrance animations. Supports once-mode, custom variants, and
              reduced-motion preferences.
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              Source:{' '}
              <a
                href="https://21st.dev/@ibelick/components/in-view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1620E4] hover:underline"
              >
                21st.dev / Motion Primitives
              </a>{' '}
              · MIT License
            </p>
          </div>

          <DemoSection title="Basic Fade In">
            <div className="space-y-6">
              <TwentyFirstInView
                once
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Welcome to the viewport
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  This card fades in when it scrolls into view. The animation runs only once.
                </p>
              </TwentyFirstInView>
            </div>
          </DemoSection>

          <DemoSection title="Slide Up with Custom Variants">
            <div className="grid gap-6 md:grid-cols-2">
              <TwentyFirstInView
                once
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
              >
                <img
                  src="/assets/demo/cs1.webp"
                  alt="Demo image 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Card One</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Slides up from below as it enters the viewport.
                  </p>
                </div>
              </TwentyFirstInView>

              <TwentyFirstInView
                once
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
              >
                <img
                  src="/assets/demo/cs2.webp"
                  alt="Demo image 2"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Card Two</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Slight delay creates a staggered entrance effect.
                  </p>
                </div>
              </TwentyFirstInView>
            </div>
          </DemoSection>

          <DemoSection title="Scale + Fade (Staggered List)">
            <ul className="space-y-4">
              {['First item', 'Second item', 'Third item', 'Fourth item'].map((item, i) => (
                <TwentyFirstInView
                  key={item}
                  once
                  as="li"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewOptions={{ amount: 0.5 }}
                  className="list-none p-4 rounded-lg bg-[#1620E4]/5 border border-[#1620E4]/20 text-gray-900 dark:text-white"
                >
                  <span className="font-medium text-[#1620E4]">{item}</span>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    — scales and fades in with stagger
                  </span>
                </TwentyFirstInView>
              ))}
            </ul>
          </DemoSection>

          <DemoSection title="Custom Accent Card">
            <TwentyFirstInView
              once
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#1620E4] to-[#0f1599] text-white shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7BE9C6] flex items-center justify-center text-[#1620E4] font-bold text-xl shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Accent Highlight</h4>
                  <p className="text-white/90">
                    Uses brand colors #1620E4 and #7BE9C6. Spring physics for a natural feel.
                    Scroll this into view to see the slide-from-left entrance.
                  </p>
                </div>
              </div>
            </TwentyFirstInView>
          </DemoSection>

          <DemoSection title="Image Gallery Entrance">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['/assets/demo/cs1.webp', '/assets/demo/cs2.webp', '/assets/demo/cs3.webp'].map(
                (src, i) => (
                  <TwentyFirstInView
                    key={src}
                    once
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800"
                  >
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </TwentyFirstInView>
                )
              )}
            </div>
          </DemoSection>

          <div className="mt-12 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">Tip:</strong> Scroll the page slowly
            to observe each section animate as it enters the viewport. Set{' '}
            <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">once</code> to keep
            the element visible after first animation. Reduced-motion preferences are respected.
          </div>
        </div>

        <div className="mt-12">
          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstInView} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
