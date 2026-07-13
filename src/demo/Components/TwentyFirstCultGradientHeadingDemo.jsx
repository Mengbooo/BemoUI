import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultGradientHeading from '../../content/Components/TwentyFirstCultGradientHeading/TwentyFirstCultGradientHeading';
import { twentyFirstCultGradientHeading } from '../../constants/code/Components/twentyFirstCultGradientHeadingCode';

const variants = ['default', 'pink', 'light', 'secondary', 'accent'];
const sizes = ['xxs', 'xs', 'sm', 'md', 'default', 'lg', 'xl'];
const weights = ['thin', 'base', 'semi', 'bold', 'black'];

const TwentyFirstCultGradientHeadingDemo = () => {
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('lg');
  const [weight, setWeight] = useState('bold');

  const propsData = [
    {
      name: 'variant',
      type: "'default' | 'pink' | 'light' | 'secondary' | 'accent'",
      default: "'default'",
      description: 'Gradient color scheme. pink/accent use brand colors #1620E4 and #7BE9C6.',
    },
    {
      name: 'size',
      type: "'xxs' | 'xs' | 'sm' | 'md' | 'default' | 'lg' | 'xl' | 'xll' | 'xxl' | 'xxxl'",
      default: "'default'",
      description: 'Responsive text size scale.',
    },
    {
      name: 'weight',
      type: "'default' | 'thin' | 'base' | 'semi' | 'bold' | 'black'",
      default: "'default'",
      description: 'Font weight.',
    },
    {
      name: 'as',
      type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'",
      default: "'h3'",
      description: 'Semantic HTML element rendered (when asChild is false).',
    },
    {
      name: 'asChild',
      type: 'boolean',
      default: 'false',
      description: 'Merge props and classes onto the single child element (polymorphic).',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS class names applied to the gradient span (or child when asChild).',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      description: 'Heading text content.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'flex-start',
              marginBottom: '2.5rem',
            }}
          >
            <TwentyFirstCultGradientHeading
              as="h1"
              variant={variant}
              size={size}
              weight={weight}
            >
              Gradient Heading
            </TwentyFirstCultGradientHeading>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '36rem', lineHeight: 1.6 }}>
              Beautiful gradient text headings with full control over variant, size, and weight.
              Keyboard accessible and respects prefers-reduced-motion.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1.25rem',
              background: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>Variant</span>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                }}
              >
                {variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>Size</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                }}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>Weight</span>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                }}
              >
                {weights.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <TwentyFirstCultGradientHeading as="h2" variant="accent" size="xl" weight="black">
              Brand Accent
            </TwentyFirstCultGradientHeading>
            <TwentyFirstCultGradientHeading as="h3" variant="pink" size="lg" weight="semi">
              Electric Blue
            </TwentyFirstCultGradientHeading>
            <TwentyFirstCultGradientHeading as="h4" variant="secondary" size="md">
              Secondary Neutral
            </TwentyFirstCultGradientHeading>
            <TwentyFirstCultGradientHeading as="h5" variant="light" size="sm" weight="base">
              Light Variant
            </TwentyFirstCultGradientHeading>
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              padding: '1rem 1.25rem',
              background: '#f3f4f6',
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#4b5563',
            }}
          >
            <strong>Source credit:</strong>{' '}
            <a
              href="https://21st.dev/@cult-ui/components/gradient-heading"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Cult UI Gradient Heading
            </a>{' '}
            — MIT License.
          </div>
        </div>
        <PropTable data={propsData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultGradientHeading} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCultGradientHeadingDemo;
