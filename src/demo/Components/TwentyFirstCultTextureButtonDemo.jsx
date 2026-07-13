import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultTextureButton from '../../content/Components/TwentyFirstCultTextureButton/TwentyFirstCultTextureButton';
import { twentyFirstCultTextureButton } from '../../constants/code/Components/twentyFirstCultTextureButtonCode';
import { Sparkles, Heart, Trash2, Settings, ArrowRight } from 'lucide-react';

const propsData = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'accent' | 'destructive' | 'minimal' | 'icon'",
    default: "'primary'",
    description: 'Visual style of the textured button shell and fill.',
  },
  {
    name: 'size',
    type: "'default' | 'sm' | 'lg' | 'icon'",
    default: "'default'",
    description: 'Controls padding, radius, and typography scale.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Merge props onto the child element instead of rendering a native button.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and reduces opacity.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Button label, icons, or nested content.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional class names applied to the outer shell.',
  },
];

const Demo = () => {
  const [count, setCount] = useState(0);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.5rem', maxWidth: 720, margin: '0 auto' }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: 600 }}>Texture Button</h3>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
              Layered gradient shell with an inner fill. Adapted for BemoUI with brand accents #1620E4 / #7BE9C6.
            </p>
          </div>

          <section>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Variants</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <TwentyFirstCultTextureButton variant="primary" onClick={() => setCount((c) => c + 1)}>
                Primary {count > 0 ? `(${count})` : ''}
              </TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton variant="accent">
                <Sparkles size={16} aria-hidden /> Accent
              </TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton variant="secondary">Secondary</TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton variant="minimal">Minimal</TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton variant="destructive">
                <Trash2 size={16} aria-hidden /> Destructive
              </TwentyFirstCultTextureButton>
            </div>
          </section>

          <section>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Sizes</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <TwentyFirstCultTextureButton size="sm" variant="accent">Small</TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton size="default" variant="accent">Default</TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton size="lg" variant="accent">Large</TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton size="icon" variant="icon" aria-label="Favorite">
                <Heart size={18} />
              </TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton size="icon" variant="icon" aria-label="Settings">
                <Settings size={18} />
              </TwentyFirstCultTextureButton>
            </div>
          </section>

          <section>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>States & composition</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <TwentyFirstCultTextureButton variant="primary" disabled>
                Disabled
              </TwentyFirstCultTextureButton>
              <TwentyFirstCultTextureButton variant="accent" asChild>
                <a href="#texture-demo" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Link as child <ArrowRight size={16} aria-hidden />
                </a>
              </TwentyFirstCultTextureButton>
            </div>
          </section>

          <section
            id="texture-demo"
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.08)',
              background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
              padding: '1.25rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <img
              src="/assets/demo/cs1.webp"
              alt="Demo product"
              width={96}
              height={96}
              style={{ borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Card with texture actions</div>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Pair textured buttons with local media for polished CTAs.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <TwentyFirstCultTextureButton size="sm" variant="accent">
                  Continue
                </TwentyFirstCultTextureButton>
                <TwentyFirstCultTextureButton size="sm" variant="minimal">
                  Later
                </TwentyFirstCultTextureButton>
              </div>
            </div>
          </section>

          <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/texture-button"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4' }}
            >
              Cult UI Texture Button
            </a>{' '}
            · MIT License
          </p>
        </div>
        <PropTable data={propsData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultTextureButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default Demo;
