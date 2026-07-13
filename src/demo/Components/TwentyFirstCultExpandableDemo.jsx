import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultExpandable from '../../content/Components/TwentyFirstCultExpandable/TwentyFirstCultExpandable';
import { twentyFirstCultExpandable } from '../../constants/code/Components/twentyFirstCultExpandableCode';
import { ChevronDown, Sparkles } from 'lucide-react';

const propData = [
  {
    name: 'expanded',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled expanded state. Omit for uncontrolled usage.'
  },
  {
    name: 'onToggle',
    type: '() => void',
    default: 'undefined',
    description: 'Callback when expansion is toggled (controlled mode).'
  },
  {
    name: 'transitionDuration',
    type: 'number',
    default: '0.3',
    description: 'Animation duration in seconds.'
  },
  {
    name: 'easeType',
    type: "'easeInOut' | 'easeIn' | 'easeOut' | 'linear' | [number, number, number, number]",
    default: "'easeInOut'",
    description: 'Easing for expand/collapse transitions.'
  },
  {
    name: 'expandDirection',
    type: "'vertical' | 'horizontal' | 'both'",
    default: "'vertical'",
    description: 'Axis used by Expandable.Card for size animation.'
  },
  {
    name: 'expandBehavior',
    type: "'replace' | 'push'",
    default: "'replace'",
    description: 'How expansion affects surrounding layout (context flag).'
  },
  {
    name: 'initialDelay',
    type: 'number',
    default: '0',
    description: 'Delay before animation starts.'
  },
  {
    name: 'onExpandStart / onExpandEnd',
    type: '() => void',
    default: 'undefined',
    description: 'Lifecycle callbacks for expansion.'
  },
  {
    name: 'onCollapseStart / onCollapseEnd',
    type: '() => void',
    default: 'undefined',
    description: 'Lifecycle callbacks for collapse.'
  },
  {
    name: 'Content.preset',
    type: "'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'blur-sm' | 'blur-md' | 'blur-lg'",
    default: 'undefined',
    description: 'Built-in enter/exit animation for Expandable.Content.'
  },
  {
    name: 'Content.stagger / staggerChildren',
    type: 'boolean / number',
    default: 'false / 0.1',
    description: 'Stagger child entrance when expanded.'
  },
  {
    name: 'Content.keepMounted',
    type: 'boolean',
    default: 'false',
    description: 'Keep content mounted while collapsed (hidden).'
  },
  {
    name: 'Card.collapsedSize / expandedSize',
    type: '{ width?: number; height?: number }',
    default: '{ width: 320, height: 211 } / { width: 480 }',
    description: 'Target dimensions for Expandable.Card.'
  },
  {
    name: 'Card.hoverToExpand',
    type: 'boolean',
    default: 'false',
    description: 'Expand/collapse on hover with optional delays.'
  }
];

const DemoCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto py-8 flex flex-col items-center gap-6">
      <TwentyFirstCultExpandable
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        transitionDuration={0.35}
        expandDirection="both"
      >
        <TwentyFirstCultExpandable.Card
          collapsedSize={{ width: 300, height: 200 }}
          expandedSize={{ width: 420, height: 380 }}
          className="shadow-none"
        >
          <TwentyFirstCultExpandable.Trigger className="w-full text-left">
            <TwentyFirstCultExpandable.CardHeader>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#7BE9C6', color: '#000' }}
                  >
                    <Sparkles size={16} />
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 m-0">BemoUI Expandable</h3>
                </div>
                <p className="text-sm text-gray-500 m-0">Click the card header to expand details.</p>
              </div>
              <MotionChevron expanded={expanded} />
            </TwentyFirstCultExpandable.CardHeader>
          </TwentyFirstCultExpandable.Trigger>

          <TwentyFirstCultExpandable.CardContent>
            <img
              src="/assets/demo/cs1.webp"
              alt="Demo preview"
              className="w-full h-28 object-cover rounded-xl mb-3"
            />
            <p className="text-sm text-gray-600 m-0 leading-relaxed">
              Smooth height & width springs with content presets. Fully keyboard accessible and
              reduced-motion aware.
            </p>
          </TwentyFirstCultExpandable.CardContent>

          <TwentyFirstCultExpandable.Content preset="slide-up" stagger staggerChildren={0.08}>
            <div className="px-4 pb-4 space-y-2">
              <div
                className="rounded-lg px-3 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: '#1620E4' }}
              >
                Accent #1620E4 — primary actions
              </div>
              <div
                className="rounded-lg px-3 py-2 text-sm font-medium text-black"
                style={{ backgroundColor: '#7BE9C6' }}
              >
                Accent #7BE9C6 — secondary highlights
              </div>
              <p className="text-xs text-gray-500 m-0 pt-1">
                Subcomponents: Trigger, Content, Card, CardHeader, CardContent, CardFooter.
              </p>
            </div>
          </TwentyFirstCultExpandable.Content>

          <TwentyFirstCultExpandable.CardFooter>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]"
            >
              {expanded ? 'Collapse' : 'Expand more'}
            </button>
          </TwentyFirstCultExpandable.CardFooter>
        </TwentyFirstCultExpandable.Card>
      </TwentyFirstCultExpandable>

      <p className="text-center text-xs text-gray-500 max-w-md">
        Source credit:{' '}
        <a
          href="https://21st.dev/@cult-ui/components/expandable"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#1620E4] hover:opacity-80"
        >
          Cult UI Expandable
        </a>{' '}
        — MIT License.
      </p>
    </div>
  );
};

function MotionChevron({ expanded }) {
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300"
      style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
      aria-hidden
    >
      <ChevronDown size={18} />
    </span>
  );
}

const TwentyFirstCultExpandableDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <DemoCard />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={twentyFirstCultExpandable} />
      </CodeTab>
      <CliTab>
        <CliInstallation />
      </CliTab>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Props</h3>
        <PropTable data={propData} />
      </div>
    </TabbedLayout>
  );
};

export default TwentyFirstCultExpandableDemo;
