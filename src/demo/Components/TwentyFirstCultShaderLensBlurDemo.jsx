import { useMemo, useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultShaderLensBlur from '../../content/Components/TwentyFirstCultShaderLensBlur/TwentyFirstCultShaderLensBlur';
import { twentyFirstCultShaderLensBlur } from '../../constants/code/Components/twentyFirstCultShaderLensBlurCode';

const VARIATIONS = [
  { value: 0, label: 'Rounded rect' },
  { value: 1, label: 'Circle fill' },
  { value: 2, label: 'Circle stroke' },
  { value: 3, label: 'Triangle' },
];

const propData = [
  {
    name: 'variation',
    type: '0 | 1 | 2 | 3',
    default: '3',
    description: 'SDF shape variation rendered by the fragment shader.',
  },
  {
    name: 'color1',
    type: 'string',
    default: '#1620E4',
    description: 'First gradient color (hex).',
  },
  {
    name: 'color2',
    type: 'string',
    default: '#7BE9C6',
    description: 'Second gradient color (hex).',
  },
  {
    name: 'color3',
    type: 'string',
    default: '#A1BBE7',
    description: 'Third gradient color (hex).',
  },
  {
    name: 'color4',
    type: 'string',
    default: '#F2BAE2',
    description: 'Fourth gradient color (hex).',
  },
  {
    name: 'enableHover',
    type: 'boolean',
    default: 'true',
    description: 'Keep the mouse lens effect active on hover without pressing.',
  },
  {
    name: 'invertMouse',
    type: 'boolean',
    default: 'true',
    description: 'Invert the mouse-driven color inversion lens.',
  },
  {
    name: 'isDarkMode',
    type: 'boolean',
    default: 'true',
    description: 'Apply the dark-mode mix in the shader.',
  },
  {
    name: 'width',
    type: 'string | number',
    default: '100%',
    description: 'Container width.',
  },
  {
    name: 'height',
    type: 'string | number',
    default: '400px',
    description: 'Container height.',
  },
  {
    name: 'showHint',
    type: 'boolean',
    default: 'true',
    description: 'Show the interaction hint overlay.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable interaction and dim the component.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the root container.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'Interactive shader lens blur animation',
    description: 'Accessible label for the decorative canvas.',
  },
];

export default function TwentyFirstCultShaderLensBlurDemo() {
  const [variation, setVariation] = useState(3);
  const [enableHover, setEnableHover] = useState(true);
  const [invertMouse, setInvertMouse] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [color1, setColor1] = useState('#1620E4');
  const [color2, setColor2] = useState('#7BE9C6');
  const [color3, setColor3] = useState('#A1BBE7');
  const [color4, setColor4] = useState('#F2BAE2');

  const controlStyle = useMemo(
    () => ({
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem 1.25rem',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      background: 'rgba(0,0,0,0.04)',
      border: '1px solid rgba(0,0,0,0.08)',
      fontSize: '0.875rem',
    }),
    []
  );

  const labelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
    color: '#171717',
  };

  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 0 1.5rem' }}>
          <p style={{ margin: '0 0 1rem', color: '#525252', fontSize: '0.95rem', lineHeight: 1.55 }}>
            Animated SDF shapes with a mouse-driven lens blur invert effect. Move the pointer (or touch)
            over the canvas to distort the gradient field. Keyboard users can focus the region and press
            Space or Enter to strengthen the interaction.
          </p>

          <div style={controlStyle}>
            <label style={labelStyle}>
              Variation
              <select
                value={variation}
                onChange={(e) => setVariation(Number(e.target.value))}
                style={{
                  marginLeft: 4,
                  borderRadius: 6,
                  border: '1px solid #d4d4d4',
                  padding: '0.25rem 0.5rem',
                  background: '#fff',
                }}
              >
                {VARIATIONS.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>

            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={enableHover}
                onChange={(e) => setEnableHover(e.target.checked)}
              />
              Enable hover
            </label>

            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={invertMouse}
                onChange={(e) => setInvertMouse(e.target.checked)}
              />
              Invert mouse
            </label>

            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
              />
              Dark mode mix
            </label>

            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={showHint}
                onChange={(e) => setShowHint(e.target.checked)}
              />
              Show hint
            </label>

            <label style={labelStyle}>
              C1
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                style={{ width: 32, height: 24, padding: 0, border: 'none', background: 'transparent' }}
              />
            </label>
            <label style={labelStyle}>
              C2
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                style={{ width: 32, height: 24, padding: 0, border: 'none', background: 'transparent' }}
              />
            </label>
            <label style={labelStyle}>
              C3
              <input
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
                style={{ width: 32, height: 24, padding: 0, border: 'none', background: 'transparent' }}
              />
            </label>
            <label style={labelStyle}>
              C4
              <input
                type="color"
                value={color4}
                onChange={(e) => setColor4(e.target.value)}
                style={{ width: 32, height: 24, padding: 0, border: 'none', background: 'transparent' }}
              />
            </label>
          </div>

          <TwentyFirstCultShaderLensBlur
            variation={variation}
            color1={color1}
            color2={color2}
            color3={color3}
            color4={color4}
            enableHover={enableHover}
            invertMouse={invertMouse}
            isDarkMode={isDarkMode}
            showHint={showHint}
            width="100%"
            height="420px"
            aria-label="Cult UI style shader lens blur demo"
          />

          <p
            style={{
              marginTop: '1.25rem',
              fontSize: '0.8125rem',
              color: '#737373',
              lineHeight: 1.5,
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/shader-lens-blur"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Cult UI — Shader Lens Blur
            </a>
            {' '}(MIT License).
          </p>

          <div style={{ marginTop: '2rem' }}>
            <PropTable data={propData} />
          </div>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultShaderLensBlur} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
