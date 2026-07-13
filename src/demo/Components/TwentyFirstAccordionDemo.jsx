import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstAccordion from '../../content/Components/TwentyFirstAccordion/TwentyFirstAccordion';
import { twentyFirstAccordion } from '../../constants/code/Components/twentyFirstAccordionCode';

const FAQ_ITEMS = [
  {
    value: 'item-1',
    title: 'What is Motion Primitives?',
    content:
      'Motion Primitives is a collection of beautifully animated React components built with Framer Motion. It provides smooth, accessible UI patterns you can drop into any project.',
  },
  {
    value: 'item-2',
    title: 'How does the accordion animation work?',
    content:
      'The accordion uses Framer Motion AnimatePresence with height and opacity variants. Content expands with a spring transition and collapses cleanly. Reduced-motion preferences are respected via CSS.',
  },
  {
    value: 'item-3',
    title: 'Is it accessible?',
    content:
      'Yes. It uses native button semantics, aria-expanded, aria-controls, role="region", keyboard support (Enter/Space), focus-visible outlines, and proper heading structure for screen readers.',
  },
  {
    value: 'item-4',
    title: 'Can I control it externally?',
    content:
      'Absolutely. Pass expandedValue and onValueChange for controlled mode, or omit them for uncontrolled internal state. You can also supply custom transition and variants props.',
  },
];

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Accordion items (TwentyFirstAccordion.Item components).',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional CSS class for the root container.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: '{ type: "spring", stiffness: 300, damping: 30 }',
    description: 'Framer Motion transition applied via MotionConfig.',
  },
  {
    name: 'variants',
    type: '{ expanded: Variant; collapsed: Variant }',
    default: 'height/opacity defaults',
    description: 'Override expand/collapse animation variants.',
  },
  {
    name: 'expandedValue',
    type: 'React.Key | null',
    default: 'undefined',
    description: 'Controlled expanded item value. Null collapses all.',
  },
  {
    name: 'onValueChange',
    type: '(value: React.Key | null) => void',
    default: 'undefined',
    description: 'Callback when the expanded item changes.',
  },
  {
    name: 'type',
    type: "'single' | 'multiple'",
    default: "'single'",
    description: 'Single or multiple open items (core focuses on single).',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'true',
    description: 'Whether the open item can be collapsed by re-clicking.',
  },
  {
    name: 'Item.value',
    type: 'React.Key',
    default: '—',
    description: 'Unique key identifying the accordion item.',
  },
  {
    name: 'Item.disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction for the item.',
  },
];

const Demo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            maxWidth: 560,
            width: '100%',
            margin: '0 auto',
            padding: '1.5rem',
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e5e5',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <h2
              style={{
                margin: '0 0 0.35rem',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#0a0a0a',
              }}
            >
              Frequently asked questions
            </h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#737373' }}>
              Smooth animated accordion from Motion Primitives.
            </p>
          </div>

          <TwentyFirstAccordion>
            {FAQ_ITEMS.map((item) => (
              <TwentyFirstAccordion.Item key={item.value} value={item.value}>
                <TwentyFirstAccordion.Trigger>
                  {item.title}
                </TwentyFirstAccordion.Trigger>
                <TwentyFirstAccordion.Content>
                  <p>{item.content}</p>
                </TwentyFirstAccordion.Content>
              </TwentyFirstAccordion.Item>
            ))}
          </TwentyFirstAccordion>
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(22,32,228,0.06), rgba(123,233,198,0.08))',
            borderRadius: 8,
            border: '1px solid rgba(22,32,228,0.12)',
            fontSize: '0.8125rem',
            color: '#404040',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#1620E4' }}>Source credit:</strong>{' '}
          Adapted from{' '}
          <a
            href="https://21st.dev/@ibelick/components/accordion"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1620E4', textDecoration: 'underline' }}
          >
            21st.dev Accordion
          </a>{' '}
          by Motion Primitives · MIT License.
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstAccordion} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...twentyFirstAccordion} />
      </CliTab>

      <PropTable data={propData} />
    </TabbedLayout>
  );
};

export default Demo;
