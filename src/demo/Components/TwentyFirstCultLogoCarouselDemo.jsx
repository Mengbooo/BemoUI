import { useMemo, useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultLogoCarousel from '../../content/Components/TwentyFirstCultLogoCarousel/TwentyFirstCultLogoCarousel';
import { twentyFirstCultLogoCarousel } from '../../constants/code/Components/twentyFirstCultLogoCarouselCode';

const demoLogos = [
  { name: 'Carbon', id: 1, src: '/assets/demo/cs1.webp' },
  { name: 'Sierra', id: 2, src: '/assets/demo/cs2.webp' },
  { name: 'Nova', id: 3, src: '/assets/demo/cs3.webp' },
  { name: 'Atlas', id: 4 },
  { name: 'Pulse', id: 5 },
  { name: 'Orbit', id: 6 },
  { name: 'Vertex', id: 7 },
  { name: 'Lumen', id: 8 },
  { name: 'Nimbus', id: 9 },
  { name: 'Helix', id: 10 },
  { name: 'Quasar', id: 11 },
  { name: 'Forge', id: 12 },
];

const propData = [
  {
    name: 'logos',
    type: 'LogoItem[]',
    default: '[] (built-in placeholders)',
    description: 'Array of logo objects with name, optional id, img (component/element), or src image path.',
  },
  {
    name: 'columnCount',
    type: 'number',
    default: '2',
    description: 'Number of animated logo columns to distribute items across.',
  },
  {
    name: 'cycleInterval',
    type: 'number',
    default: '2000',
    description: 'Milliseconds each logo remains visible before the next transition.',
  },
  {
    name: 'columnDelayMs',
    type: 'number',
    default: '200',
    description: 'Stagger delay (ms) multiplied by column index for offset cycling.',
  },
  {
    name: 'tickMs',
    type: 'number',
    default: '100',
    description: 'Internal clock tick interval used to drive logo index calculation.',
  },
  {
    name: 'paused',
    type: 'boolean',
    default: 'false',
    description: 'When true, freezes the cycling animation.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: "'Partner logos carousel'",
    description: 'Accessible name for the carousel region.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name applied to the root element.',
  },
];

export default function TwentyFirstCultLogoCarouselDemo() {
  const [columnCount, setColumnCount] = useState(3);
  const [cycleInterval, setCycleInterval] = useState(2000);
  const [paused, setPaused] = useState(false);

  const logos = useMemo(() => demoLogos, []);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: 960,
            margin: '0 auto',
            padding: '1.5rem',
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0a0a0a',
              }}
            >
              Logo Carousel
            </h2>
            <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '0.95rem' }}>
              Multi-column staggered logo cycling with spring enter / blur exit transitions.
            </p>
          </header>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#374151' }}>
              Columns
              <input
                type="range"
                min={1}
                max={5}
                value={columnCount}
                onChange={(e) => setColumnCount(Number(e.target.value))}
                aria-label="Column count"
              />
              <span style={{ minWidth: 12, fontWeight: 600, color: '#1620E4' }}>{columnCount}</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#374151' }}>
              Cycle (ms)
              <input
                type="range"
                min={800}
                max={4000}
                step={100}
                value={cycleInterval}
                onChange={(e) => setCycleInterval(Number(e.target.value))}
                aria-label="Cycle interval"
              />
              <span style={{ minWidth: 40, fontWeight: 600, color: '#1620E4' }}>{cycleInterval}</span>
            </label>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              style={{
                border: '1px solid #e5e7eb',
                background: paused ? '#7BE9C6' : '#1620E4',
                color: paused ? '#0a0a0a' : '#fff',
                borderRadius: 8,
                padding: '0.4rem 0.85rem',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
          </div>

          <div
            style={{
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
              padding: '2rem 1rem',
              boxShadow: '0 8px 30px rgb(22 32 228 / 0.06)',
            }}
          >
            <TwentyFirstCultLogoCarousel
              logos={logos}
              columnCount={columnCount}
              cycleInterval={cycleInterval}
              paused={paused}
              aria-label="Demo partner logos"
            />
          </div>

          <p
            style={{
              margin: 0,
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#6b7280',
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/logo-carousel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              Cult UI Logo Carousel
            </a>{' '}
            · MIT License
          </p>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultLogoCarousel} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
