import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstGlowEffect from '../../content/Components/TwentyFirstGlowEffect/TwentyFirstGlowEffect';
import { twentyFirstGlowEffect } from '../../constants/code/Components/twentyFirstGlowEffectCode';

const modes = ['rotate', 'pulse', 'breathe', 'colorShift', 'flowHorizontal', 'static'];
const blurs = ['softest', 'soft', 'medium', 'strong', 'stronger', 'strongest', 'none'];

const propData = [
  {
    name: 'colors',
    type: 'string[]',
    default: "['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6']",
    description: 'Array of colors used for the glow gradients.',
  },
  {
    name: 'mode',
    type: "'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static'",
    default: "'rotate'",
    description: 'Animation mode for the glow effect.',
  },
  {
    name: 'blur',
    type: "number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none'",
    default: "'medium'",
    description: 'Blur intensity of the glow. Number is pixels.',
  },
  {
    name: 'scale',
    type: 'number',
    default: '1',
    description: 'Scale multiplier applied to the glow element.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '5',
    description: 'Duration in seconds for one animation cycle.',
  },
  {
    name: 'transition',
    type: 'Transition (framer-motion)',
    default: 'undefined',
    description: 'Optional custom framer-motion transition override.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes for the glow layer.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: 'Inline styles merged onto the glow element.',
  },
];

export default function TwentyFirstGlowEffectDemo() {
  const [mode, setMode] = useState('rotate');
  const [blur, setBlur] = useState('medium');
  const [duration, setDuration] = useState(5);
  const [scale, setScale] = useState(1);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div className="bemo-demo-container" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 640 }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#0a0a0a' }}>
              TwentyFirst Glow Effect
            </h2>
            <p style={{ margin: 0, color: '#525252', fontSize: '0.95rem' }}>
              Animated multi-mode glow layer inspired by Motion Primitives. Place it absolutely behind content for neon-style accents.
            </p>
          </div>

          {/* Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 720,
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#404040' }}>
              Mode
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: 8,
                  border: '1px solid #d4d4d4',
                  background: '#fff',
                  minWidth: 140,
                }}
              >
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#404040' }}>
              Blur
              <select
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: 8,
                  border: '1px solid #d4d4d4',
                  background: '#fff',
                  minWidth: 120,
                }}
              >
                {blurs.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#404040' }}>
              Duration (s)
              <input
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <span style={{ fontSize: 12 }}>{duration}s</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#404040' }}>
              Scale
              <input
                type="range"
                min={0.5}
                max={1.5}
                step={0.05}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <span style={{ fontSize: 12 }}>{scale.toFixed(2)}</span>
            </label>
          </div>

          {/* Showcase cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              width: '100%',
              maxWidth: 900,
            }}
          >
            {/* Card 1: primary glow */}
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#0a0a0a',
                minHeight: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #262626',
              }}
            >
              <TwentyFirstGlowEffect
                mode={mode}
                blur={blur}
                duration={duration}
                scale={scale}
                colors={['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6']}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                  padding: '1.5rem',
                  color: '#fafafa',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: '0 auto 1rem',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #1620E4, #7BE9C6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  B
                </div>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem' }}>Neon Card</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#a3a3a3' }}>
                  Glow sits behind content. pointer-events-none.
                </p>
              </div>
            </div>

            {/* Card 2: image + glow */}
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#111',
                minHeight: 220,
                border: '1px solid #262626',
              }}
            >
              <TwentyFirstGlowEffect
                mode={mode === 'static' ? 'colorShift' : mode}
                blur={blur}
                duration={duration}
                scale={scale * 1.05}
                colors={['#7BE9C6', '#1620E4', '#7BE9C6']}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img
                  src="/assets/demo/cs2.webp"
                  alt="Demo product"
                  style={{
                    width: '100%',
                    height: 120,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '1rem', color: '#fafafa', flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>Product Glow</h3>
                  <p style={{ margin: 0, fontSize: 12, color: '#a3a3a3' }}>
                    Accent edges with soft blur modes.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: button-like */}
            <div
              style={{
                position: 'relative',
                borderRadius: 9999,
                overflow: 'hidden',
                background: '#0a0a0a',
                minHeight: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #262626',
                gridColumn: '1 / -1',
                maxWidth: 360,
                margin: '0 auto',
                width: '100%',
              }}
            >
              <TwentyFirstGlowEffect
                mode="pulse"
                blur="strong"
                duration={3}
                scale={1.15}
                colors={['#1620E4', '#7BE9C6']}
              />
              <button
                type="button"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#fafafa',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '0.85rem 2rem',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
              >
                Glowing CTA
              </button>
            </div>
          </div>

          <p style={{ fontSize: 12, color: '#737373', textAlign: 'center', maxWidth: 520 }}>
            Tip: Wrap the glow in a relatively positioned parent. The effect uses absolute inset-0 and is non-interactive (aria-hidden).
          </p>

          <div
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              background: '#f5f5f5',
              border: '1px solid #e5e5e5',
              fontSize: 13,
              color: '#404040',
              textAlign: 'center',
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/glow-effect"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              21st.dev Glow Effect
            </a>{' '}
            — Motion Primitives by ibelick. MIT License.
          </div>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstGlowEffect} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
