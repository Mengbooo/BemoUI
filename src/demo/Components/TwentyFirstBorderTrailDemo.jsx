import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstBorderTrail from '../../content/Components/TwentyFirstBorderTrail/TwentyFirstBorderTrail';
import { twentyFirstBorderTrail } from '../../constants/code/Components/twentyFirstBorderTrailCode';

const propsData = [
  {
    name: 'size',
    type: 'number',
    default: '60',
    description: 'Trail marker size in pixels; also sets the offset-path corner radius.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '5',
    description: 'Seconds per full loop when using the default linear transition.',
  },
  {
    name: 'color',
    type: 'string',
    default: "'#1620E4'",
    description: 'Primary trail color (Bemo accent blue).',
  },
  {
    name: 'trailColor',
    type: 'string',
    default: '—',
    description: 'Optional override for the trail fill; falls back to color.',
  },
  {
    name: 'borderWidth',
    type: 'number | string',
    default: '1',
    description: 'Width of the masked border channel that reveals the trail.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: '{ repeat: Infinity, duration, ease: "linear" }',
    description: 'framer-motion transition override for the offsetDistance animation.',
  },
  {
    name: 'onAnimationComplete',
    type: '() => void',
    default: '—',
    description: 'Callback fired when an animation cycle completes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables motion and dims the trail.',
  },
  {
    name: 'reducedMotionFallback',
    type: 'boolean',
    default: 'true',
    description: 'When true, prefers-reduced-motion shows a static marker instead of looping.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional classes on the root absolute wrapper.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '—',
    description: 'Inline styles applied to the trail marker element.',
  },
];

export default function TwentyFirstBorderTrailDemo() {
  const [size, setSize] = useState(48);
  const [duration, setDuration] = useState(5);
  const [disabled, setDisabled] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '1.5rem',
            maxWidth: 960,
            margin: '0 auto',
            color: '#f5f5f5',
            fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
          }}
        >
          <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              TwentyFirstBorderTrail
            </h2>
            <p style={{ margin: 0, color: '#a3a3a3', lineHeight: 1.55, maxWidth: 56 * 8 }}>
              A continuous glowing marker that travels the border of its parent using CSS offset-path.
              Drop it inside any relatively positioned, rounded container.
            </p>
          </header>

          {/* Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              alignItems: 'center',
              padding: '1rem 1.25rem',
              background: '#111',
              border: '1px solid #262626',
              borderRadius: 12,
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#d4d4d4' }}>
              Size ({size}px)
              <input
                type="range"
                min={24}
                max={96}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                style={{ accentColor: '#1620E4' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#d4d4d4' }}>
              Duration ({duration}s)
              <input
                type="range"
                min={2}
                max={12}
                step={0.5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{ accentColor: '#7BE9C6' }}
              />
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#d4d4d4',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                style={{ accentColor: '#1620E4', width: 16, height: 16 }}
              />
              Disabled
            </label>
          </div>

          {/* Card showcase */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#0a0a0a',
                border: '1px solid #262626',
                minHeight: 220,
              }}
            >
              <TwentyFirstBorderTrail
                size={size}
                duration={duration}
                disabled={disabled}
                color="#1620E4"
                borderWidth={2}
              />
              <div style={{ position: 'relative', zIndex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <img
                  src="/assets/demo/cs1.webp"
                  alt="Demo product preview"
                  style={{
                    width: '100%',
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 10,
                    background: '#171717',
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Aurora Card</div>
                  <div style={{ color: '#a3a3a3', fontSize: 13, marginTop: 4 }}>
                    Default blue trail with soft cyan glow.
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #0c0c0c 0%, #141414 100%)',
                border: '1px solid #333',
                minHeight: 220,
              }}
            >
              <TwentyFirstBorderTrail
                size={Math.max(32, size - 8)}
                duration={duration * 0.85}
                disabled={disabled}
                color="#7BE9C6"
                borderWidth={2}
                style={{
                  borderRadius: 9999,
                  filter: 'blur(0.5px)',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #1620E4, #7BE9C6)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#fff',
                  }}
                >
                  B
                </div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Mint accent</div>
                <p style={{ margin: 0, color: '#a3a3a3', fontSize: 13, lineHeight: 1.5 }}>
                  Swap <code style={{ color: '#7BE9C6' }}>color</code> to the secondary accent for a cooler trail.
                </p>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#0a0a0a',
                border: '1px solid #262626',
                gridColumn: '1 / -1',
                minHeight: 160,
              }}
            >
              <TwentyFirstBorderTrail
                size={size}
                duration={duration}
                disabled={disabled}
                color="#1620E4"
                trailColor="#7BE9C6"
                borderWidth={3}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <img
                  src="/assets/demo/cs2.webp"
                  alt="Secondary demo visual"
                  style={{
                    width: 96,
                    height: 96,
                    objectFit: 'cover',
                    borderRadius: 12,
                    background: '#171717',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>Wide feature strip</div>
                  <p style={{ margin: '6px 0 0', color: '#a3a3a3', fontSize: 13, lineHeight: 1.55 }}>
                    Parent needs <code style={{ color: '#e5e5e5' }}>position: relative</code> and a border-radius the
                    trail can inherit. The component is purely decorative (<code>aria-hidden</code>).
                  </p>
                </div>
                <button
                  type="button"
                  style={{
                    appearance: 'none',
                    border: 'none',
                    borderRadius: 999,
                    padding: '0.65rem 1.15rem',
                    background: '#1620E4',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>

          <PropTable data={propsData} />

          <footer
            style={{
              fontSize: 13,
              color: '#737373',
              lineHeight: 1.6,
              borderTop: '1px solid #262626',
              paddingTop: '1rem',
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/border-trail"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7BE9C6' }}
            >
              21st.dev border-trail
            </a>
            {' · '}Motion Primitives · MIT License
          </footer>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstBorderTrail} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
