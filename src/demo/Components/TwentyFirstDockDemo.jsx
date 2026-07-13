import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstDock, {
  DockItem,
  DockLabel,
  DockIcon,
} from '../../content/Components/TwentyFirstDock/TwentyFirstDock';
import { twentyFirstDock } from '../../constants/code/Components/twentyFirstDockCode';
import {
  Home,
  Search,
  Settings,
  Bell,
  User,
  Folder,
  Mail,
} from 'lucide-react';
import { useState } from 'react';

const propsData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Dock items (DockItem components).',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional CSS class for the dock container.',
  },
  {
    name: 'magnification',
    type: 'number',
    default: '80',
    description: 'Maximum scale size of icons when hovered.',
  },
  {
    name: 'distance',
    type: 'number',
    default: '150',
    description: 'Distance range that influences magnification.',
  },
  {
    name: 'panelHeight',
    type: 'number',
    default: '64',
    description: 'Base height of the dock panel.',
  },
  {
    name: 'spring',
    type: 'SpringOptions',
    default: '{ mass: 0.1, stiffness: 150, damping: 12 }',
    description: 'Framer Motion spring config for animations.',
  },
];

const itemProps = [
  {
    name: 'onClick',
    type: '() => void',
    default: '—',
    description: 'Click / keyboard activation handler.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the item.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional class for the item.',
  },
];

export default function TwentyFirstDockDemo() {
  const [active, setActive] = useState('home');
  const [log, setLog] = useState('Hover or focus icons to magnify. Click to activate.');

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'mail', label: 'Mail', icon: Mail },
    { id: 'folder', label: 'Files', icon: Folder },
    { id: 'bell', label: 'Notifications', icon: Bell },
    { id: 'user', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 24,
            padding: '48px 16px 32px',
            background:
              'linear-gradient(160deg, #0f1220 0%, #161b2e 50%, #0c0f1a 100%)',
            borderRadius: 16,
            color: '#f3f4f6',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                opacity: 0.85,
                lineHeight: 1.5,
              }}
            >
              {log}
            </p>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: 12,
                color: '#7BE9C6',
              }}
            >
              Active: <strong style={{ color: '#fff' }}>{active}</strong>
            </p>
          </div>

          <TwentyFirstDock magnification={72} distance={140} panelHeight={64}>
            {items.map(({ id, label, icon: Icon }) => (
              <DockItem
                key={id}
                onClick={() => {
                  setActive(id);
                  setLog(`Opened ${label}`);
                }}
                data-active={active === id}
                aria-label={label}
                style={{
                  background:
                    active === id ? 'rgba(123, 233, 198, 0.18)' : undefined,
                  borderRadius: 12,
                }}
              >
                <DockLabel>{label}</DockLabel>
                <DockIcon>
                  <Icon
                    strokeWidth={1.75}
                    color={active === id ? '#7BE9C6' : '#e5e7eb'}
                  />
                </DockIcon>
              </DockItem>
            ))}
          </TwentyFirstDock>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              opacity: 0.6,
              textAlign: 'center',
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/dock"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7BE9C6', textDecoration: 'underline' }}
            >
              21st.dev Dock
            </a>{' '}
            · Motion Primitives · MIT License
          </p>
        </div>

        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>TwentyFirstDock Props</h3>
          <PropTable data={propsData} />
          <h3 style={{ fontSize: 16, margin: '24px 0 12px' }}>DockItem Props</h3>
          <PropTable data={itemProps} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstDock} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
