import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultShiftCard from '../../content/Components/TwentyFirstCultShiftCard/TwentyFirstCultShiftCard';
import { twentyFirstCultShiftCard } from '../../constants/code/Components/twentyFirstCultShiftCardCode';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const props = [
  {
    name: 'topContent',
    type: 'ReactNode',
    default: '—',
    description: 'Content shown in the card header (always visible).',
  },
  {
    name: 'topAnimateContent',
    type: 'ReactNode',
    default: '—',
    description: 'Extra header content revealed on hover/focus expand.',
  },
  {
    name: 'middleContent',
    type: 'ReactNode',
    default: '—',
    description: 'Primary media or body shown when the card is collapsed.',
  },
  {
    name: 'bottomContent',
    type: 'ReactNode',
    default: '—',
    description: 'Footer panel that expands on hover/focus (shift effect).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction, hover, and keyboard expansion.',
  },
  {
    name: 'onHoverChange',
    type: '(hovered: boolean) => void',
    default: '—',
    description: 'Callback when expanded hover/focus state changes.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional class names for the root card.',
  },
];

const DemoCard = ({ image, title, tag, price, blurb }) => (
  <TwentyFirstCultShiftCard
    topContent={
      <div className="bemo-row" style={{ width: '100%' }}>
        <span className="bemo-badge">
          <Sparkles size={12} aria-hidden />
          {tag}
        </span>
        <span className="bemo-accent-text" style={{ fontSize: '0.75rem' }}>
          Live
        </span>
      </div>
    }
    topAnimateContent={
      <p className="bemo-muted" style={{ margin: 0, fontSize: '0.75rem' }}>
        {blurb}
      </p>
    }
    middleContent={
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          src={image}
          alt=""
          className="bemo-media"
          style={{ marginBottom: '0.75rem' }}
        />
        <h3 className="bemo-title">{title}</h3>
      </div>
    }
    bottomContent={
      <>
        <div className="bemo-row">
          <span className="bemo-title" style={{ fontSize: '0.875rem' }}>
            {title}
          </span>
          <span className="bemo-soft-text">{price}</span>
        </div>
        <div className="bemo-row" style={{ marginTop: '0.35rem' }}>
          <p className="bemo-muted" style={{ margin: 0 }}>
            Hover or focus to expand details
          </p>
          <ArrowUpRight size={16} color="#1620E4" aria-hidden />
        </div>
      </>
    }
  />
);

const TwentyFirstCultShiftCardDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '1.5rem 0',
            width: '100%',
          }}
        >
          <DemoCard
            image="/assets/demo/cs1.webp"
            title="Aurora Kit"
            tag="Design"
            price="$48"
            blurb="Layered gradients and soft depth for product cards."
          />
          <DemoCard
            image="/assets/demo/cs2.webp"
            title="Signal Deck"
            tag="Product"
            price="$72"
            blurb="Shift the footer panel to surface pricing and CTAs."
          />
          <DemoCard
            image="/assets/demo/cs3.webp"
            title="Cult Shift"
            tag="Motion"
            price="Free"
            blurb="Keyboard-friendly expand with reduced-motion support."
          />
        </div>

        <p
          style={{
            marginTop: '1.25rem',
            fontSize: '0.8125rem',
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          Source:{' '}
          <a
            href="https://21st.dev/@cult-ui/components/shift-card"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1620E4', fontWeight: 600 }}
          >
            Cult UI Shift Card
          </a>
          {' · '}MIT License
        </p>

        <div style={{ marginTop: '2rem' }}>
          <PropTable data={props} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultShiftCard} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCultShiftCardDemo;
