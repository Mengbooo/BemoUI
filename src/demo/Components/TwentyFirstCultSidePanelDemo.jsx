import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultSidePanel from '../../content/Components/TwentyFirstCultSidePanel/TwentyFirstCultSidePanel';
import { twentyFirstCultSidePanel } from '../../constants/code/Components/twentyFirstCultSidePanelCode';
import { Play } from 'lucide-react';

const propData = [
  {
    name: 'panelOpen',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state of the side panel.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Initial open state when uncontrolled.',
  },
  {
    name: 'onPanelOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback fired when the panel open state should change.',
  },
  {
    name: 'handlePanelOpen',
    type: '() => void',
    default: 'undefined',
    description: 'Legacy upstream toggle handler; when set, replaces internal toggle behavior.',
  },
  {
    name: 'videoUrl',
    type: 'string',
    default: 'undefined',
    description: 'Optional media URL rendered inside the open panel.',
  },
  {
    name: 'videoPoster',
    type: 'string',
    default: 'undefined',
    description: 'Poster image for the optional video.',
  },
  {
    name: 'videoTitle',
    type: 'string',
    default: "'Featured video'",
    description: 'Accessible title for the video element.',
  },
  {
    name: 'renderButton',
    type: '(handleToggle: () => void) => ReactNode',
    default: 'undefined',
    description: 'Custom header control renderer receiving the toggle callback.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content shown when the panel is open (below optional video).',
  },
  {
    name: 'accentColor',
    type: 'string',
    default: "'#1620E4'",
    description: 'Primary accent color used for focus and CTAs.',
  },
  {
    name: 'accentSecondary',
    type: 'string',
    default: "'#7BE9C6'",
    description: 'Secondary accent for icons and highlights.',
  },
  {
    name: 'closedWidth',
    type: 'number | string',
    default: '160',
    description: 'Width of the panel when closed (px number or CSS length).',
  },
  {
    name: 'openWidthPercent',
    type: 'number',
    default: '97',
    description: 'Open width as a percentage of the container.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'Side panel'",
    description: 'Accessible name for the panel region.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables toggle interaction and dims the panel.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the panel root.',
  },
];

export default function TwentyFirstCultSidePanelDemo() {
  const [open, setOpen] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            minHeight: 420,
            width: '100%',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            background: 'linear-gradient(160deg, #0a0a0a 0%, #171717 50%, #0f1220 100%)',
            borderRadius: 16,
            padding: 16,
            boxSizing: 'border-box',
            border: '1px solid #262626',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(22,32,228,0.18), transparent), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(123,233,198,0.1), transparent)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 720 }}>
            <TwentyFirstCultSidePanel
              panelOpen={open}
              onPanelOpenChange={setOpen}
              videoPoster="/assets/demo/cs1.webp"
              videoTitle="Cult UI product walkthrough"
              ariaLabel="Product feature side panel"
              accentColor="#1620E4"
              accentSecondary="#7BE9C6"
            >
              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 600, color: '#fff' }}>
                  Side panel with video
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '0.875rem', lineHeight: 1.5, color: '#a3a3a3' }}>
                  Expand for a resizable panel experience with spring height animation, keyboard Escape to
                  close, and optional media. Built for React 18 + Vite with full reduced-motion support.
                </p>
                <a
                  className="bemo-21st-cult-side-panel-cta"
                  href="https://21st.dev/@cult-ui/components/side-panel-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    minHeight: 40,
                    padding: '8px 16px',
                    borderRadius: 9999,
                    background: 'linear-gradient(135deg, #1620E4, #0f1499)',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Play size={16} aria-hidden="true" />
                  Explore on 21st.dev
                </a>
              </div>
            </TwentyFirstCultSidePanel>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <PropTable data={propData} />
        </div>

        <p
          style={{
            marginTop: 20,
            fontSize: 13,
            color: '#737373',
            lineHeight: 1.5,
          }}
        >
          Source:{' '}
          <a
            href="https://21st.dev/@cult-ui/components/side-panel-video"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1620E4', fontWeight: 500 }}
          >
            Cult UI Side Panel Video
          </a>{' '}
          · MIT License. Adapted for BemoUI from the Cult UI registry.
        </p>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultSidePanel} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
