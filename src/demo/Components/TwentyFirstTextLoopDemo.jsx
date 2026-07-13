import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextLoop from '../../content/Components/TwentyFirstTextLoop/TwentyFirstTextLoop';
import { twentyFirstTextLoop } from '../../constants/code/Components/twentyFirstTextLoopCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode[]',
    default: '—',
    description: 'Array of text nodes or elements to cycle through.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names for the root element.',
  },
  {
    name: 'interval',
    type: 'number',
    default: '2',
    description: 'Seconds between text changes.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: '{ duration: 0.3 }',
    description: 'Framer Motion transition for enter/exit.',
  },
  {
    name: 'variants',
    type: 'Variants',
    default: 'slide + fade',
    description: 'Custom Motion variants (initial / animate / exit).',
  },
  {
    name: 'onIndexChange',
    type: '(index: number) => void',
    default: 'undefined',
    description: 'Callback fired when the active index changes.',
  },
  {
    name: 'trigger',
    type: 'boolean',
    default: 'true',
    description: 'When false, auto-cycling is paused.',
  },
  {
    name: 'mode',
    type: "AnimatePresence mode",
    default: "'popLayout'",
    description: 'AnimatePresence mode (sync | wait | popLayout).',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'Polymorphic root element type.',
  },
];

export default function TwentyFirstTextLoopDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            padding: '2rem 1rem',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
                color: '#0a0a0a',
              }}
            >
              TwentyFirstTextLoop
            </h2>
            <p style={{ color: '#525252', fontSize: '1rem', lineHeight: 1.6 }}>
              Smooth rotating text for headlines, CTAs, and status lines — powered
              by Framer Motion with reduced-motion support.
            </p>
          </header>

          {/* Hero-style example */}
          <section
            style={{
              background: 'linear-gradient(145deg, #f8fafc 0%, #eef2ff 100%)',
              borderRadius: '16px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.35rem, 3.5vw, 2rem)',
                fontWeight: 600,
                color: '#171717',
                margin: 0,
              }}
            >
              Build{' '}
              <TwentyFirstTextLoop
                as="span"
                className="bemo-21st-text-loop--accent-primary"
                interval={2.2}
                style={{ color: '#1620E4', fontWeight: 700 }}
              >
                <span>faster</span>
                <span>smarter</span>
                <span>together</span>
                <span>with BemoUI</span>
              </TwentyFirstTextLoop>
            </p>
            <p
              style={{
                marginTop: '1rem',
                color: '#64748b',
                fontSize: '0.95rem',
              }}
            >
              Default slide + fade · 2.2s interval
            </p>
          </section>

          {/* Accent secondary + images */}
          <section
            style={{
              display: 'grid',
              gap: '1.25rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            }}
          >
            <div
              style={{
                background: '#0a0a0a',
                color: '#fafafa',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <img
                src="/assets/demo/cs1.webp"
                alt=""
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
                We ship{' '}
                <TwentyFirstTextLoop
                  as="span"
                  interval={1.8}
                  style={{ color: '#7BE9C6' }}
                  aria-label="Shipping status"
                >
                  <span>components</span>
                  <span>motion</span>
                  <span>polish</span>
                </TwentyFirstTextLoop>
              </p>
            </div>

            <div
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <img
                src="/assets/demo/cs2.webp"
                alt=""
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500, color: '#171717' }}>
                Status:{' '}
                <TwentyFirstTextLoop
                  as="span"
                  interval={2.5}
                  mode="wait"
                  style={{ color: '#1620E4' }}
                >
                  <span>Online</span>
                  <span>Syncing</span>
                  <span>Ready</span>
                </TwentyFirstTextLoop>
              </p>
            </div>
          </section>

          {/* Custom variants example */}
          <section
            style={{
              textAlign: 'center',
              padding: '1.5rem',
              borderRadius: '12px',
              background: '#f5f5f5',
            }}
          >
            <p style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: '#0a0a0a' }}>
              Custom variants ·{' '}
              <TwentyFirstTextLoop
                as="span"
                interval={2}
                variants={{
                  initial: { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
                  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
                  exit: { opacity: 0, scale: 1.05, filter: 'blur(4px)' },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ color: '#1620E4' }}
              >
                <span>Design</span>
                <span>Develop</span>
                <span>Deploy</span>
              </TwentyFirstTextLoop>
            </p>
          </section>

          <footer
            style={{
              fontSize: '0.8125rem',
              color: '#737373',
              textAlign: 'center',
              lineHeight: 1.6,
              borderTop: '1px solid #e5e7eb',
              paddingTop: '1.25rem',
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-loop"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Text Loop
            </a>{' '}
            by Motion Primitives · MIT License
          </footer>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextLoop} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
