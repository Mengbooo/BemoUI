import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextShimmer from '../../content/Components/TwentyFirstTextShimmer/TwentyFirstTextShimmer';
import { twentyFirstTextShimmer } from '../../constants/code/Components/twentyFirstTextShimmerCode';

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to apply the shimmer effect to.',
  },
  {
    name: 'as',
    type: 'React.ElementType',
    default: '"p"',
    description: 'Polymorphic root element (e.g. "h1", "span", "button").',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional CSS class names.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '2',
    description: 'Animation duration in seconds for one full shimmer cycle.',
  },
  {
    name: 'spread',
    type: 'number',
    default: '2',
    description: 'Multiplier for shimmer width based on text length (px = length * spread).',
  },
  {
    name: 'baseColor',
    type: 'string',
    default: 'theme-aware gray',
    description: 'Base text color CSS value (overrides --base-color).',
  },
  {
    name: 'gradientColor',
    type: 'string',
    default: 'theme-aware black/white',
    description: 'Shimmer highlight color CSS value (overrides --base-gradient-color).',
  },
];

const Demo = () => {
  const [duration, setDuration] = useState(2);
  const [spread, setSpread] = useState(2);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="bemo-demo-preview" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)', borderRadius: '12px', minHeight: '320px' }}>
          <div style={{ width: '100%' }}>
            <h2 style={{ color: '#e5e5e5', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Default shimmer</h2>
            <TwentyFirstTextShimmer
              as="h1"
              className="text-4xl font-bold tracking-tight"
              duration={duration}
              spread={spread}
              style={{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}
            >
              BemoUI Text Shimmer
            </TwentyFirstTextShimmer>
          </div>

          <div style={{ width: '100%' }}>
            <h2 style={{ color: '#e5e5e5', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Accent colors (#1620E4 / #7BE9C6)</h2>
            <TwentyFirstTextShimmer
              as="p"
              duration={1.5}
              spread={3}
              baseColor="#1620E4"
              gradientColor="#7BE9C6"
              style={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              Accent shimmer with brand colors
            </TwentyFirstTextShimmer>
          </div>

          <div style={{ width: '100%' }}>
            <h2 style={{ color: '#e5e5e5', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Inline & polymorphic</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Experience the{' '}
              <TwentyFirstTextShimmer as="span" duration={2.5} spread={1.5} baseColor="#a1a1aa" gradientColor="#ffffff">
                shimmering effect
              </TwentyFirstTextShimmer>{' '}
              on any text element.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', width: '100%' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: '#d4d4d8', fontSize: '0.875rem' }}>
              Duration: {duration}s
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{ width: '140px', accentColor: '#1620E4' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: '#d4d4d8', fontSize: '0.875rem' }}>
              Spread: {spread}
              <input
                type="range"
                min={0.5}
                max={6}
                step={0.5}
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                style={{ width: '140px', accentColor: '#7BE9C6' }}
              />
            </label>
          </div>

          <p style={{ marginTop: 'auto', fontSize: '0.75rem', color: '#71717a' }}>
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-shimmer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7BE9C6', textDecoration: 'underline' }}
            >
              21st.dev Text Shimmer
            </a>{' '}
            by Motion Primitives · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextShimmer} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default Demo;
