import { useState } from 'react';
import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextScramble from '../../content/Components/TwentyFirstTextScramble/TwentyFirstTextScramble';
import { twentyFirstTextScramble } from '../../constants/code/Components/twentyFirstTextScrambleCode';

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The final text content to reveal after scrambling.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.8',
    description: 'Total scramble duration in seconds.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.04',
    description: 'Interval between scramble frames in seconds.',
  },
  {
    name: 'characterSet',
    type: 'string',
    default: 'A–Z a–z 0–9',
    description: 'Characters used while scrambling.',
  },
  {
    name: 'as',
    type: 'React.ElementType',
    default: "'p'",
    description: 'Polymorphic root element (e.g. h1, span, div).',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names.',
  },
  {
    name: 'trigger',
    type: 'boolean',
    default: 'true',
    description: 'When true (or toggled), starts the scramble animation.',
  },
  {
    name: 'onScrambleComplete',
    type: '() => void',
    default: 'undefined',
    description: 'Callback fired when the scramble finishes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and skips animation.',
  },
];

export default function TwentyFirstTextScrambleDemo() {
  const [trigger, setTrigger] = useState(true);
  const [completeCount, setCompleteCount] = useState(0);

  const handleReplay = () => {
    setTrigger(false);
    requestAnimationFrame(() => setTrigger(true));
  };

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '2rem',
            maxWidth: 720,
            margin: '0 auto',
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          }}
        >
          <header style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p
              style={{
                margin: 0,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6b7280',
                fontWeight: 600,
              }}
            >
              Text effect · BemoUI
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 700,
                color: '#0a0a0a',
              }}
            >
              TwentyFirst Text Scramble
            </h1>
            <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
              Progressive character reveal with random intermediate glyphs.
              Toggle or replay to re-run the scramble. Respects reduced motion.
            </p>
          </header>

          <section
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: '1.5rem',
              background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <TwentyFirstTextScramble
                as="h2"
                trigger={trigger}
                duration={1}
                speed={0.035}
                onScrambleComplete={() =>
                  setCompleteCount((c) => c + 1)
                }
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 600,
                }}
              >
                Build interfaces that feel alive
              </TwentyFirstTextScramble>
            </div>

            <TwentyFirstTextScramble
              as="p"
              trigger={trigger}
              duration={1.2}
              speed={0.04}
              style={{ fontSize: '1rem', color: '#374151' }}
            >
              Motion Primitives style scramble for headlines, status lines, and
              terminal-inspired UI.
            </TwentyFirstTextScramble>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1.5rem',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                onClick={handleReplay}
                style={{
                  appearance: 'none',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.6rem 1.1rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  background: '#1620E4',
                  color: '#ffffff',
                }}
              >
                Replay scramble
              </button>
              <button
                type="button"
                onClick={() => setTrigger((t) => !t)}
                style={{
                  appearance: 'none',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  padding: '0.6rem 1.1rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  background: '#ffffff',
                  color: '#111827',
                }}
              >
                Trigger: {String(trigger)}
              </button>
              <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                Completions: {completeCount}
              </span>
            </div>
          </section>

          <section
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            }}
          >
            <div
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: '1rem',
                background: '#0a0a0a',
                color: '#f5f5f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 0.5rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#7BE9C6',
                }}
              >
                Status
              </p>
              <TwentyFirstTextScramble
                as="span"
                trigger={trigger}
                duration={0.7}
                characterSet="01"
                style={{ fontSize: '0.95rem', color: '#7BE9C6' }}
              >
                SYSTEM_READY
              </TwentyFirstTextScramble>
            </div>
            <div
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: '1rem',
                background: '#ffffff',
              }}
            >
              <p
                style={{
                  margin: '0 0 0.5rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                }}
              >
                Hex set
              </p>
              <TwentyFirstTextScramble
                as="span"
                trigger={trigger}
                duration={0.9}
                characterSet="0123456789ABCDEF"
                style={{ fontSize: '0.95rem' }}
              >
                DEADBEEF
              </TwentyFirstTextScramble>
            </div>
          </section>

          <p
            style={{
              margin: 0,
              fontSize: '0.8125rem',
              color: '#6b7280',
              lineHeight: 1.5,
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-scramble"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              Text Scramble on 21st.dev
            </a>
            {' · '}
            Motion Primitives · MIT License
          </p>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextScramble} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
