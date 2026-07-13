import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstInfiniteSlider from '../../content/Components/TwentyFirstInfiniteSlider/TwentyFirstInfiniteSlider';
import { twentyFirstInfiniteSlider } from '../../constants/code/Components/twentyFirstInfiniteSliderCode';

const logos = [
  { src: '/assets/demo/cs1.webp', alt: 'Partner logo 1' },
  { src: '/assets/demo/cs2.webp', alt: 'Partner logo 2' },
  { src: '/assets/demo/cs3.webp', alt: 'Partner logo 3' },
  { src: '/assets/demo/cs1.webp', alt: 'Partner logo 4' },
  { src: '/assets/demo/cs2.webp', alt: 'Partner logo 5' },
  { src: '/assets/demo/cs3.webp', alt: 'Partner logo 6' },
];

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Items to render inside the infinite track (duplicated for seamless loop).',
  },
  {
    name: 'gap',
    type: 'number',
    default: '16',
    description: 'Space between items in pixels.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '100',
    description: 'Base scroll speed in pixels per second.',
  },
  {
    name: 'speedOnHover',
    type: 'number',
    default: 'undefined',
    description: 'Scroll speed while the track is hovered. Enables smooth speed transition.',
  },
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Axis of the infinite scroll.',
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: 'Reverse the travel direction.',
  },
  {
    name: 'pauseOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Pause animation while hovered (when speedOnHover is not set).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable animation and pointer interaction.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional class names for the root element.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: "'Infinite scrolling content'",
    description: 'Accessible name for the region.',
  },
];

const DemoItem = ({ src, alt, label }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minWidth: 140,
      padding: '16px 20px',
      borderRadius: 12,
      background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
    }}
  >
    <img
      src={src}
      alt={alt}
      width={72}
      height={48}
      style={{
        objectFit: 'contain',
        borderRadius: 6,
        display: 'block',
      }}
    />
    {label ? (
      <span style={{ fontSize: 12, fontWeight: 600, color: '#334155', letterSpacing: '0.02em' }}>
        {label}
      </span>
    ) : null}
  </div>
);

const TwentyFirstInfiniteSliderDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: '8px 0 24px' }}>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
              Logo marquee
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#64748b', maxWidth: 560 }}>
              Seamless infinite horizontal slider. Hover to slow down. Respects{' '}
              <code style={{ fontSize: 12 }}>prefers-reduced-motion</code>.
            </p>
            <div
              style={{
                borderRadius: 16,
                padding: '28px 0',
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
              }}
            >
              <TwentyFirstInfiniteSlider
                gap={24}
                speed={60}
                speedOnHover={20}
                direction="horizontal"
                aria-label="Partner logos carousel"
              >
                {logos.map((item, i) => (
                  <DemoItem key={i} src={item.src} alt={item.alt} label={`Brand ${i + 1}`} />
                ))}
              </TwentyFirstInfiniteSlider>
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
              Reverse · faster hover
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#64748b', maxWidth: 560 }}>
              Direction reversed; hover accelerates the track.
            </p>
            <div
              style={{
                borderRadius: 16,
                padding: '20px 0',
                background: '#0f172a',
                border: '1px solid #1e293b',
                overflow: 'hidden',
              }}
            >
              <TwentyFirstInfiniteSlider
                gap={20}
                speed={40}
                speedOnHover={120}
                reverse
                direction="horizontal"
                aria-label="Dark theme reverse marquee"
              >
                {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((label) => (
                  <div
                    key={label}
                    style={{
                      minWidth: 120,
                      padding: '12px 20px',
                      borderRadius: 999,
                      background: 'linear-gradient(135deg, #1620E4 0%, #0f172a 60%)',
                      border: '1px solid rgba(123, 233, 198, 0.35)',
                      color: '#7BE9C6',
                      fontWeight: 600,
                      fontSize: 14,
                      textAlign: 'center',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {label}
                  </div>
                ))}
              </TwentyFirstInfiniteSlider>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'stretch' }}>
            <div style={{ flex: '1 1 280px', minWidth: 0 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
                Vertical
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: 14, color: '#64748b' }}>
                Vertical infinite track with fixed height.
              </p>
              <div
                style={{
                  height: 220,
                  borderRadius: 16,
                  padding: '12px 16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                }}
              >
                <TwentyFirstInfiniteSlider
                  gap={12}
                  speed={50}
                  direction="vertical"
                  aria-label="Vertical feature list"
                >
                  {['Realtime sync', 'Accessible', 'Reduced motion', 'Keyboard ready', 'Prop-driven', 'Vite + React 18'].map(
                    (text) => (
                      <div
                        key={text}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 10,
                          background: '#fff',
                          border: '1px solid #e2e8f0',
                          color: '#0f172a',
                          fontSize: 14,
                          fontWeight: 500,
                          boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
                        }}
                      >
                        {text}
                      </div>
                    )
                  )}
                </TwentyFirstInfiniteSlider>
              </div>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: '#64748b',
              lineHeight: 1.5,
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/infinite-slider"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              Infinite Slider
            </a>{' '}
            from Motion Primitives · MIT License
          </p>
        </div>

        <PropTable data={props} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstInfiniteSlider} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstInfiniteSliderDemo;
