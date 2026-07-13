import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import {
  TwentyFirstMorphingPopover,
  TwentyFirstMorphingPopoverTrigger,
  TwentyFirstMorphingPopoverContent,
} from '../../content/Components/TwentyFirstMorphingPopover/TwentyFirstMorphingPopover';
import { twentyFirstMorphingPopover } from '../../constants/code/Components/twentyFirstMorphingPopoverCode';
import { X, Sparkles } from 'lucide-react';

const propData = [
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Initial open state for uncontrolled usage.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: 'Controlled open state.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: 'Called when the popover open state changes.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: 'spring bounce 0.1 / 0.4s',
    description: 'Framer Motion transition applied via MotionConfig.',
  },
  {
    name: 'variants',
    type: 'Variants',
    default: '—',
    description: 'Optional motion variants for the content panel.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Extra class names on the root container.',
  },
  {
    name: 'asChild (Trigger)',
    type: 'boolean',
    default: 'false',
    description: 'Merge trigger behavior onto the child element.',
  },
  {
    name: 'disabled (Trigger)',
    type: 'boolean',
    default: 'false',
    description: 'Disable opening the popover.',
  },
];

const demoStyles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    minHeight: '320px',
    padding: '2rem',
    borderRadius: '12px',
    background: 'linear-gradient(145deg, #f8fafc 0%, #eef2ff 50%, #f0fdf9 100%)',
    border: '1px solid rgba(22, 32, 228, 0.08)',
  },
  title: {
    margin: 0,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
  },
  contentInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '260px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
  },
  heading: {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'inherit',
  },
  closeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '6px',
    background: 'transparent',
    color: '#64748b',
    cursor: 'pointer',
  },
  body: {
    margin: 0,
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    color: '#52525b',
  },
  thumb: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.06)',
  },
  accentBar: {
    height: '3px',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, #1620E4, #7BE9C6)',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  primaryBtn: {
    flex: 1,
    padding: '0.45rem 0.75rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: '#fff',
    background: '#1620E4',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  ghostBtn: {
    padding: '0.45rem 0.75rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: '#1620E4',
    background: 'transparent',
    border: '1px solid rgba(22, 32, 228, 0.25)',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  credit: {
    marginTop: '1.5rem',
    fontSize: '0.75rem',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  creditLink: {
    color: '#1620E4',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
};

function MorphingPopoverDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={demoStyles.wrap}>
      <p style={demoStyles.title}>Morphing popover</p>

      <TwentyFirstMorphingPopover open={open} onOpenChange={setOpen}>
        <TwentyFirstMorphingPopoverTrigger>
          <Sparkles size={16} aria-hidden />
          Open showcase
        </TwentyFirstMorphingPopoverTrigger>
        <TwentyFirstMorphingPopoverContent>
          <div style={demoStyles.contentInner}>
            <div style={demoStyles.accentBar} />
            <div style={demoStyles.header}>
              <h3 style={demoStyles.heading}>Project card</h3>
              <button
                type="button"
                style={demoStyles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label="Close popover"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src="/assets/demo/cs1.webp"
              alt="Demo project preview"
              style={demoStyles.thumb}
              width={260}
              height={120}
            />
            <p style={demoStyles.body}>
              The trigger morphs into this panel with a shared layoutId spring.
              Escape or click outside to dismiss.
            </p>
            <div style={demoStyles.actions}>
              <button type="button" style={demoStyles.primaryBtn} onClick={() => setOpen(false)}>
                Continue
              </button>
              <button type="button" style={demoStyles.ghostBtn} onClick={() => setOpen(false)}>
                Later
              </button>
            </div>
          </div>
        </TwentyFirstMorphingPopoverContent>
      </TwentyFirstMorphingPopover>

      <p style={demoStyles.credit}>
        Source credit:{' '}
        <a
          href="https://21st.dev/@ibelick/components/morphing-popover"
          target="_blank"
          rel="noopener noreferrer"
          style={demoStyles.creditLink}
        >
          Morphing Popover
        </a>
        {' '}from Motion Primitives · MIT License
      </p>
    </div>
  );
}

export default function TwentyFirstMorphingPopoverDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <MorphingPopoverDemo />
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstMorphingPopover} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
