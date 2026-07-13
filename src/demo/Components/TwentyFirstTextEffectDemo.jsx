import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstTextEffect from '../../content/Components/TwentyFirstTextEffect/TwentyFirstTextEffect';
import { twentyFirstTextEffect } from '../../constants/code/Components/twentyFirstTextEffectCode';

const PRESETS = ['fade', 'blur', 'fade-in-blur', 'scale', 'slide'];
const PER_OPTIONS = ['word', 'char', 'line'];

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to animate (required string).',
  },
  {
    name: 'per',
    type: "'word' | 'char' | 'line'",
    default: "'word'",
    description: 'Segmentation unit for stagger animation.',
  },
  {
    name: 'as',
    type: 'keyof JSX.IntrinsicElements',
    default: "'p'",
    description: 'Polymorphic root element rendered via motion.',
  },
  {
    name: 'preset',
    type: "'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'",
    default: "'fade'",
    description: 'Built-in animation preset for container + item variants.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay (seconds) before children stagger begins.',
  },
  {
    name: 'speedReveal',
    type: 'number',
    default: '1',
    description: 'Multiplier for stagger speed (higher = faster reveal).',
  },
  {
    name: 'speedSegment',
    type: 'number',
    default: '1',
    description: 'Multiplier for individual segment duration.',
  },
  {
    name: 'trigger',
    type: 'boolean',
    default: 'true',
    description: 'Controls mounting / AnimatePresence visibility.',
  },
  {
    name: 'variants',
    type: '{ container?: Variants; item?: Variants }',
    default: 'undefined',
    description: 'Override Framer Motion variants for container and items.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional class names on the root motion element.',
  },
  {
    name: 'segmentWrapperClassName',
    type: 'string',
    default: 'undefined',
    description: 'Optional wrapper class around each segment.',
  },
  {
    name: 'containerTransition',
    type: 'Transition',
    default: 'undefined',
    description: 'Extra transition options applied to the container.',
  },
  {
    name: 'segmentTransition',
    type: 'Transition',
    default: 'undefined',
    description: 'Extra transition options applied to each segment.',
  },
  {
    name: 'onAnimationStart',
    type: '() => void',
    default: 'undefined',
    description: 'Callback when the enter animation starts.',
  },
  {
    name: 'onAnimationComplete',
    type: '() => void',
    default: 'undefined',
    description: 'Callback when the enter animation completes.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: 'Inline styles on the root element.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables motion and applies reduced visual state.',
  },
];

export default function TwentyFirstTextEffectDemo() {
  const [preset, setPreset] = useState('fade-in-blur');
  const [per, setPer] = useState('word');
  const [trigger, setTrigger] = useState(true);
  const [key, setKey] = useState(0);

  const replay = () => {
    setTrigger(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setTrigger(true);
    }, 80);
  };

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            padding: '1.5rem',
            borderRadius: '12px',
            background: 'linear-gradient(145deg, #0a0a0a 0%, #141414 55%, #0f172a 100%)',
            color: '#fafafa',
            minHeight: '320px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <label style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>
              Preset{' '}
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                style={{
                  marginLeft: '0.35rem',
                  background: '#171717',
                  color: '#fff',
                  border: '1px solid #404040',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                }}
              >
                {PRESETS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>
              Per{' '}
              <select
                value={per}
                onChange={(e) => setPer(e.target.value)}
                style={{
                  marginLeft: '0.35rem',
                  background: '#171717',
                  color: '#fff',
                  border: '1px solid #404040',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                }}
              >
                {PER_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={replay}
              style={{
                background: '#1620E4',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.4rem 0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Replay
            </button>
          </div>

          <div
            key={key}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.25rem',
            }}
          >
            <TwentyFirstTextEffect
              as="h2"
              per={per}
              preset={preset}
              trigger={trigger}
              speedReveal={1.15}
              className="bemo-21st-text-effect-accent"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.35rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#7BE9C6',
              }}
            >
              Motion that feels intentional
            </TwentyFirstTextEffect>

            <TwentyFirstTextEffect
              as="p"
              per={per === 'line' ? 'word' : per}
              preset={preset}
              trigger={trigger}
              delay={0.12}
              style={{
                fontSize: '1.05rem',
                maxWidth: '36rem',
                color: '#e5e5e5',
              }}
            >
              TwentyFirstTextEffect staggers text by word, character, or line with blur, scale, slide, and fade presets powered by Framer Motion.
            </TwentyFirstTextEffect>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                marginTop: '0.5rem',
              }}
            >
              <img
                src="/assets/demo/cs1.webp"
                alt=""
                width={48}
                height={48}
                style={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid rgba(123, 233, 198, 0.35)',
                }}
              />
              <TwentyFirstTextEffect
                as="span"
                per="char"
                preset="blur"
                trigger={trigger}
                speedSegment={1.4}
                style={{ fontSize: '0.95rem', color: '#a3a3a3' }}
              >
                Accessible · reduced-motion aware · MIT
              </TwentyFirstTextEffect>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#737373', margin: 0 }}>
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/text-effect"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7BE9C6', textDecoration: 'underline' }}
            >
              21st.dev Text Effect
            </a>
            {' '}· Motion Primitives · MIT License
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstTextEffect} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
