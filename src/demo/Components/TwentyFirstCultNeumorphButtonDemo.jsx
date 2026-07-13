import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultNeumorphButton from '../../content/Components/TwentyFirstCultNeumorphButton/TwentyFirstCultNeumorphButton';
import { twentyFirstCultNeumorphButton } from '../../constants/code/Components/twentyFirstCultNeumorphButtonCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Button label content.',
  },
  {
    name: 'intent',
    type: "'default' | 'primary' | 'secondary' | 'danger'",
    default: "'default'",
    description: 'Visual style / color intent. Primary uses #1620E4 accent.',
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    default: "'medium'",
    description: 'Button size. Medium is uppercase by default.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretch button to full container width.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Show spinner and disable interaction.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable the button.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description: 'Native button type.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names.',
  },
  {
    name: 'onClick',
    type: 'MouseEventHandler',
    default: '—',
    description: 'Click handler. Respects disabled/loading.',
  },
];

export default function TwentyFirstCultNeumorphButtonDemo() {
  const [loading, setLoading] = useState(false);

  const handleSimulateLoad = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1800);
  };

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '2rem',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
              Neumorph Button
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>
              Soft neumorphic press with spring scale, loading state, and intent variants.
            </p>
          </header>

          <section>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
              Intents
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <TwentyFirstCultNeumorphButton intent="default">Default</TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton intent="primary">Primary</TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton intent="secondary">Secondary</TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton intent="danger">Danger</TwentyFirstCultNeumorphButton>
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
              Sizes
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <TwentyFirstCultNeumorphButton size="small" intent="primary">
                Small
              </TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton size="medium" intent="primary">
                Medium
              </TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton size="large" intent="primary">
                Large
              </TwentyFirstCultNeumorphButton>
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
              States
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <TwentyFirstCultNeumorphButton intent="primary" loading={loading} onClick={handleSimulateLoad}>
                {loading ? 'Loading…' : 'Simulate load'}
              </TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton intent="secondary" disabled>
                Disabled
              </TwentyFirstCultNeumorphButton>
              <TwentyFirstCultNeumorphButton intent="default" fullWidth>
                Full width
              </TwentyFirstCultNeumorphButton>
            </div>
          </section>

          <section
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: '1.25rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
              border: '1px solid #e5e7eb',
            }}
          >
            <img
              src="/assets/demo/cs1.webp"
              alt="Demo card"
              width={72}
              height={72}
              style={{ borderRadius: 10, objectFit: 'cover' }}
            />
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Deploy changes</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Confirm with a tactile neumorph action.
              </div>
            </div>
            <TwentyFirstCultNeumorphButton intent="primary" size="medium">
              Confirm
            </TwentyFirstCultNeumorphButton>
          </section>

          <p style={{ fontSize: '0.8rem', color: '#6b7280', textAlign: 'center', margin: 0 }}>
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/neumorph-button"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Cult UI Neumorph Button
            </a>{' '}
            · MIT License
          </p>
        </div>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstCultNeumorphButton} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
