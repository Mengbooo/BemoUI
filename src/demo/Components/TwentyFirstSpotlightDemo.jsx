import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstSpotlight from '../../content/Components/TwentyFirstSpotlight/TwentyFirstSpotlight';
import { twentyFirstSpotlight } from '../../constants/code/Components/twentyFirstSpotlightCode';

const propData = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS class names applied to the spotlight element.',
  },
  {
    name: 'size',
    type: 'number',
    default: '200',
    description: 'Diameter of the spotlight circle in pixels.',
  },
  {
    name: 'springOptions',
    type: 'SpringOptions',
    default: '{ bounce: 0 }',
    description: 'Framer Motion spring configuration for mouse tracking.',
  },
  {
    name: 'colorFrom',
    type: 'string',
    default: '#7BE9C6',
    description: 'Inner radial gradient stop color (accent).',
  },
  {
    name: 'colorVia',
    type: 'string',
    default: '#1620E4',
    description: 'Middle radial gradient stop color (primary accent).',
  },
  {
    name: 'colorTo',
    type: 'string',
    default: 'transparent',
    description: 'Outer radial gradient stop color.',
  },
  {
    name: 'opacity',
    type: 'number',
    default: '0.8',
    description: 'Peak opacity of the spotlight when hovered.',
  },
  {
    name: 'blur',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'xl'",
    description: 'Blur intensity applied to the spotlight.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables mouse tracking and hides the spotlight.',
  },
];

const DemoCard = ({ title, description, image, children }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #e5e7eb',
      background: 'linear-gradient(145deg, #0a0a0a 0%, #111827 50%, #0f172a 100%)',
      minHeight: '280px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: '#f9fafb',
      boxShadow: '0 10px 40px rgba(22, 32, 228, 0.12)',
    }}
  >
    {children}
    {image && (
      <img
        src={image}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          zIndex: 0,
        }}
      />
    )}
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '1.5rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#d1d5db', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  </div>
);

export default function TwentyFirstSpotlightDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0.5rem 0' }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>
              TwentyFirstSpotlight
            </h2>
            <p style={{ margin: 0, color: '#4b5563', maxWidth: '42rem', lineHeight: 1.6 }}>
              A soft radial spotlight that tracks the cursor with spring physics. Place it as a child of any
              relatively positioned container. Hover the cards below to see the effect.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <DemoCard
              title="Aurora Grid"
              description="Default brand accents — mint to electric blue."
              image="/assets/demo/cs1.webp"
            >
              <TwentyFirstSpotlight size={280} opacity={0.85} />
            </DemoCard>

            <DemoCard
              title="Soft Focus"
              description="Larger, softer blur with tuned spring."
              image="/assets/demo/cs2.webp"
            >
              <TwentyFirstSpotlight
                size={320}
                blur="lg"
                springOptions={{ bounce: 0, stiffness: 120, damping: 25 }}
                colorFrom="#7BE9C6"
                colorVia="#1620E4"
                opacity={0.7}
              />
            </DemoCard>

            <DemoCard
              title="Compact Beam"
              description="Smaller spotlight for tighter UI regions."
              image="/assets/demo/cs3.webp"
            >
              <TwentyFirstSpotlight size={160} blur="md" opacity={0.9} />
            </DemoCard>
          </div>

          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              background: '#0b0f1a',
              minHeight: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              color: '#f3f4f6',
            }}
          >
            <TwentyFirstSpotlight size={400} opacity={0.55} blur="xl" />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
              <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 500 }}>
                Move your cursor across this panel
              </p>
              <p style={{ margin: '0.5rem 0 0', color: '#9ca3af', fontSize: '0.9rem' }}>
                The spotlight follows with spring smoothing. Respects prefers-reduced-motion.
              </p>
            </div>
          </div>

          <PropTable data={propData} />

          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/spotlight"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              21st.dev Spotlight
            </a>
            {' · '}Motion Primitives{' · '}MIT License
          </p>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstSpotlight} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
