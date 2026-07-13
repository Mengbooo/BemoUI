import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstDisclosure from '../../content/Components/TwentyFirstDisclosure/TwentyFirstDisclosure';
import { twentyFirstDisclosure } from '../../constants/code/Components/twentyFirstDisclosureCode';

const propData = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controlled open state of the disclosure.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback fired when the open state changes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Expects Trigger as first child and Content as second child.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional class names for the root container.',
  },
  {
    name: 'variants',
    type: '{ expanded?: Variant; collapsed?: Variant }',
    default: 'height/opacity auto',
    description: 'Custom Framer Motion variants merged with base expand/collapse.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: '{ type: "spring", stiffness: 300, damping: 30 }',
    description: 'Motion transition applied via MotionConfig.',
  },
  {
    name: 'Trigger.asChild',
    type: 'boolean',
    default: 'false',
    description: 'When true, merges trigger props into the single child element.',
  },
];

const items = [
  {
    id: 1,
    title: 'What is TwentyFirstDisclosure?',
    body: 'A production-ready animated disclosure / accordion item adapted from Motion Primitives. It supports controlled and uncontrolled open state, keyboard interaction, and spring height animation.',
  },
  {
    id: 2,
    title: 'Keyboard and accessibility',
    body: 'The trigger is a native button with aria-expanded and aria-controls. Enter and Space toggle the panel. Focus-visible rings use the Bemo accent for clear keyboard navigation.',
  },
  {
    id: 3,
    title: 'Customization',
    body: 'Pass custom Framer Motion variants and transition props, or style via className and the bemo-21st-disclosure-* CSS tokens. Default accents are #1620E4 and #7BE9C6.',
  },
];

const DemoContent = () => {
  const [openId, setOpenId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: 560, width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: 8 }}>
        <p style={{ margin: '0 0 4px', fontSize: 14, color: '#6b7280' }}>
          Click a row or use keyboard (Tab + Enter/Space) to expand.
        </p>
      </div>

      {items.map((item) => (
        <TwentyFirstDisclosure
          key={item.id}
          open={openId === item.id}
          onOpenChange={(next) => setOpenId(next ? item.id : null)}
        >
          <TwentyFirstDisclosure.Trigger>{item.title}</TwentyFirstDisclosure.Trigger>
          <TwentyFirstDisclosure.Content>
            <p>{item.body}</p>
            {item.id === 1 && (
              <img
                src="/assets/demo/cs1.webp"
                alt="Demo illustration for disclosure content"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: 320,
                  height: 'auto',
                  borderRadius: 8,
                  marginTop: 8,
                }}
              />
            )}
          </TwentyFirstDisclosure.Content>
        </TwentyFirstDisclosure>
      ))}

      <div
        style={{
          marginTop: 20,
          padding: '12px 14px',
          borderRadius: 10,
          background: 'rgba(22, 32, 228, 0.04)',
          border: '1px solid rgba(22, 32, 228, 0.12)',
          fontSize: 13,
          lineHeight: 1.5,
          color: '#374151',
        }}
      >
        <strong style={{ color: '#1620E4' }}>Source credit:</strong>{' '}
        Adapted from{' '}
        <a
          href="https://21st.dev/@ibelick/components/disclosure"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1620E4', fontWeight: 600 }}
        >
          21st.dev Disclosure
        </a>{' '}
        (Motion Primitives) · MIT License
      </div>
    </div>
  );
};

const TwentyFirstDisclosureDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <DemoContent />
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstDisclosure} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstDisclosureDemo;
