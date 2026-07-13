import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstToolbarDynamic from '../../content/Components/TwentyFirstToolbarDynamic/TwentyFirstToolbarDynamic';
import { twentyFirstToolbarDynamic } from '../../constants/code/Components/twentyFirstToolbarDynamicCode';

const propData = [
  {
    name: 'closedWidth',
    type: 'number',
    default: '98',
    description: 'Width of the toolbar (px) when collapsed.',
  },
  {
    name: 'openWidth',
    type: 'number',
    default: '300',
    description: 'Width of the toolbar (px) when expanded for search.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Search notes'",
    description: 'Placeholder text for the search input.',
  },
  {
    name: 'onSearch',
    type: '(query: string) => void',
    default: 'undefined',
    description: 'Called when the search form is submitted.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the toolbar open state changes.',
  },
  {
    name: 'initialOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the toolbar starts expanded.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables opening and input interaction.',
  },
  {
    name: 'showUserButton',
    type: 'boolean',
    default: 'true',
    description: 'Shows the decorative disabled user profile button when closed.',
  },
  {
    name: 'userAriaLabel',
    type: 'string',
    default: "'User profile'",
    description: 'Accessible label for the user button.',
  },
  {
    name: 'searchAriaLabel',
    type: 'string',
    default: "'Search notes'",
    description: 'Accessible label for the search trigger button.',
  },
  {
    name: 'backAriaLabel',
    type: 'string',
    default: "'Back'",
    description: 'Accessible label for the back / close button.',
  },
  {
    name: 'accentColor',
    type: 'string',
    default: "'#1620E4'",
    description: 'Primary accent used for focus rings and caret.',
  },
  {
    name: 'accentSecondary',
    type: 'string',
    default: "'#7BE9C6'",
    description: 'Secondary accent CSS variable for theming.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the root element.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: 'undefined',
    description: 'Inline styles merged onto the root element.',
  },
];

export default function TwentyFirstToolbarDynamicDemo() {
  const [lastQuery, setLastQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '420px',
            width: '100%',
            gap: '2rem',
            padding: '2.5rem 1.5rem',
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(22, 32, 228, 0.06), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(123, 233, 198, 0.1), transparent 45%), #fafafa',
            borderRadius: '1rem',
            border: '1px solid rgba(9, 9, 11, 0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'url(/assets/demo/cs1.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.08,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />

          <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '28rem' }}>
            <p
              style={{
                margin: 0,
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1620E4',
              }}
            >
              Motion toolbar
            </p>
            <h2
              style={{
                margin: '0.5rem 0 0.35rem',
                fontSize: '1.35rem',
                fontWeight: 650,
                color: '#18181b',
                letterSpacing: '-0.02em',
              }}
            >
              Dynamic expand-to-search
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#52525b', lineHeight: 1.5 }}>
              Click the search icon to expand the toolbar. Escape, outside click, or the back button collapses it.
            </p>
          </div>

          <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <TwentyFirstToolbarDynamic
              placeholder="Search notes…"
              onSearch={(q) => setLastQuery(q)}
              onOpenChange={setIsOpen}
              openWidth={320}
              closedWidth={98}
              accentColor="#1620E4"
              accentSecondary="#7BE9C6"
            />

            <div
              style={{
                minHeight: '1.5rem',
                fontSize: '0.8125rem',
                color: '#71717a',
                fontVariantNumeric: 'tabular-nums',
              }}
              aria-live="polite"
            >
              {isOpen ? (
                <span>
                  Open · try typing and press Enter
                  {lastQuery ? (
                    <>
                      {' · last query: '}
                      <strong style={{ color: '#18181b' }}>{lastQuery}</strong>
                    </>
                  ) : null}
                </span>
              ) : lastQuery ? (
                <span>
                  Last search: <strong style={{ color: '#18181b' }}>{lastQuery}</strong>
                </span>
              ) : (
                <span>Collapsed</span>
              )}
            </div>
          </div>

          <p
            style={{
              margin: 0,
              marginTop: 'auto',
              fontSize: '0.75rem',
              color: '#a1a1aa',
              zIndex: 1,
              textAlign: 'center',
              maxWidth: '32rem',
              lineHeight: 1.45,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/toolbar-dynamic"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              21st.dev toolbar-dynamic
            </a>
            {' · '}Motion Primitives · MIT License
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstToolbarDynamic} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
