import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextShimmerWave from '../../content/Components/TwentyFirstTextShimmerWave/TwentyFirstTextShimmerWave';
import { twentyFirstTextShimmerWave } from '../../constants/code/Components/twentyFirstTextShimmerWaveCode';

const propsData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to animate character-by-character.',
  },
  {
    name: 'as',
    type: 'React.ElementType',
    default: '"p"',
    description: 'Polymorphic root element (p, h1, span, button, etc.).',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional CSS class names for the root.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '1',
    description: 'Duration (seconds) of one character wave cycle.',
  },
  {
    name: 'zDistance',
    type: 'number',
    default: '10',
    description: 'Max translateZ (px) during the wave peak.',
  },
  {
    name: 'xDistance',
    type: 'number',
    default: '2',
    description: 'Max translateX (px) during the wave.',
  },
  {
    name: 'yDistance',
    type: 'number',
    default: '-2',
    description: 'Max translateY (px) during the wave.',
  },
  {
    name: 'spread',
    type: 'number',
    default: '1',
    description: 'Controls stagger density across characters.',
  },
  {
    name: 'scaleDistance',
    type: 'number',
    default: '1.1',
    description: 'Peak scale factor for each character.',
  },
  {
    name: 'rotateYDistance',
    type: 'number',
    default: '10',
    description: 'Peak rotateY (deg) for 3D flip feel.',
  },
  {
    name: 'baseColor',
    type: 'string',
    default: 'CSS var / theme',
    description: 'Resting text color.',
  },
  {
    name: 'gradientColor',
    type: 'string',
    default: 'CSS var / theme',
    description: 'Peak shimmer / highlight color.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: '—',
    description: 'Framer Motion transition overrides.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables animation and applies muted styles.',
  },
];

export default function TwentyFirstTextShimmerWaveDemo() {
  const [duration, setDuration] = useState(1);
  const [spread, setSpread] = useState(1);
  const [disabled, setDisabled] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            padding: '2rem 1.25rem',
            maxWidth: 720,
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <p
              style={{
                margin: '0 0 0.5rem',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#71717a',
              }}
            >
              BemoUI · Text Effects
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 700,
                color: '#fafafa',
              }}
            >
              Text Shimmer Wave
            </h1>
            <p style={{ margin: '0.75rem 0 0', color: '#a1a1aa', fontSize: '0.95rem' }}>
              Per-character 3D wave shimmer with staggered timing.
            </p>
          </header>

          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.75rem',
              padding: '2.5rem 1.5rem',
              borderRadius: 16,
              background: 'linear-gradient(145deg, #0a0a0b 0%, #18181b 100%)',
              border: '1px solid #27272a',
              boxShadow: '0 20px 40px -20px rgba(22, 32, 228, 0.25)',
            }}
          >
            <TwentyFirstTextShimmerWave
              as="h2"
              duration={duration}
              spread={spread}
              disabled={disabled}
              baseColor="#a1a1aa"
              gradientColor="#7BE9C6"
              className="bemo-21st-text-shimmer-wave--accent"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textAlign: 'center',
              }}
            >
              Generating your report…
            </TwentyFirstTextShimmerWave>

            <TwentyFirstTextShimmerWave
              duration={duration * 0.9}
              spread={spread}
              disabled={disabled}
              baseColor="#71717a"
              gradientColor="#1620E4"
              style={{ fontSize: '1.125rem', textAlign: 'center' }}
            >
              Almost ready — hang tight
            </TwentyFirstTextShimmerWave>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '0.5rem',
              }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#a1a1aa' }}>
                Duration ({duration.toFixed(1)}s)
                <input
                  type="range"
                  min={0.4}
                  max={2.5}
                  step={0.1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ accentColor: '#1620E4' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#a1a1aa' }}>
                Spread ({spread.toFixed(1)})
                <input
                  type="range"
                  min={0.4}
                  max={3}
                  step={0.1}
                  value={spread}
                  onChange={(e) => setSpread(Number(e.target.value))}
                  style={{ accentColor: '#7BE9C6' }}
                />
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: '#e4e4e7',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  style={{ accentColor: '#1620E4' }}
                />
                Disabled
              </label>
            </div>
          </section>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 12,
                background: '#18181b',
                border: '1px solid #27272a',
              }}
            >
              <img
                src="/assets/demo/cs1.webp"
                alt=""
                style={{
                  width: '100%',
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 12,
                  background: '#27272a',
                }}
              />
              <TwentyFirstTextShimmerWave
                as="span"
                duration={1.2}
                baseColor="#a1a1aa"
                gradientColor="#7BE9C6"
                style={{ fontSize: '0.95rem', fontWeight: 600 }}
              >
                Syncing workspace
              </TwentyFirstTextShimmerWave>
            </div>
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 12,
                background: '#18181b',
                border: '1px solid #27272a',
              }}
            >
              <img
                src="/assets/demo/cs2.webp"
                alt=""
                style={{
                  width: '100%',
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 12,
                  background: '#27272a',
                }}
              />
              <TwentyFirstTextShimmerWave
                as="span"
                duration={0.9}
                spread={1.4}
                baseColor="#71717a"
                gradientColor="#1620E4"
                style={{ fontSize: '0.95rem', fontWeight: 600 }}
              >
                Building preview
              </TwentyFirstTextShimmerWave>
            </div>
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 12,
                background: '#18181b',
                border: '1px solid #27272a',
              }}
            >
              <img
                src="/assets/demo/cs3.webp"
                alt=""
                style={{
                  width: '100%',
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 12,
                  background: '#27272a',
                }}
              />
              <TwentyFirstTextShimmerWave
                as="span"
                duration={1.1}
                zDistance={14}
                baseColor="#a1a1aa"
                gradientColor="#fafafa"
                style={{ fontSize: '0.95rem', fontWeight: 600 }}
              >
                Finalizing assets
              </TwentyFirstTextShimmerWave>
            </div>
          </section>

          <p
            style={{
              margin: 0,
              fontSize: '0.8125rem',
              color: '#71717a',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-shimmer-wave"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7BE9C6', textDecoration: 'underline' }}
            >
              21st.dev / text-shimmer-wave
            </a>
            {' · '}
            Motion Primitives · MIT License
          </p>

          <PropTable data={propsData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextShimmerWave} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
