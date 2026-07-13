import { useState, useEffect } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextMorph from '../../content/Components/TwentyFirstTextMorph/TwentyFirstTextMorph';
import { twentyFirstTextMorph } from '../../constants/code/Components/twentyFirstTextMorphCode';

const phrases = [
  'BemoUI Text Morph',
  'Smooth character layout',
  'Motion Primitives',
  'Accessible by default',
  'Spring-driven transitions',
];

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to morph character-by-character.',
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
    description: 'Additional CSS class names for the root.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: 'Inline styles applied to the root element.',
  },
  {
    name: 'variants',
    type: 'Variants',
    default: '{ opacity 0→1 }',
    description: 'Framer Motion variants for enter/exit of each character.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: 'spring 280/18/0.3',
    description: 'Framer Motion transition for character animations.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables morph animation and reduces visual emphasis.',
  },
];

const TwentyFirstTextMorphDemo = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '1.5rem',
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              background: 'linear-gradient(160deg, #ffffff 0%, #f8fafc 55%, #ecfdf5 100%)',
              padding: '2.5rem 1.75rem',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              boxShadow: '0 10px 40px rgba(22, 32, 228, 0.06)',
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1620E4',
              }}
            >
              Live morph
            </span>
            <TwentyFirstTextMorph
              as="h2"
              className="bemo-21st-text-morph--accent"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: 700,
                textAlign: 'center',
                minHeight: '1.3em',
              }}
            >
              {phrases[index]}
            </TwentyFirstTextMorph>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {phrases.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setPaused(true);
                  }}
                  style={{
                    border: i === index ? '1px solid #1620E4' : '1px solid #e5e7eb',
                    background: i === index ? '#1620E4' : '#fff',
                    color: i === index ? '#fff' : '#374151',
                    borderRadius: 999,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              style={{
                marginTop: 4,
                border: 'none',
                background: '#7BE9C6',
                color: '#0a0a0a',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {paused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                background: '#0a0a0a',
                padding: '1.25rem',
                color: '#fff',
              }}
            >
              <p style={{ margin: '0 0 8px', fontSize: 12, color: '#9ca3af' }}>On dark</p>
              <TwentyFirstTextMorph
                as="p"
                className="bemo-21st-text-morph--on-dark"
                style={{ fontSize: '1.125rem', fontWeight: 600 }}
              >
                {phrases[index]}
              </TwentyFirstTextMorph>
            </div>
            <div
              style={{
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                background: '#fff',
                padding: '1.25rem',
              }}
            >
              <p style={{ margin: '0 0 8px', fontSize: 12, color: '#6b7280' }}>Mint accent</p>
              <TwentyFirstTextMorph
                as="p"
                className="bemo-21st-text-morph--mint"
                style={{ fontSize: '1.125rem', fontWeight: 600 }}
              >
                {phrases[(index + 1) % phrases.length]}
              </TwentyFirstTextMorph>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: '#6b7280',
              lineHeight: 1.5,
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-morph"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              Text Morph
            </a>{' '}
            from Motion Primitives · MIT License.
          </p>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextMorph} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstTextMorphDemo;
