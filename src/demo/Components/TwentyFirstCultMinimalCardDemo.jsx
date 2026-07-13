import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import {
  TwentyFirstCultMinimalCard,
  TwentyFirstCultMinimalCardImage,
  TwentyFirstCultMinimalCardTitle,
  TwentyFirstCultMinimalCardDescription,
  TwentyFirstCultMinimalCardContent,
  TwentyFirstCultMinimalCardFooter,
} from '../../content/Components/TwentyFirstCultMinimalCard/TwentyFirstCultMinimalCard';
import { twentyFirstCultMinimalCard } from '../../constants/code/Components/twentyFirstCultMinimalCardCode';

const cards = [
  {
    src: '/assets/demo/cs1.webp',
    alt: 'Soft geometric abstract cover',
    title: 'Aurora Studio',
    description: 'Minimal product cards with layered shadows and crisp image frames.',
  },
  {
    src: '/assets/demo/cs2.webp',
    alt: 'Muted product photography',
    title: 'Cult Collection',
    description: 'Neutral surfaces, subtle insets, and focus-friendly interactions.',
  },
  {
    src: '/assets/demo/cs3.webp',
    alt: 'Editorial lifestyle still',
    title: 'Bemo Grid',
    description: 'Composable title, description, content, and footer slots for flexibility.',
  },
];

const propData = [
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Optional class names merged onto the root card element.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Card body. Compose with Image, Title, Description, Content, and Footer.',
  },
  {
    name: 'src (Image)',
    type: 'string',
    default: 'required',
    description: 'Image source URL for TwentyFirstCultMinimalCardImage.',
  },
  {
    name: 'alt (Image)',
    type: 'string',
    default: "''",
    description: 'Accessible alternative text for the card image.',
  },
];

const TwentyFirstCultMinimalCardDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '960px',
            margin: '0 auto',
            padding: '1rem 0 2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {cards.map((card) => (
              <TwentyFirstCultMinimalCard
                key={card.title}
                tabIndex={0}
                role="article"
                aria-label={card.title}
              >
                <TwentyFirstCultMinimalCardImage src={card.src} alt={card.alt} />
                <TwentyFirstCultMinimalCardTitle>{card.title}</TwentyFirstCultMinimalCardTitle>
                <TwentyFirstCultMinimalCardDescription>
                  {card.description}
                </TwentyFirstCultMinimalCardDescription>
                <TwentyFirstCultMinimalCardContent>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      color: '#1620E4',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: '#7BE9C6',
                        display: 'inline-block',
                      }}
                      aria-hidden="true"
                    />
                    Ready to ship
                  </span>
                </TwentyFirstCultMinimalCardContent>
                <TwentyFirstCultMinimalCardFooter>
                  <button
                    type="button"
                    style={{
                      appearance: 'none',
                      border: 'none',
                      background: '#1620E4',
                      color: '#fff',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      padding: '0.45rem 0.85rem',
                      borderRadius: 999,
                      cursor: 'pointer',
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    style={{
                      appearance: 'none',
                      border: '1px solid #e5e5e5',
                      background: 'transparent',
                      color: 'inherit',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      padding: '0.45rem 0.85rem',
                      borderRadius: 999,
                      cursor: 'pointer',
                    }}
                  >
                    Save
                  </button>
                </TwentyFirstCultMinimalCardFooter>
              </TwentyFirstCultMinimalCard>
            ))}
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '0.8125rem',
              color: '#737373',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/minimal-card"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Cult UI Minimal Card
            </a>{' '}
            · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultMinimalCard} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCultMinimalCardDemo;
