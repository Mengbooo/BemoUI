import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstProgressiveBlur from '../../content/Components/TwentyFirstProgressiveBlur/TwentyFirstProgressiveBlur';
import { twentyFirstProgressiveBlur } from '../../constants/code/Components/twentyFirstProgressiveBlurCode';

const DIRECTIONS = ['top', 'right', 'bottom', 'left'];

const propData = [
  {
    name: 'direction',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: 'Gradient / blur falloff direction.',
  },
  {
    name: 'blurLayers',
    type: 'number',
    default: '8',
    description: 'Number of stacked mask + blur layers (minimum 2).',
  },
  {
    name: 'blurIntensity',
    type: 'number',
    default: '0.25',
    description: 'Blur multiplier applied per layer index (px).',
  },
  {
    name: 'reducedMotion',
    type: 'boolean',
    default: 'false',
    description: 'Force-disable backdrop blur (also honors prefers-reduced-motion).',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional class names on the root container.',
  },
];

export default function TwentyFirstProgressiveBlurDemo() {
  const [direction, setDirection] = useState('bottom');
  const [blurLayers, setBlurLayers] = useState(8);
  const [blurIntensity, setBlurIntensity] = useState(0.4);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            maxWidth: 720,
            margin: '0 auto',
            padding: '1rem 0 2rem',
            color: '#111',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
              Progressive Blur
            </h2>
            <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Layered mask + backdrop-filter edges for soft depth. Overlays images or content without blocking pointer events on the host.
            </p>
          </header>

          {/* Primary card demo */}
          <div
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              background: '#0a0a0a',
              aspectRatio: '16 / 10',
              boxShadow: '0 12px 40px rgba(22, 32, 228, 0.12)',
            }}
          >
            <img
              src="/assets/demo/cs1.webp"
              alt="Demo scene with progressive blur overlay"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <TwentyFirstProgressiveBlur
              direction={direction}
              blurLayers={blurLayers}
              blurIntensity={blurIntensity}
              className="absolute inset-0"
              style={{ position: 'absolute', inset: 0, borderRadius: 16 }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '1.25rem 1.5rem 1.5rem',
                color: '#fff',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#7BE9C6',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: '#1620E4',
                    boxShadow: '0 0 0 3px rgba(22, 32, 228, 0.35)',
                  }}
                />
                BemoUI · Edge depth
              </div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.35rem', fontWeight: 700 }}>
                Soft progressive falloff
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, maxWidth: 360 }}>
                Stacked white-mask segments drive increasing blur toward the edge.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              background: '#fafafa',
            }}
          >
            <div>
              <label
                htmlFor="pblur-direction"
                style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}
              >
                Direction
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DIRECTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    id={d === direction ? 'pblur-direction' : undefined}
                    onClick={() => setDirection(d)}
                    aria-pressed={direction === d}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: 8,
                      border: direction === d ? '2px solid #1620E4' : '1px solid #d1d5db',
                      background: direction === d ? 'rgba(22, 32, 228, 0.08)' : '#fff',
                      color: '#111',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="pblur-layers"
                style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}
              >
                Blur layers: {blurLayers}
              </label>
              <input
                id="pblur-layers"
                type="range"
                min={2}
                max={16}
                step={1}
                value={blurLayers}
                onChange={(e) => setBlurLayers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1620E4' }}
              />
            </div>

            <div>
              <label
                htmlFor="pblur-intensity"
                style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}
              >
                Intensity: {blurIntensity.toFixed(2)}
              </label>
              <input
                id="pblur-intensity"
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={blurIntensity}
                onChange={(e) => setBlurIntensity(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#7BE9C6' }}
              />
            </div>
          </div>

          {/* Secondary strip demos */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            {['top', 'bottom', 'left'].map((dir, i) => {
              const src = i === 0 ? '/assets/demo/cs2.webp' : i === 1 ? '/assets/demo/cs3.webp' : '/assets/demo/cs1.webp';
              return (
                <div
                  key={dir}
                  style={{
                    position: 'relative',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    aspectRatio: '4 / 3',
                    background: '#111',
                  }}
                >
                  <img
                    src={src}
                    alt={`Progressive blur from ${dir}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <TwentyFirstProgressiveBlur
                    direction={dir}
                    blurLayers={6}
                    blurIntensity={0.5}
                    style={{ position: 'absolute', inset: 0, borderRadius: 12 }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: 10,
                      bottom: 10,
                      zIndex: 1,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#fff',
                      background: 'rgba(0,0,0,0.45)',
                      padding: '4px 8px',
                      borderRadius: 6,
                      pointerEvents: 'none',
                    }}
                  >
                    {dir}
                  </span>
                </div>
              );
            })}
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: '#6b7280',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/progressive-blur"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              21st.dev Progressive Blur
            </a>
            {' · '}Motion Primitives · MIT License
          </p>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstProgressiveBlur} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
