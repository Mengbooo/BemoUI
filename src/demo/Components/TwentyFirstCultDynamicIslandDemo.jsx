import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import {
  DynamicIslandProvider,
  DynamicIsland,
  DynamicContainer,
  DynamicTitle,
  DynamicDescription,
  DynamicDiv,
  useDynamicIslandSize,
  SIZE_PRESETS,
} from '../../content/Components/TwentyFirstCultDynamicIsland/TwentyFirstCultDynamicIsland';
import { twentyFirstCultDynamicIsland } from '../../constants/code/Components/twentyFirstCultDynamicIslandCode';
import { Phone, Music2, Bell, MessageSquare, BatteryCharging } from 'lucide-react';

const PRESETS = [
  { key: SIZE_PRESETS.DEFAULT, label: 'Default' },
  { key: SIZE_PRESETS.COMPACT, label: 'Compact' },
  { key: SIZE_PRESETS.COMPACT_LONG, label: 'Compact Long' },
  { key: SIZE_PRESETS.LONG, label: 'Long' },
  { key: SIZE_PRESETS.MEDIUM, label: 'Medium' },
  { key: SIZE_PRESETS.TALL, label: 'Tall' },
  { key: SIZE_PRESETS.MINIMAL_LEADING, label: 'Minimal' },
];

function IslandDemoInner() {
  const { state, setSize } = useDynamicIslandSize();
  const size = state.size;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        width: '100%',
        minHeight: 420,
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        background:
          'linear-gradient(160deg, #0a0a0a 0%, #12141f 45%, #0d1a14 100%)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          maxWidth: 640,
        }}
      >
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setSize(p.key)}
            aria-pressed={size === p.key}
            style={{
              appearance: 'none',
              border:
                size === p.key
                  ? '1px solid #1620E4'
                  : '1px solid rgba(255,255,255,0.12)',
              background:
                size === p.key ? 'rgba(22, 32, 228, 0.25)' : 'rgba(255,255,255,0.04)',
              color: size === p.key ? '#7BE9C6' : '#e5e5e5',
              borderRadius: 999,
              padding: '0.4rem 0.85rem',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 0 2px #1620E4, 0 0 0 4px rgba(22,32,228,0.35)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '1.25rem',
          minHeight: 280,
        }}
      >
        <DynamicIsland id="bemo-demo-dynamic-island">
          {size === SIZE_PRESETS.DEFAULT && (
            <DynamicContainer className="px-4">
              <DynamicTitle>BemoUI</DynamicTitle>
            </DynamicContainer>
          )}

          {size === SIZE_PRESETS.COMPACT && (
            <DynamicContainer className="flex flex-row items-center justify-between gap-3 px-4 w-full">
              <DynamicDiv className="flex items-center gap-2">
                <Music2 size={16} color="#7BE9C6" aria-hidden />
                <DynamicTitle>Now Playing</DynamicTitle>
              </DynamicDiv>
              <DynamicDescription>Midnight Drive</DynamicDescription>
            </DynamicContainer>
          )}

          {size === SIZE_PRESETS.COMPACT_LONG && (
            <DynamicContainer className="flex flex-row items-center justify-between gap-3 px-5 w-full">
              <DynamicDiv className="flex items-center gap-2">
                <Phone size={16} color="#7BE9C6" aria-hidden />
                <DynamicTitle>Incoming Call</DynamicTitle>
              </DynamicDiv>
              <DynamicDescription>Alex Rivera</DynamicDescription>
            </DynamicContainer>
          )}

          {size === SIZE_PRESETS.LONG && (
            <DynamicContainer className="flex flex-col justify-center gap-1 px-5 py-3 w-full text-left">
              <DynamicDiv className="flex items-center gap-2">
                <Bell size={16} color="#7BE9C6" aria-hidden />
                <DynamicTitle>Reminder</DynamicTitle>
              </DynamicDiv>
              <DynamicDescription>
                Standup in 10 minutes — join the design sync room.
              </DynamicDescription>
            </DynamicContainer>
          )}

          {size === SIZE_PRESETS.MEDIUM && (
            <DynamicContainer className="flex flex-col gap-3 p-4 w-full text-left">
              <DynamicDiv className="flex items-center gap-3">
                <img
                  src="/assets/demo/cs1.webp"
                  alt=""
                  width={48}
                  height={48}
                  style={{
                    borderRadius: 12,
                    objectFit: 'cover',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <div>
                  <DynamicTitle>Delivery update</DynamicTitle>
                  <DynamicDescription>Your package is nearby</DynamicDescription>
                </div>
              </DynamicDiv>
              <DynamicDescription>
                Courier is 4 minutes away. Meet them at the lobby with ID ready.
              </DynamicDescription>
              <div
                style={{
                  height: 4,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.12)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '68%',
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #1620E4, #7BE9C6)',
                  }}
                />
              </div>
            </DynamicContainer>
          )}

          {size === SIZE_PRESETS.TALL && (
            <DynamicContainer className="flex flex-col gap-3 p-4 w-full text-left">
              <DynamicDiv className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} color="#7BE9C6" aria-hidden />
                  <DynamicTitle>Messages</DynamicTitle>
                </div>
                <DynamicDescription>2 new</DynamicDescription>
              </DynamicDiv>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/demo/cs2.webp"
                    alt=""
                    width={36}
                    height={36}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <DynamicTitle>Sam Chen</DynamicTitle>
                    <DynamicDescription>Pushing the PR now…</DynamicDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/demo/cs3.webp"
                    alt=""
                    width={36}
                    height={36}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <DynamicTitle>Jordan Lee</DynamicTitle>
                    <DynamicDescription>Can we ship the island?</DynamicDescription>
                  </div>
                </div>
              </div>
            </DynamicContainer>
          )}

          {size === SIZE_PRESETS.MINIMAL_LEADING && (
            <DynamicContainer className="flex items-center justify-center w-full h-full">
              <BatteryCharging size={18} color="#7BE9C6" aria-label="Charging" />
            </DynamicContainer>
          )}
        </DynamicIsland>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: 'rgba(255,255,255,0.45)',
          textAlign: 'center',
        }}
      >
        Active size:{' '}
        <span style={{ color: '#7BE9C6', fontFamily: 'ui-monospace, monospace' }}>
          {size}
        </span>
      </p>
    </div>
  );
}

const propData = [
  {
    name: 'initialSize',
    type: 'SizePresets',
    default: "'default'",
    description: 'Initial island size preset for the provider.',
  },
  {
    name: 'initialAnimation',
    type: 'Array<{ size: SizePresets; delay: number }>',
    default: '[]',
    description: 'Optional queued size transitions with delays (ms).',
  },
  {
    name: 'id',
    type: 'string',
    default: "'bemo-dynamic-island'",
    description: 'DOM id for the animated island region.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Extra class names on the outer container.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Island content; typically size-gated Dynamic* subcomponents.',
  },
];

export default function TwentyFirstCultDynamicIslandDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <DynamicIslandProvider initialSize={SIZE_PRESETS.DEFAULT}>
          <IslandDemoInner />
        </DynamicIslandProvider>

        <div style={{ marginTop: '1.5rem' }}>
          <PropTable data={propData} />
        </div>

        <p
          style={{
            marginTop: '1.25rem',
            fontSize: 13,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5,
          }}
        >
          Source credit:{' '}
          <a
            href="https://21st.dev/@cult-ui/components/dynamic-island"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#7BE9C6' }}
          >
            Cult UI Dynamic Island
          </a>{' '}
          (Cult UI) · MIT License
        </p>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultDynamicIsland} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
