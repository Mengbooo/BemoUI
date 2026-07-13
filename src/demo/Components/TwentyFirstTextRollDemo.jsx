import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextRoll from '../../content/Components/TwentyFirstTextRoll/TwentyFirstTextRoll';
import { twentyFirstTextRoll } from '../../constants/code/Components/twentyFirstTextRollCode';

const props = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to animate (letter by letter).',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.5',
    description: 'Duration of each letter animation in seconds.',
  },
  {
    name: 'getEnterDelay',
    type: '(index: number) => number',
    default: '(i) => i * 0.1',
    description: 'Function returning enter animation delay for each letter index.',
  },
  {
    name: 'getExitDelay',
    type: '(index: number) => number',
    default: '(i) => i * 0.1 + 0.2',
    description: 'Function returning exit animation delay for each letter index.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional CSS class names for the root element.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: "{ ease: 'easeIn' }",
    description: 'Framer Motion transition options applied to each letter.',
  },
  {
    name: 'variants',
    type: 'TextRollVariants',
    default: 'default rotateX enter/exit',
    description: 'Custom enter/exit initial & animate targets for the 3D roll.',
  },
  {
    name: 'onAnimationComplete',
    type: '() => void',
    default: 'undefined',
    description: 'Callback fired when the last letter finishes its exit animation.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'span'",
    description: 'Polymorphic root element type (e.g. "h1", "p", "button").',
  },
];

export default function TwentyFirstTextRollDemo() {
  const [key, setKey] = useState(0);
  const [phrase, setPhrase] = useState('BemoUI Text Roll');

  const replay = () => setKey((k) => k + 1);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            padding: '3rem 1.5rem',
            minHeight: '420px',
            background: 'linear-gradient(160deg, #f8fafc 0%, #eef2ff 50%, #f0fdf9 100%)',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                margin: '0 0 0.75rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#64748b',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              3D Letter Roll
            </p>
            <TwentyFirstTextRoll
              key={key}
              as="h1"
              className="bemo-21st-text-roll--accent"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
              duration={0.45}
              getEnterDelay={(i) => i * 0.08}
              getExitDelay={(i) => i * 0.08 + 0.15}
              onAnimationComplete={() => {
                /* optional: could auto-replay or log */
              }}
            >
              {phrase}
            </TwentyFirstTextRoll>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={replay}
              style={{
                appearance: 'none',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#ffffff',
                background: '#1620E4',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(22, 32, 228, 0.35)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.97)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Replay animation
            </button>
            <button
              type="button"
              onClick={() => {
                setPhrase((p) =>
                  p === 'BemoUI Text Roll' ? 'Motion Primitives' : 'BemoUI Text Roll'
                );
                setKey((k) => k + 1);
              }}
              style={{
                appearance: 'none',
                border: '1px solid #cbd5e1',
                borderRadius: '9999px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#0f172a',
                background: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Toggle phrase
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              width: '100%',
              maxWidth: '640px',
              marginTop: '0.5rem',
            }}
          >
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                background: '#0a0a0a',
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              <TwentyFirstTextRoll
                key={`dark-${key}`}
                className="bemo-21st-text-roll--dark"
                duration={0.4}
                getEnterDelay={(i) => i * 0.06}
                getExitDelay={(i) => i * 0.06 + 0.12}
              >
                Dark surface
              </TwentyFirstTextRoll>
            </div>
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                background: '#1620E4',
                color: '#7BE9C6',
                textAlign: 'center',
              }}
            >
              <TwentyFirstTextRoll
                key={`mint-${key}`}
                className="bemo-21st-text-roll--mint"
                duration={0.4}
                getEnterDelay={(i) => i * 0.06}
                getExitDelay={(i) => i * 0.06 + 0.12}
              >
                Mint accent
              </TwentyFirstTextRoll>
            </div>
          </div>

          <p
            style={{
              margin: '1.5rem 0 0',
              fontSize: '0.8rem',
              color: '#64748b',
              textAlign: 'center',
              maxWidth: '36rem',
              lineHeight: 1.5,
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-roll"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              21st.dev Text Roll
            </a>{' '}
            by Motion Primitives · MIT License
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <PropTable data={props} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextRoll} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
