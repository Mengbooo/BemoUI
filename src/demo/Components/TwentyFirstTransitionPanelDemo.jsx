import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTransitionPanel from '../../content/Components/TwentyFirstTransitionPanel/TwentyFirstTransitionPanel';
import { twentyFirstTransitionPanel } from '../../constants/code/Components/twentyFirstTransitionPanelCode';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const panels = [
  {
    title: 'Discover',
    description: 'Explore curated motion primitives with smooth directional transitions.',
    image: '/assets/demo/cs1.webp',
    accent: '#1620E4',
  },
  {
    title: 'Compose',
    description: 'Swap panels while preserving layout with popLayout and spring physics.',
    image: '/assets/demo/cs2.webp',
    accent: '#7BE9C6',
  },
  {
    title: 'Ship',
    description: 'Accessible, reduced-motion aware, and ready for production UIs.',
    image: '/assets/demo/cs3.webp',
    accent: '#1620E4',
  },
];

const propData = [
  {
    name: 'children',
    type: 'ReactNode[]',
    default: '—',
    description: 'Array of panel contents. The active child is rendered with enter/center/exit animation.',
  },
  {
    name: 'activeIndex',
    type: 'number',
    default: '0',
    description: 'Zero-based index of the currently visible panel.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class for the root container.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: 'spring (stiffness 380, damping 32)',
    description: 'Framer Motion transition applied to the active panel.',
  },
  {
    name: 'variants',
    type: '{ enter, center, exit }',
    default: 'directional slide + fade + scale',
    description: 'Custom enter/center/exit variants. Receives direction via custom.',
  },
  {
    name: 'custom',
    type: 'number',
    default: 'auto direction',
    description: 'Optional custom value passed to variants (overrides internal direction).',
  },
  {
    name: 'onAnimationComplete',
    type: '() => void',
    default: 'undefined',
    description: 'Callback fired when the enter/center animation finishes.',
  },
];

export default function TwentyFirstTransitionPanelDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(panels.length - 1, i + 1));

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid #e5e5e5',
              background: '#ffffff',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <TwentyFirstTransitionPanel activeIndex={activeIndex} className="min-h-[320px]">
              {panels.map((panel) => (
                <div
                  key={panel.title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0',
                    minHeight: '320px',
                  }}
                >
                  <div
                    style={{
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      background: '#fafafa',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '40px',
                        height: '4px',
                        borderRadius: '2px',
                        background: panel.accent,
                      }}
                    />
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#0a0a0a' }}>
                      {panel.title}
                    </h3>
                    <p style={{ margin: 0, color: '#525252', lineHeight: 1.5, fontSize: '0.95rem' }}>
                      {panel.description}
                    </p>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      background: '#0a0a0a',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={panel.image}
                      alt={panel.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, ${panel.accent}33, transparent 60%)`,
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </TwentyFirstTransitionPanel>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderTop: '1px solid #e5e5e5',
                background: '#fff',
              }}
            >
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous panel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  background: activeIndex === 0 ? '#f5f5f5' : '#fff',
                  color: activeIndex === 0 ? '#a3a3a3' : '#0a0a0a',
                  cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <div style={{ display: 'flex', gap: '0.4rem' }} role="tablist" aria-label="Panel indicators">
                {panels.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to panel ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '22px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      background: i === activeIndex ? '#1620E4' : '#d4d4d4',
                      transition: 'width 0.2s ease, background 0.2s ease',
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === panels.length - 1}
                aria-label="Next panel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  background: activeIndex === panels.length - 1 ? '#f5f5f5' : '#1620E4',
                  color: activeIndex === panels.length - 1 ? '#a3a3a3' : '#fff',
                  cursor: activeIndex === panels.length - 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '0.8rem',
              color: '#737373',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/transition-panel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Transition Panel
            </a>{' '}
            by Motion Primitives · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTransitionPanel} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
