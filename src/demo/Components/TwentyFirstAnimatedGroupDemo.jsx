import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstAnimatedGroup from '../../content/Components/TwentyFirstAnimatedGroup/TwentyFirstAnimatedGroup';
import { twentyFirstAnimatedGroup } from '../../constants/code/Components/twentyFirstAnimatedGroupCode';

const presets = [
  'fade',
  'slide',
  'scale',
  'blur',
  'blur-slide',
  'zoom',
  'flip',
  'bounce',
  'rotate',
  'swing',
];

const cards = [
  {
    title: 'Aurora Cards',
    description: 'Soft gradients with spring-driven entrance.',
    image: '/assets/demo/cs1.webp',
    accent: '#1620E4',
  },
  {
    title: 'Mint Motion',
    description: 'Clean layouts with staggered reveals.',
    image: '/assets/demo/cs2.webp',
    accent: '#7BE9C6',
  },
  {
    title: 'Neutral Grid',
    description: 'Accessible motion that respects reduced-motion.',
    image: '/assets/demo/cs3.webp',
    accent: '#111827',
  },
];

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Child elements that will animate in sequence.',
  },
  {
    name: 'preset',
    type: "'fade' | 'slide' | 'scale' | 'blur' | 'blur-slide' | 'zoom' | 'flip' | 'bounce' | 'rotate' | 'swing'",
    default: "'fade'",
    description: 'Built-in animation preset applied to each child.',
  },
  {
    name: 'variants',
    type: '{ container?: Variants; item?: Variants }',
    default: 'undefined',
    description: 'Override container and/or item Framer Motion variants.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'Polymorphic root element type for the group container.',
  },
  {
    name: 'asChild',
    type: 'ElementType',
    default: "'div'",
    description: 'Polymorphic element type wrapping each child.',
  },
  {
    name: 'stagger',
    type: 'number',
    default: '0.1',
    description: 'Stagger delay (seconds) between children.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the container.',
  },
];

const TwentyFirstAnimatedGroupDemo = () => {
  const [preset, setPreset] = useState('blur-slide');
  const [stagger, setStagger] = useState(0.12);
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            padding: '1.5rem',
            maxWidth: 960,
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <header style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              TwentyFirstAnimatedGroup
            </h2>
            <p style={{ margin: '0.5rem 0 0', color: '#4b5563', lineHeight: 1.5 }}>
              Staggered entrance animations for groups of children. Built on
              Framer Motion with accessible reduced-motion support.
            </p>
          </header>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#374151' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Preset</span>
              <select
                value={preset}
                onChange={(e) => {
                  setPreset(e.target.value);
                  replay();
                }}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  color: '#111827',
                  fontSize: 14,
                }}
              >
                {presets.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#374151' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Stagger</span>
              <input
                type="range"
                min={0}
                max={0.4}
                step={0.02}
                value={stagger}
                onChange={(e) => {
                  setStagger(Number(e.target.value));
                  replay();
                }}
                style={{ width: 120, accentColor: '#1620E4' }}
              />
              <span style={{ fontSize: 13, color: '#6b7280', minWidth: 36 }}>
                {stagger.toFixed(2)}s
              </span>
            </label>

            <button
              type="button"
              onClick={replay}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 8,
                border: 'none',
                background: '#1620E4',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Replay
            </button>
          </div>

          <TwentyFirstAnimatedGroup
            key={key}
            preset={preset}
            stagger={stagger}
            className="bemo-21st-animated-group--grid"
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            }}
          >
            {cards.map((card) => (
              <article
                key={card.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${card.accent}22, #f3f4f6)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={card.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3
                    style={{
                      margin: '0 0 0.35rem',
                      fontSize: '1.05rem',
                      fontWeight: 650,
                      color: '#111827',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: '#6b7280',
                      lineHeight: 1.45,
                    }}
                  >
                    {card.description}
                  </p>
                  <div
                    style={{
                      marginTop: '0.75rem',
                      height: 4,
                      width: 48,
                      borderRadius: 999,
                      background: card.accent,
                    }}
                  />
                </div>
              </article>
            ))}
          </TwentyFirstAnimatedGroup>

          <div
            style={{
              marginTop: '2rem',
              padding: '1rem 1.25rem',
              background: '#f9fafb',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: '#4b5563', lineHeight: 1.55 }}>
              <strong style={{ color: '#111827' }}>Source credit:</strong>{' '}
              Adapted from{' '}
              <a
                href="https://21st.dev/@ibelick/components/animated-group"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1620E4', fontWeight: 600 }}
              >
                Motion Primitives · Animated Group
              </a>{' '}
              by ibelick. MIT License.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <PropTable data={propData} />
          </div>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstAnimatedGroup} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstAnimatedGroupDemo;
