import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstMagnetic from '../../content/Components/TwentyFirstMagnetic/TwentyFirstMagnetic';
import { twentyFirstMagnetic } from '../../constants/code/Components/twentyFirstMagneticCode';
import { Sparkles, Zap, Heart, MousePointer2 } from 'lucide-react';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Content to wrap with the magnetic effect.',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '0.6',
    description: 'Strength of the pull toward the pointer (0–1+).',
  },
  {
    name: 'range',
    type: 'number',
    default: '100',
    description: 'Pixel radius within which the magnetic effect is active.',
  },
  {
    name: 'actionArea',
    type: "'self' | 'parent' | 'global'",
    default: "'self'",
    description: 'Area that activates hover tracking: the element, its parent, or always (global).',
  },
  {
    name: 'springOptions',
    type: 'SpringOptions',
    default: '{ stiffness: 26.7, damping: 4.1, mass: 0.2 }',
    description: 'Framer Motion spring configuration for x/y.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the magnetic interaction and pointer events.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the root element.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'Polymorphic root element type.',
  },
];

const TwentyFirstMagneticDemo = () => {
  const [intensity, setIntensity] = useState(0.6);
  const [range, setRange] = useState(120);
  const [actionArea, setActionArea] = useState('self');
  const [disabled, setDisabled] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            padding: '1.5rem',
            maxWidth: 960,
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#111827',
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: 0,
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#0a0a0a',
              }}
            >
              TwentyFirstMagnetic
            </h2>
            <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '0.95rem' }}>
              Magnetic pointer attraction with spring physics. Move your cursor near the elements.
            </p>
          </header>

          <section
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 220,
              padding: '2rem',
              borderRadius: 16,
              background: 'linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)',
              border: '1px solid #e5e7eb',
            }}
          >
            <TwentyFirstMagnetic
              intensity={intensity}
              range={range}
              actionArea={actionArea}
              disabled={disabled}
            >
              <button
                type="button"
                className="bemo-21st-magnetic-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  borderRadius: 9999,
                  border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #1620E4 0%, #0f14a8 100%)',
                  boxShadow: '0 4px 14px rgba(22, 32, 228, 0.35)',
                }}
              >
                <MousePointer2 size={18} aria-hidden />
                Magnetic Button
              </button>
            </TwentyFirstMagnetic>

            <TwentyFirstMagnetic intensity={intensity} range={range} actionArea={actionArea} disabled={disabled}>
              <div
                className="bemo-21st-magnetic-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: 140,
                  height: 140,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                <span
                  className="bemo-21st-magnetic-icon-wrap"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(22,32,228,0.1), rgba(123,233,198,0.15))',
                    color: '#1620E4',
                  }}
                >
                  <Sparkles size={20} aria-hidden />
                </span>
                Spark
              </div>
            </TwentyFirstMagnetic>

            <TwentyFirstMagnetic intensity={intensity} range={range} actionArea={actionArea} disabled={disabled}>
              <div
                className="bemo-21st-magnetic-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: 140,
                  height: 140,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(123,233,198,0.2), rgba(22,32,228,0.08))',
                    color: '#0d9488',
                  }}
                >
                  <Zap size={20} aria-hidden />
                </span>
                Energy
              </div>
            </TwentyFirstMagnetic>

            <TwentyFirstMagnetic intensity={intensity} range={range} actionArea={actionArea} disabled={disabled}>
              <div
                className="bemo-21st-magnetic-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: 140,
                  height: 140,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(22,32,228,0.08))',
                    color: '#dc2626',
                  }}
                >
                  <Heart size={20} aria-hidden />
                </span>
                Heart
              </div>
            </TwentyFirstMagnetic>
          </section>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              padding: '1.25rem',
              borderRadius: 12,
              background: '#fff',
              border: '1px solid #e5e7eb',
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500 }}>
              Intensity ({intensity.toFixed(2)})
              <input
                type="range"
                min={0.1}
                max={1.5}
                step={0.05}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                style={{ accentColor: '#1620E4' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500 }}>
              Range ({range}px)
              <input
                type="range"
                min={40}
                max={250}
                step={10}
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                style={{ accentColor: '#1620E4' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500 }}>
              Action area
              <select
                value={actionArea}
                onChange={(e) => setActionArea(e.target.value)}
                style={{
                  padding: '0.4rem 0.5rem',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                  background: '#fff',
                }}
              >
                <option value="self">self</option>
                <option value="parent">parent</option>
                <option value="global">global</option>
              </select>
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
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
          </section>

          <section
            style={{
              padding: '1.25rem',
              borderRadius: 12,
              background: 'linear-gradient(90deg, rgba(22,32,228,0.06), rgba(123,233,198,0.1))',
              border: '1px solid rgba(22,32,228,0.15)',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>
              <strong style={{ color: '#1620E4' }}>Tip:</strong> Use{' '}
              <code style={{ background: '#e5e7eb', padding: '0.1rem 0.35rem', borderRadius: 4 }}>actionArea=&quot;parent&quot;</code>{' '}
              to magnetize children when hovering a larger container, or{' '}
              <code style={{ background: '#e5e7eb', padding: '0.1rem 0.35rem', borderRadius: 4 }}>global</code> for continuous tracking.
              Respects <code style={{ background: '#e5e7eb', padding: '0.1rem 0.35rem', borderRadius: 4 }}>prefers-reduced-motion</code>.
            </p>
          </section>

          <PropTable data={propData} />

          <footer
            style={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: '#6b7280',
              paddingTop: '0.5rem',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/magnetic"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600, textDecoration: 'underline' }}
            >
              21st.dev Magnetic
            </a>
            {' · '}Motion Primitives · MIT License
          </footer>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstMagnetic} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstMagneticDemo;
