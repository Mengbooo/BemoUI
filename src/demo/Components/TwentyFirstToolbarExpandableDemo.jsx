import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstToolbarExpandable from '../../content/Components/TwentyFirstToolbarExpandable/TwentyFirstToolbarExpandable';
import { twentyFirstToolbarExpandable } from '../../constants/code/Components/twentyFirstToolbarExpandableCode';
import { Folder, MessageCircle, User, WalletCards, Image as ImageIcon } from 'lucide-react';

const propsData = [
  {
    name: 'items',
    type: 'ToolbarExpandableItem[]',
    default: 'DEFAULT_ITEMS',
    description: 'Toolbar entries with id, label, optional icon/title, and panel content.',
  },
  {
    name: 'defaultActive',
    type: 'number | string | null',
    default: 'null',
    description: 'Initially selected item id.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the expandable panel starts open.',
  },
  {
    name: 'onActiveChange',
    type: '(id: number | string | null) => void',
    default: '—',
    description: 'Called when the active item changes or is cleared.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: 'Called when the panel opens or closes.',
  },
  {
    name: 'accentColor',
    type: 'string',
    default: '#1620E4',
    description: 'Primary accent for focus rings, indicators, and highlights.',
  },
  {
    name: 'secondaryColor',
    type: 'string',
    default: '#7BE9C6',
    description: 'Secondary accent used in gradients (e.g. avatar).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction with the toolbar.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name on the root element.',
  },
];

const demoItems = [
  {
    id: 1,
    label: 'User',
    icon: User,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-user">
          <img
            src="/assets/demo/cs1.webp"
            alt=""
            width={32}
            height={32}
            style={{
              height: '2rem',
              width: '2rem',
              borderRadius: '9999px',
              objectFit: 'cover',
            }}
          />
          <span>Alex Morgan</span>
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          Edit Profile
        </button>
      </div>
    ),
  },
  {
    id: 2,
    label: 'Messages',
    icon: MessageCircle,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-text">You have 3 new messages.</div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          View more
        </button>
      </div>
    ),
  },
  {
    id: 3,
    label: 'Documents',
    icon: Folder,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-list">
          <div>Project_Proposal.pdf</div>
          <div>Meeting_Notes.docx</div>
          <div>Financial_Report.xls</div>
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          Manage documents
        </button>
      </div>
    ),
  },
  {
    id: 4,
    label: 'Gallery',
    icon: ImageIcon,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <img
            src="/assets/demo/cs2.webp"
            alt="Demo preview 1"
            width={72}
            height={48}
            style={{
              borderRadius: '0.375rem',
              objectFit: 'cover',
              height: '3rem',
              width: '4.5rem',
            }}
          />
          <img
            src="/assets/demo/cs3.webp"
            alt="Demo preview 2"
            width={72}
            height={48}
            style={{
              borderRadius: '0.375rem',
              objectFit: 'cover',
              height: '3rem',
              width: '4.5rem',
            }}
          />
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          Open gallery
        </button>
      </div>
    ),
  },
  {
    id: 5,
    label: 'Wallet',
    icon: WalletCards,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-balance">
          <span>Current Balance</span>
          <span className="bemo-21st-toolbar-expandable-amount">$1,250.32</span>
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          View Transactions
        </button>
      </div>
    ),
  },
];

export default function TwentyFirstToolbarExpandableDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            minHeight: '320px',
            padding: '2rem 1rem 4rem',
            background:
              'radial-gradient(ellipse at top, rgba(22, 32, 228, 0.06), transparent 55%), #fafafa',
            borderRadius: '1rem',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.875rem',
              color: '#71717a',
              textAlign: 'center',
              maxWidth: '28rem',
            }}
          >
            Click an icon to expand the panel. Click the same icon again or press Escape to close.
            Click outside to dismiss.
          </p>
          <TwentyFirstToolbarExpandable
            items={demoItems}
            accentColor="#1620E4"
            secondaryColor="#7BE9C6"
          />
          <p
            style={{
              margin: 0,
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: '#a1a1aa',
              textAlign: 'center',
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/toolbar-expandable"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              21st.dev Toolbar Expandable
            </a>
            {' · '}
            Motion Primitives · MIT License
          </p>
        </div>
        <PropTable data={propsData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstToolbarExpandable} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
