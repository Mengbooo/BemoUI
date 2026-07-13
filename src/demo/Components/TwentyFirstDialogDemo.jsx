import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstDialog from '../../content/Components/TwentyFirstDialog/TwentyFirstDialog';
import { twentyFirstDialog } from '../../constants/code/Components/twentyFirstDialogCode';

const props = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state of the dialog.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Initial open state for uncontrolled usage.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the dialog open state changes.',
  },
  {
    name: 'variants',
    type: 'Variants (framer-motion)',
    default: 'scale + fade defaults',
    description: 'Motion variants for enter/exit of the dialog panel.',
  },
  {
    name: 'transition',
    type: 'Transition (framer-motion)',
    default: 'ease-out ~0.22s',
    description: 'Transition config applied to the animated dialog.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Optional class on the root context host (content uses Content className).',
  },
];

const contentProps = [
  {
    name: 'showClose',
    type: 'boolean',
    default: 'true',
    description: 'Whether to render the built-in absolute close button.',
  },
  {
    name: 'container',
    type: 'HTMLElement | null',
    default: 'document.body',
    description: 'Portal mount node for the dialog.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional classes for the native dialog element.',
  },
];

export default function TwentyFirstDialogDemo() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '1.5rem',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
              TwentyFirstDialog
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.5 }}>
              Accessible animated dialog built on the native{' '}
              <code style={{ fontSize: '0.85em' }}>&lt;dialog&gt;</code> element with Framer Motion,
              keyboard cancel support, scroll lock, and compound subcomponents.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              background: '#fafafa',
            }}
          >
            <TwentyFirstDialog open={open} onOpenChange={setOpen}>
              <TwentyFirstDialog.Trigger>Open product dialog</TwentyFirstDialog.Trigger>
              <TwentyFirstDialog.Content>
                <TwentyFirstDialog.Header>
                  <TwentyFirstDialog.Title>Upgrade workspace</TwentyFirstDialog.Title>
                  <TwentyFirstDialog.Description>
                    Unlock team seats, priority support, and advanced analytics for your BemoUI
                    projects. You can change or cancel anytime.
                  </TwentyFirstDialog.Description>
                </TwentyFirstDialog.Header>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: '#f3f4f6',
                    marginBottom: '0.25rem',
                  }}
                >
                  <img
                    src="/assets/demo/cs1.webp"
                    alt="Product preview"
                    width={64}
                    height={64}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Pro plan</div>
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                      $29 / month · includes Motion primitives polish
                    </div>
                  </div>
                </div>

                <TwentyFirstDialog.Footer>
                  <button
                    type="button"
                    className="bemo-21st-dialog-ghost-btn"
                    onClick={() => setOpen(false)}
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    className="bemo-21st-dialog-accent-btn"
                    onClick={() => setOpen(false)}
                  >
                    Continue
                  </button>
                </TwentyFirstDialog.Footer>
              </TwentyFirstDialog.Content>
            </TwentyFirstDialog>

            <TwentyFirstDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <TwentyFirstDialog.Trigger
                className="bemo-21st-dialog-ghost-btn"
                style={{ background: '#fff', color: '#374151', border: '1px solid #e5e7eb' }}
              >
                Confirm action
              </TwentyFirstDialog.Trigger>
              <TwentyFirstDialog.Content showClose={false}>
                <TwentyFirstDialog.Header>
                  <TwentyFirstDialog.Title>Delete project?</TwentyFirstDialog.Title>
                  <TwentyFirstDialog.Description>
                    This permanently removes the selected project and its drafts. This action cannot
                    be undone.
                  </TwentyFirstDialog.Description>
                </TwentyFirstDialog.Header>
                <TwentyFirstDialog.Footer>
                  <TwentyFirstDialog.Close className="bemo-21st-dialog-ghost-btn">
                    Cancel
                  </TwentyFirstDialog.Close>
                  <button
                    type="button"
                    className="bemo-21st-dialog-accent-btn"
                    style={{ background: '#dc2626' }}
                    onClick={() => setConfirmOpen(false)}
                  >
                    Delete
                  </button>
                </TwentyFirstDialog.Footer>
              </TwentyFirstDialog.Content>
            </TwentyFirstDialog>
          </div>

          <p style={{ margin: 0, fontSize: '0.8125rem', color: '#6b7280' }}>
            Tip: press Escape or click the backdrop to dismiss. Focus and scroll lock are handled
            automatically.
          </p>

          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              background: '#fff',
              fontSize: '0.8125rem',
              color: '#4b5563',
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: '#0a0a0a' }}>Source credit:</strong>{' '}
            Adapted from{' '}
            <a
              href="https://21st.dev/@ibelick/components/dialog"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 500 }}
            >
              21st.dev Dialog
            </a>{' '}
            (Motion Primitives) · MIT License.
          </div>

          <div>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 600 }}>
              Root props
            </h3>
            <PropTable data={props} />
          </div>

          <div>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 600 }}>
              Content props
            </h3>
            <PropTable data={contentProps} />
          </div>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstDialog} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
