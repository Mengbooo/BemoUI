import { useMemo, useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultDirectionAwareTabs from '../../content/Components/TwentyFirstCultDirectionAwareTabs/TwentyFirstCultDirectionAwareTabs';
import { twentyFirstCultDirectionAwareTabs } from '../../constants/code/Components/twentyFirstCultDirectionAwareTabsCode';

const propData = [
  {
    name: 'tabs',
    type: 'Array<{ id: number | string; label: string; content: ReactNode }>',
    default: '[]',
    description: 'Tab definitions with unique ids, labels, and panel content.',
  },
  {
    name: 'defaultActiveId',
    type: 'number | string',
    default: 'tabs[0].id',
    description: 'Uncontrolled initial active tab id.',
  },
  {
    name: 'activeId',
    type: 'number | string',
    default: '—',
    description: 'Controlled active tab id.',
  },
  {
    name: 'onChange',
    type: '(id: number | string) => void',
    default: '—',
    description: 'Called when the active tab changes.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the root element.',
  },
  {
    name: 'rounded',
    type: 'string',
    default: 'rounded-full (CSS default)',
    description: 'Outer pill radius (utility class or CSS length).',
  },
  {
    name: 'roundedInner',
    type: 'string',
    default: 'rounded-full',
    description: 'Active bubble / trigger radius.',
  },
  {
    name: 'accentColor',
    type: 'string',
    default: '#1620E4',
    description: 'Primary accent CSS color (focus + content helpers).',
  },
  {
    name: 'accentColorAlt',
    type: 'string',
    default: '#7BE9C6',
    description: 'Secondary accent CSS color for content helpers.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and dims the control.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'Direction aware tabs'",
    description: 'Accessible label for the tablist.',
  },
];

function PanelCard({ title, children, image }) {
  return (
    <div
      className="bemo-panel-card"
      style={{
        borderRadius: '0.75rem',
        padding: '1.25rem',
        background: '#0a0a0a',
        border: '1px solid #262626',
        color: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {image ? (
        <img
          src={image}
          alt=""
          style={{
            width: '100%',
            maxHeight: 180,
            objectFit: 'cover',
            borderRadius: '0.5rem',
            display: 'block',
          }}
        />
      ) : null}
      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
      <div style={{ fontSize: '0.875rem', lineHeight: 1.5, color: '#a3a3a3' }}>{children}</div>
    </div>
  );
}

export default function TwentyFirstCultDirectionAwareTabsDemo() {
  const [activeId, setActiveId] = useState(0);

  const tabs = useMemo(
    () => [
      {
        id: 0,
        label: 'Overview',
        content: (
          <PanelCard title="Direction-aware motion" image="/assets/demo/cs1.webp">
            Switching tabs slides content in the direction of travel with a spring bubble
            indicator. Built for product tours, settings, and feature showcases.
            <p style={{ margin: '0.75rem 0 0', color: '#1620E4' }}>Accent primary · #1620E4</p>
          </PanelCard>
        ),
      },
      {
        id: 1,
        label: 'Features',
        content: (
          <PanelCard title="Accessible & keyboard-ready" image="/assets/demo/cs2.webp">
            Full tablist / tab / tabpanel roles, roving tabindex, arrow keys, Home / End, and
            focus-visible rings. Reduced motion is respected automatically.
            <p style={{ margin: '0.75rem 0 0', color: '#7BE9C6' }}>Accent alt · #7BE9C6</p>
          </PanelCard>
        ),
      },
      {
        id: 2,
        label: 'Content',
        content: (
          <PanelCard title="Adaptive height panels" image="/assets/demo/cs3.webp">
            Panel height animates to the measured content size so mixed-length sections feel
            seamless. Pass any React nodes as tab content.
          </PanelCard>
        ),
      },
      {
        id: 3,
        label: 'API',
        content: (
          <PanelCard title="Controlled or uncontrolled">
            Use <code style={{ color: '#7BE9C6' }}>defaultActiveId</code> or pair{' '}
            <code style={{ color: '#1620E4' }}>activeId</code> with{' '}
            <code style={{ color: '#1620E4' }}>onChange</code>. Customize radii and accents via
            props.
          </PanelCard>
        ),
      },
    ],
    []
  );

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            width: '100%',
            maxWidth: 640,
            margin: '0 auto',
            padding: '1.5rem 1rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', fontWeight: 600 }}>
              Direction Aware Tabs
            </h2>
            <p style={{ margin: 0, color: '#a3a3a3', fontSize: '0.875rem' }}>
              Animated pill tabs with directional content transitions. Click or use arrow keys.
            </p>
          </div>

          <TwentyFirstCultDirectionAwareTabs
            tabs={tabs}
            activeId={activeId}
            onChange={setActiveId}
            ariaLabel="Product sections"
            accentColor="#1620E4"
            accentColorAlt="#7BE9C6"
          />

          <p style={{ margin: 0, fontSize: '0.8125rem', color: '#737373', textAlign: 'center' }}>
            Active tab id: <strong style={{ color: '#e5e5e5' }}>{activeId}</strong>
          </p>

          <p
            style={{
              margin: '1rem 0 0',
              fontSize: '0.75rem',
              color: '#737373',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/direction-aware-tabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4' }}
            >
              Cult UI — Direction Aware Tabs
            </a>{' '}
            · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultDirectionAwareTabs} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
