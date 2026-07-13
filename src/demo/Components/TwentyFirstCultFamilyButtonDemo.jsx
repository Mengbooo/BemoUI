import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultFamilyButton from '../../content/Components/TwentyFirstCultFamilyButton/TwentyFirstCultFamilyButton';
import { twentyFirstCultFamilyButton } from '../../constants/code/Components/twentyFirstCultFamilyButtonCode';
import { useState } from 'react';
import { Users, MessageCircle, Share2, Heart } from 'lucide-react';

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Content revealed inside the expanded panel.',
  },
  {
    name: 'expanded',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled expanded state.',
  },
  {
    name: 'defaultExpanded',
    type: 'boolean',
    default: 'false',
    description: 'Initial expanded state when uncontrolled.',
  },
  {
    name: 'onExpandedChange',
    type: '(expanded: boolean) => void',
    default: '—',
    description: 'Callback when the expanded state should change.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables toggle interaction.',
  },
  {
    name: 'label',
    type: 'string',
    default: "'Toggle family actions'",
    description: 'Accessible name for the expand/collapse control.',
  },
  {
    name: 'collapsedSize',
    type: 'number',
    default: '64',
    description: 'Collapsed diameter in pixels.',
  },
  {
    name: 'expandedSize',
    type: 'number',
    default: '200',
    description: 'Expanded width in pixels.',
  },
  {
    name: 'expandedHeightExtra',
    type: 'number',
    default: '50',
    description: 'Extra height (px) added when expanded.',
  },
  {
    name: 'accent',
    type: 'string',
    default: "'#1620E4'",
    description: 'Primary accent for focus rings and brand highlights.',
  },
  {
    name: 'accentSoft',
    type: 'string',
    default: "'#7BE9C6'",
    description: 'Soft accent for close control and secondary highlights.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Optional class names on the root element.',
  },
];

function FamilyPreview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 32,
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(22, 32, 228, 0.12), transparent 55%), #0a0a0a',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        style={{
          margin: 0,
          color: '#a3a3a3',
          fontSize: 14,
          textAlign: 'center',
          maxWidth: 360,
        }}
      >
        Click the control to expand a compact &quot;family&quot; of actions. Escape closes when focused.
      </p>

      <TwentyFirstCultFamilyButton
        expanded={expanded}
        onExpandedChange={setExpanded}
        label="Open family actions"
        accent="#1620E4"
        accentSoft="#7BE9C6"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/assets/demo/cs1.webp"
              alt=""
              width={36}
              height={36}
              style={{
                borderRadius: 10,
                objectFit: 'cover',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fafafa',
                  lineHeight: 1.2,
                }}
              >
                Cult Family
              </div>
              <div style={{ fontSize: 11, color: '#a3a3a3' }}>3 quick actions</div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginTop: 4,
            }}
          >
            {[
              { icon: Users, label: 'Invite' },
              { icon: MessageCircle, label: 'Chat' },
              { icon: Share2, label: 'Share' },
              { icon: Heart, label: 'Like' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 6px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#f5f5f5',
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(123, 233, 198, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(123, 233, 198, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <Icon size={18} color="#7BE9C6" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>
      </TwentyFirstCultFamilyButton>

      <p style={{ margin: 0, fontSize: 12, color: '#737373' }}>
        State: {expanded ? 'expanded' : 'collapsed'}
      </p>

      <p
        style={{
          margin: 0,
          marginTop: 8,
          fontSize: 12,
          color: '#a3a3a3',
          textAlign: 'center',
        }}
      >
        Source:{' '}
        <a
          href="https://21st.dev/@cult-ui/components/family-button"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#7BE9C6', textDecoration: 'underline' }}
        >
          Cult UI Family Button
        </a>{' '}
        · MIT License
      </p>
    </div>
  );
}

export default function TwentyFirstCultFamilyButtonDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <FamilyPreview />
        <div style={{ marginTop: 32 }}>
          <PropTable data={props} />
        </div>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstCultFamilyButton} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
