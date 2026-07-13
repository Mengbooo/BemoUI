import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCursor from '../../content/Components/TwentyFirstCursor/TwentyFirstCursor';
import { twentyFirstCursor } from '../../constants/code/Components/twentyFirstCursorCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Custom cursor content rendered at the pointer position.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional classes for the fixed cursor root.',
  },
  {
    name: 'springConfig',
    type: 'SpringOptions',
    default: '{ stiffness: 500, damping: 28, mass: 0.5 }',
    description: 'Framer Motion spring options for cursor tracking.',
  },
  {
    name: 'attachToParent',
    type: 'boolean',
    default: 'false',
    description: 'When true, cursor only appears while hovering the parent element.',
  },
  {
    name: 'transition',
    type: 'Transition',
    default: 'spring enter/exit',
    description: 'Transition for the cursor content AnimatePresence.',
  },
  {
    name: 'variants',
    type: '{ initial, animate, exit }',
    default: 'scale/opacity defaults',
    description: 'Motion variants for enter/exit of cursor content.',
  },
  {
    name: 'onPositionChange',
    type: '(x: number, y: number) => void',
    default: 'undefined',
    description: 'Callback fired on every mousemove with client coordinates.',
  },
];

const TwentyFirstCursorDemo = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState('dot');

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '1.5rem',
            minHeight: '420px',
            background: 'linear-gradient(160deg, #0a0a0a 0%, #12141f 50%, #0d1117 100%)',
            borderRadius: '16px',
            color: '#f5f5f5',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>TwentyFirstCursor</h2>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                background: 'rgba(22, 32, 228, 0.2)',
                color: '#7BE9C6',
                border: '1px solid rgba(123, 233, 198, 0.35)',
              }}
            >
              Motion Primitives · MIT
            </span>
          </div>

          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem', maxWidth: '42rem' }}>
            Custom spring-followed cursor. Hide the system pointer and render any content at the mouse.
            Use <code style={{ color: '#7BE9C6' }}>attachToParent</code> to scope it to a region.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['dot', 'ring', 'label'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className="bemo-21st-cursor-host"
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: mode === m ? '1px solid #1620E4' : '1px solid #333',
                  background: mode === m ? 'rgba(22, 32, 228, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: mode === m ? '#fff' : '#d4d4d8',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <div
            className="bemo-21st-cursor-host"
            tabIndex={0}
            role="region"
            aria-label="Custom cursor playground. Move mouse inside to see the cursor."
            style={{
              position: 'relative',
              flex: 1,
              minHeight: '240px',
              borderRadius: '12px',
              border: '1px dashed rgba(123, 233, 198, 0.35)',
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(22, 32, 228, 0.15), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(123, 233, 198, 0.1), transparent 45%), #111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <TwentyFirstCursor
              attachToParent
              springConfig={{ stiffness: 420, damping: 28, mass: 0.45 }}
              onPositionChange={(x, y) => setCoords({ x: Math.round(x), y: Math.round(y) })}
            >
              {mode === 'dot' && <div className="bemo-21st-cursor-dot" />}
              {mode === 'ring' && <div className="bemo-21st-cursor-ring" />}
              {mode === 'label' && (
                <div className="bemo-21st-cursor-label bemo-21st-cursor-label--accent">View</div>
              )}
            </TwentyFirstCursor>

            <div style={{ textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
              <img
                src="/assets/demo/cs2.webp"
                alt="Demo visual"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  border: '2px solid rgba(22, 32, 228, 0.5)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
                  marginBottom: '0.75rem',
                  opacity: 0.95,
                }}
              />
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa' }}>
                Hover this area · cursor follows with spring
              </p>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#71717a', fontFamily: 'ui-monospace, monospace' }}>
                x: {coords.x} · y: {coords.y}
              </p>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '0.75rem', color: '#71717a' }}>
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/cursor"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7BE9C6', textDecoration: 'underline' }}
            >
              21st.dev / @ibelick cursor
            </a>
            {' · '}Motion Primitives · MIT License
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCursor} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCursorDemo;
