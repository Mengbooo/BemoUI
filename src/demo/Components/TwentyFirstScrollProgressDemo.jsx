import { useRef } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstScrollProgress from '../../content/Components/TwentyFirstScrollProgress/TwentyFirstScrollProgress';
import { twentyFirstScrollProgress } from '../../constants/code/Components/twentyFirstScrollProgressCode';

const propsData = [
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the progress bar.',
  },
  {
    name: 'springOptions',
    type: 'SpringOptions',
    default: '{ stiffness: 200, damping: 50, restDelta: 0.001 }',
    description: 'Framer Motion spring configuration for the scale animation.',
  },
  {
    name: 'containerRef',
    type: 'RefObject<HTMLElement>',
    default: 'undefined',
    description: 'Optional ref to a scrollable container. Defaults to document/window scroll.',
  },
  {
    name: 'color',
    type: 'string',
    default: "'#1620E4'",
    description: 'Background color of the progress indicator.',
  },
  {
    name: 'height',
    type: 'number | string',
    default: '4',
    description: 'Height of the bar in pixels or CSS value.',
  },
  {
    name: 'position',
    type: "'top' | 'bottom'",
    default: "'top'",
    description: 'Fixed position of the progress bar.',
  },
  {
    name: 'zIndex',
    type: 'number',
    default: '50',
    description: 'CSS z-index of the progress bar.',
  },
];

export default function TwentyFirstScrollProgressDemo() {
  const containerRef = useRef(null);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="relative w-full max-w-3xl mx-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
          <TwentyFirstScrollProgress
            containerRef={containerRef}
            color="#1620E4"
            height={4}
            position="top"
            springOptions={{ stiffness: 180, damping: 40 }}
          />

          <div
            ref={containerRef}
            className="h-[420px] overflow-y-auto p-6 sm:p-8 space-y-8 scroll-smooth"
            style={{ scrollbarGutter: 'stable' }}
          >
            <header className="space-y-3">
              <p className="text-xs font-medium tracking-wide uppercase text-[#1620E4]">
                BemoUI · Scroll Progress
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                Reading progress indicator
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Scroll this container to see the spring-animated progress bar at the top.
                The indicator tracks scroll position with a smooth spring for a polished feel.
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <img
                  src="/assets/demo/cs1.webp"
                  alt="Demo visual one"
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 text-sm text-neutral-600 dark:text-neutral-400">
                  Smooth spring progress
                </figcaption>
              </figure>
              <figure className="rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <img
                  src="/assets/demo/cs2.webp"
                  alt="Demo visual two"
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 text-sm text-neutral-600 dark:text-neutral-400">
                  Container-aware tracking
                </figcaption>
              </figure>
            </div>

            <section className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                How it works
              </h3>
              <p>
                TwentyFirstScrollProgress uses Framer Motion&apos;s useScroll and useSpring
                to map scroll progress to a scaleX transform. Pass a containerRef to track
                an element instead of the window.
              </p>
              <p>
                Accent colors default to BemoUI brand blues and mints (#1620E4 / #7BE9C6).
                The bar is non-interactive by default, uses semantic progressbar ARIA, and
                respects prefers-reduced-motion via Motion.
              </p>
              <p>
                Continue scrolling to fill the bar completely. You can customize spring
                stiffness, damping, color, height, and position via props.
              </p>
            </section>

            <section className="rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-100 dark:border-neutral-800 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#7BE9C6' }}
                />
                Tips
              </h3>
              <ul className="text-sm space-y-2 text-neutral-600 dark:text-neutral-400 list-disc list-inside">
                <li>Use position=&quot;bottom&quot; for bottom-fixed indicators.</li>
                <li>Tweak springOptions for snappier or softer motion.</li>
                <li>Works with both page scroll and nested overflow containers.</li>
              </ul>
            </section>

            <div className="h-24" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <PropTable data={propsData} />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Source credit:{' '}
          <a
            href="https://21st.dev/@ibelick/components/scroll-progress"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#1620E4]/30 hover:decoration-[#1620E4] text-[#1620E4] dark:text-[#7BE9C6]"
          >
            21st.dev Scroll Progress
          </a>
          {' '}· Motion Primitives · MIT License
        </p>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstScrollProgress} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
