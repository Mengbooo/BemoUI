import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultTextureCard, {
  TwentyFirstCultTextureCardHeader,
  TwentyFirstCultTextureCardTitle,
  TwentyFirstCultTextureCardDescription,
  TwentyFirstCultTextureCardContent,
  TwentyFirstCultTextureCardFooter,
  TwentyFirstCultTextureSeparator,
} from '../../content/Components/TwentyFirstCultTextureCard/TwentyFirstCultTextureCard';
import { twentyFirstCultTextureCard } from '../../constants/code/Components/twentyFirstCultTextureCardCode';

const propsData = [
  {
    name: 'variant',
    type: "'default' | 'styled'",
    default: "'default'",
    description: 'Visual treatment: layered borders with gradient (default) or outer gradient shell (styled).',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional class names applied to the outer card element.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Card content. Compose with Header, Title, Description, Content, Footer, and Separator.',
  },
];

const TwentyFirstCultTextureCardDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '1.5rem',
            maxWidth: '720px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#171717' }}>
              Texture Card
            </h2>
            <p style={{ margin: 0, color: '#525252', fontSize: '0.95rem' }}>
              Nested border layers create a tactile, textured card surface.
            </p>
          </div>

          <TwentyFirstCultTextureCard variant="default" style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
            <TwentyFirstCultTextureCardHeader>
              <TwentyFirstCultTextureCardTitle>Project Alpha</TwentyFirstCultTextureCardTitle>
              <TwentyFirstCultTextureCardDescription>
                A refined surface with multi-layer borders and soft gradients.
              </TwentyFirstCultTextureCardDescription>
            </TwentyFirstCultTextureCardHeader>
            <TwentyFirstCultTextureSeparator />
            <TwentyFirstCultTextureCardContent>
              <img
                src="/assets/demo/cs1.webp"
                alt="Abstract product preview"
                style={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  borderRadius: 12,
                  display: 'block',
                  marginBottom: '0.75rem',
                  background: '#e5e5e5',
                }}
              />
              <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5, color: '#525252' }}>
                Use nested texture layers for cards that feel physical. Ideal for dashboards, pricing, and feature
                highlights.
              </p>
            </TwentyFirstCultTextureCardContent>
            <TwentyFirstCultTextureSeparator />
            <TwentyFirstCultTextureCardFooter>
              <span style={{ fontSize: '0.8rem', color: '#737373' }}>Updated today</span>
              <button
                type="button"
                style={{
                  appearance: 'none',
                  border: 'none',
                  borderRadius: 999,
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: '#1620E4',
                  color: '#fff',
                }}
              >
                Open
              </button>
            </TwentyFirstCultTextureCardFooter>
          </TwentyFirstCultTextureCard>

          <TwentyFirstCultTextureCard variant="styled" style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
            <TwentyFirstCultTextureCardHeader>
              <TwentyFirstCultTextureCardTitle>Styled variant</TwentyFirstCultTextureCardTitle>
              <TwentyFirstCultTextureCardDescription>
                Outer gradient shell with the same nested border craft.
              </TwentyFirstCultTextureCardDescription>
            </TwentyFirstCultTextureCardHeader>
            <TwentyFirstCultTextureCardContent>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                }}
              >
                {['cs1.webp', 'cs2.webp', 'cs3.webp'].map((file) => (
                  <img
                    key={file}
                    src={`/assets/demo/${file}`}
                    alt=""
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover',
                      borderRadius: 10,
                      background: '#e5e5e5',
                    }}
                  />
                ))}
              </div>
            </TwentyFirstCultTextureCardContent>
            <TwentyFirstCultTextureCardFooter>
              <button
                type="button"
                style={{
                  appearance: 'none',
                  border: '1px solid #d4d4d4',
                  borderRadius: 999,
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: '#fff',
                  color: '#171717',
                }}
              >
                Secondary
              </button>
              <button
                type="button"
                style={{
                  appearance: 'none',
                  border: 'none',
                  borderRadius: 999,
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: '#7BE9C6',
                  color: '#0a0a0a',
                }}
              >
                Accent
              </button>
            </TwentyFirstCultTextureCardFooter>
          </TwentyFirstCultTextureCard>

          <p
            style={{
              margin: '1rem 0 0',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: '#737373',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/texture-card"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 500 }}
            >
              Cult UI Texture Card
            </a>{' '}
            · MIT License
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', padding: '0 1.5rem' }}>
          <PropTable data={propsData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultTextureCard} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCultTextureCardDemo;
