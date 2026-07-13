import { useState, useCallback } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultPopoverForm, {
  TwentyFirstCultPopoverFormButton,
  TwentyFirstCultPopoverFormSeparator,
  TwentyFirstCultPopoverFormSuccess,
} from '../../content/Components/TwentyFirstCultPopoverForm/TwentyFirstCultPopoverForm';
import { twentyFirstCultPopoverForm } from '../../constants/code/Components/twentyFirstCultPopoverFormCode';

const propData = [
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: 'Controlled open state of the popover form panel.',
  },
  {
    name: 'setOpen',
    type: '(open: boolean) => void',
    default: '—',
    description: 'Setter used to toggle the popover open/closed.',
  },
  {
    name: 'title',
    type: 'string',
    default: '"Feedback"',
    description: 'Shared layout title shown on the trigger and floating panel header.',
  },
  {
    name: 'openChild',
    type: 'ReactNode',
    default: '—',
    description: 'Content rendered inside the form panel when not in the success state.',
  },
  {
    name: 'successChild',
    type: 'ReactNode',
    default: '—',
    description: 'Optional custom success view. Falls back to TwentyFirstCultPopoverFormSuccess.',
  },
  {
    name: 'showSuccess',
    type: 'boolean',
    default: 'false',
    description: 'When true, swaps the open form content for the success animation.',
  },
  {
    name: 'width',
    type: 'string | number',
    default: '"364px"',
    description: 'Width of the floating panel.',
  },
  {
    name: 'height',
    type: 'string | number',
    default: '"192px"',
    description: 'Height of the floating panel.',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    default: 'false',
    description: 'Shows the top cut-out close control with ChevronUp.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the trigger button.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: 'Optional callback fired whenever open state changes.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Class name applied to the root container.',
  },
];

function FeedbackFormDemo({ onSubmitted }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value.trim() || loading) return;
      setLoading(true);
      window.setTimeout(() => {
        setLoading(false);
        onSubmitted?.();
      }, 900);
    },
    [value, loading, onSubmitted]
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '40px 12px 12px',
        gap: 8,
      }}
    >
      <label
        htmlFor="bemo-feedback-input"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
      >
        Your feedback
      </label>
      <textarea
        id="bemo-feedback-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What can we improve?"
        rows={4}
        style={{
          width: '100%',
          flex: 1,
          resize: 'none',
          border: 'none',
          outline: 'none',
          fontSize: 14,
          fontFamily: 'inherit',
          color: 'inherit',
          background: 'transparent',
          lineHeight: 1.5,
        }}
      />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', paddingTop: 8 }}>
        <TwentyFirstCultPopoverFormSeparator width="100%" />
        <TwentyFirstCultPopoverFormButton loading={loading} text="Send" disabled={!value.trim()} />
      </div>
    </form>
  );
}

const TwentyFirstCultPopoverFormDemo = () => {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitted = useCallback(() => {
    setShowSuccess(true);
    window.setTimeout(() => {
      setOpen(false);
      setShowSuccess(false);
    }, 1800);
  }, []);

  const handleOpenChange = useCallback((next) => {
    if (!next) {
      setShowSuccess(false);
    }
  }, []);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '24px 16px 40px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 600 }}>Popover Form</h2>
            <p style={{ margin: 0, color: '#737373', fontSize: 14, lineHeight: 1.5 }}>
              Shared-layout feedback popover with animated success state, click-outside dismiss, Escape support,
              and accessible dialog semantics.
            </p>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: 560,
              borderRadius: 16,
              border: '1px solid #e5e5e5',
              background:
                'linear-gradient(160deg, rgba(22,32,228,0.04) 0%, rgba(123,233,198,0.08) 50%, #fafafa 100%)',
              padding: 8,
            }}
          >
            <TwentyFirstCultPopoverForm
              open={open}
              setOpen={setOpen}
              onOpenChange={handleOpenChange}
              title="Feedback"
              showSuccess={showSuccess}
              showCloseButton
              width="364px"
              height="220px"
              openChild={<FeedbackFormDemo onSubmitted={handleSubmitted} />}
              successChild={
                <TwentyFirstCultPopoverFormSuccess
                  title="Thanks!"
                  description="Your feedback helps us ship better components."
                />
              }
            />
          </div>

          <p style={{ margin: 0, fontSize: 13, color: '#737373', textAlign: 'center' }}>
            Click the trigger to expand the form. Submit to see the success transition, or dismiss with Escape /
            outside click.
          </p>

          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#a3a3a3', textAlign: 'center' }}>
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/popover-form"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Cult UI — Popover Form
            </a>{' '}
            · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultPopoverForm} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCultPopoverFormDemo;
