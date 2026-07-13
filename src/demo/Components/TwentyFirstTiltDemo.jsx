import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTilt from '../../content/Components/TwentyFirstTilt/TwentyFirstTilt';
import { twentyFirstTilt } from '../../constants/code/Components/twentyFirstTiltCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Content to tilt (cards, images, etc.).',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names.',
  },
  {
    name: 'style',
    type: 'MotionStyle | CSSProperties',
    default: '—',
    description: 'Inline styles merged with the 3D transform.',
  },
  {
    name: 'rotationFactor',
    type: 'number',
    default: '15',
    description: 'Maximum rotation in degrees.',
  },
  {
    name: 'isReverse',
    type: 'boolean',
    default: 'false',
    description: 'Invert the tilt direction on both axes.',
  },
  {
    name: 'springOptions',
    type: 'SpringOptions',
    default: '{ stiffness: 300, damping: 30 }',
    description: 'Framer Motion spring config for smoothing.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable tilt interaction and reduce opacity.',
  },
];

export default function TwentyFirstTiltDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '1.5rem', maxWidth: '960px', margin: '0 auto' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>TwentyFirstTilt</h2>
            <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: 1.6 }}>
              Interactive 3D tilt that follows the pointer. Built with Framer Motion springs for smooth, natural motion.
              Respects <code>prefers-reduced-motion</code>, keyboard focus, and can be disabled.
            </p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Source:{' '}
              <a
                href="https://21st.dev/@ibelick/components/tilt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1620E4', textDecoration: 'underline' }}
              >
                21st.dev / Motion Primitives Tilt
              </a>
              {' · '}Motion Primitives · MIT License
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <TwentyFirstTilt
              className="bemo-21st-tilt-card"
              rotationFactor={18}
              style={{ width: '100%', maxWidth: 320 }}
            >
              <img
                src="/assets/demo/cs1.webp"
                alt="Demo card one"
                style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>Card Alpha</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Hover to feel the tilt. Accent #1620E4.</p>
                <div style={{ marginTop: '0.75rem', height: 4, borderRadius: 2, background: 'linear-gradient(90deg, #1620E4, #7BE9C6)' }} />
              </div>
            </TwentyFirstTilt>

            <TwentyFirstTilt
              className="bemo-21st-tilt-card"
              rotationFactor={12}
              isReverse
              style={{ width: '100%', maxWidth: 320 }}
            >
              <img
                src="/assets/demo/cs2.webp"
                alt="Demo card two"
                style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>Card Beta (reverse)</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>isReverse inverts both axes.</p>
                <div style={{ marginTop: '0.75rem', height: 4, borderRadius: 2, background: '#7BE9C6' }} />
              </div>
            </TwentyFirstTilt>

            <TwentyFirstTilt
              className="bemo-21st-tilt-card"
              rotationFactor={20}
              springOptions={{ stiffness: 200, damping: 20 }}
              style={{ width: '100%', maxWidth: 320 }}
            >
              <img
                src="/assets/demo/cs3.webp"
                alt="Demo card three"
                style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>Card Gamma</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Softer spring, stronger tilt.</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#1620E4' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#7BE9C6' }} />
                </div>
              </div>
            </TwentyFirstTilt>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
            <TwentyFirstTilt
              rotationFactor={10}
              style={{
                padding: '1.25rem 1.5rem',
                background: '#111',
                color: '#fff',
                borderRadius: 12,
                minWidth: 200,
                textAlign: 'center',
              }}
            >
              <strong style={{ color: '#7BE9C6' }}>Dark tile</strong>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', opacity: 0.85 }}>Subtle 10° tilt</p>
            </TwentyFirstTilt>

            <TwentyFirstTilt disabled style={{ padding: '1.25rem 1.5rem', background: '#f3f4f6', borderRadius: 12, border: '1px solid #e5e7eb' }}>
              <span style={{ color: '#6b7280' }}>Disabled (no tilt)</span>
            </TwentyFirstTilt>
          </div>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTilt} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
