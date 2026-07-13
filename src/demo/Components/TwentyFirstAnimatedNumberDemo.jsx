import { useState, useEffect, useCallback } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstAnimatedNumber from '../../content/Components/TwentyFirstAnimatedNumber/TwentyFirstAnimatedNumber';
import { twentyFirstAnimatedNumber } from '../../constants/code/Components/twentyFirstAnimatedNumberCode';

const DEMO_PROPS = [
  {
    name: 'value',
    type: 'number',
    default: '0',
    description: 'Target numeric value to animate toward.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names for styling.',
  },
  {
    name: 'springOptions',
    type: 'SpringOptions',
    default: '{ mass: 0.8, stiffness: 75, damping: 15 }',
    description: 'Framer Motion spring configuration (mass, stiffness, damping, etc.).',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'span'",
    description: 'Polymorphic root element type.',
  },
  {
    name: 'format',
    type: '(value: number) => string',
    default: 'toLocaleString',
    description: 'Custom formatter applied to the rounded display value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'When true, stops updating the spring target.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'Animated number: {value}',
    description: 'Accessible label for screen readers.',
  },
];

function AnimatedNumberDemo() {
  const [count, setCount] = useState(1240);
  const [revenue, setRevenue] = useState(48250);
  const [users, setUsers] = useState(8934);
  const [auto, setAuto] = useState(true);

  const randomize = useCallback(() => {
    setCount((c) => c + Math.floor(Math.random() * 400) - 80);
    setRevenue((r) => Math.max(0, r + Math.floor(Math.random() * 8000) - 2000));
    setUsers((u) => Math.max(0, u + Math.floor(Math.random() * 300) - 50));
  }, []);

  useEffect(() => {
    if (!auto) return undefined;
    const id = setInterval(randomize, 2800);
    return () => clearInterval(id);
  }, [auto, randomize]);

  return (
    <div className="bemo-demo-root" style={{ fontFamily: 'system-ui, sans-serif', color: '#111' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: 720,
          margin: '0 auto',
          padding: '1.5rem 1rem',
        }}
      >
        <header style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>
            Animated Number
          </h2>
          <p style={{ margin: 0, color: '#555', fontSize: '0.95rem' }}>
            Smooth spring-based count-up / count-down with tabular nums and reduced-motion support.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          <StatCard label="Orders" accent="#1620E4">
            <TwentyFirstAnimatedNumber
              value={count}
              className="bemo-21st-animated-number--large bemo-21st-animated-number--bold bemo-21st-animated-number--accent"
              aria-label={`Orders: ${count}`}
            />
          </StatCard>
          <StatCard label="Revenue" accent="#7BE9C6">
            <TwentyFirstAnimatedNumber
              value={revenue}
              format={(n) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(n)
              }
              className="bemo-21st-animated-number--large bemo-21st-animated-number--bold"
              style={{ color: '#0d9488' }}
              aria-label={`Revenue: $${revenue}`}
            />
          </StatCard>
          <StatCard label="Active users" accent="#1620E4">
            <TwentyFirstAnimatedNumber
              value={users}
              className="bemo-21st-animated-number--large bemo-21st-animated-number--bold"
              aria-label={`Active users: ${users}`}
            />
          </StatCard>
        </section>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={randomize}
            style={buttonStyle}
          >
            Randomize
          </button>
          <button
            type="button"
            onClick={() => setAuto((a) => !a)}
            style={{ ...buttonStyle, background: auto ? '#1620E4' : '#e5e7eb', color: auto ? '#fff' : '#111' }}
          >
            {auto ? 'Auto: On' : 'Auto: Off'}
          </button>
          <button
            type="button"
            onClick={() => {
              setCount(0);
              setRevenue(0);
              setUsers(0);
            }}
            style={{ ...buttonStyle, background: '#f3f4f6', color: '#111' }}
          >
            Reset
          </button>
        </div>

        <section
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '1.25rem',
            background: '#fafafa',
          }}
        >
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Custom spring & polymorphic</h3>
          <p style={{ margin: '0 0 1rem', color: '#666', fontSize: '0.875rem' }}>
            Rendered as <code>&lt;strong&gt;</code> with bouncier spring options.
          </p>
          <TwentyFirstAnimatedNumber
            as="strong"
            value={count * 3}
            springOptions={{ mass: 1, stiffness: 120, damping: 12 }}
            className="bemo-21st-animated-number--large"
            style={{ color: '#1620E4', display: 'block', textAlign: 'center' }}
          />
        </section>

        <footer
          style={{
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: '#6b7280',
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1rem',
          }}
        >
          Source:{' '}
          <a
            href="https://21st.dev/@ibelick/components/animated-number"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1620E4', textDecoration: 'underline' }}
          >
            21st.dev Animated Number
          </a>
          {' · '}Motion Primitives · MIT License
        </footer>
      </div>
    </div>
  );
}

function StatCard({ label, children, accent }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '1.25rem 1rem',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#6b7280',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </div>
      <div style={{ borderBottom: `2px solid ${accent}`, display: 'inline-block', paddingBottom: 4 }}>
        {children}
      </div>
    </div>
  );
}

const buttonStyle = {
  appearance: 'none',
  border: 'none',
  borderRadius: 8,
  padding: '0.55rem 1.1rem',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
  background: '#1620E4',
  color: '#fff',
  transition: 'opacity 0.15s ease',
};

export default function TwentyFirstAnimatedNumberDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <AnimatedNumberDemo />
        <div style={{ marginTop: '2rem', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}>
          <PropTable data={DEMO_PROPS} />
        </div>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstAnimatedNumber} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
