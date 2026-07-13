import {
  Box,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Terminal, {
  AnimatedSpan,
  TypingAnimation,
} from '../../content/Components/Terminal/Terminal';
import { terminal } from '../../constants/code/Components/terminalCode';

const TerminalDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      description: 'Terminal lines (TypingAnimation / AnimatedSpan).',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional class name for the terminal shell.',
    },
    {
      name: 'sequence',
      type: 'boolean',
      default: 'true',
      description: 'Play child animations one after another.',
    },
    {
      name: 'startOnView',
      type: 'boolean',
      default: 'true',
      description: 'Begin the sequence when the terminal enters the viewport.',
    },
    {
      name: 'TypingAnimation.children',
      type: 'string',
      default: '—',
      description: 'Required string typed character by character.',
    },
    {
      name: 'TypingAnimation.duration',
      type: 'number',
      default: '60',
      description: 'Milliseconds between typed characters.',
    },
    {
      name: 'TypingAnimation.delay',
      type: 'number',
      default: '0',
      description: 'Start delay in ms when not sequenced.',
    },
    {
      name: 'TypingAnimation.as',
      type: '"span" | "p" | "div" | ...',
      default: '"span"',
      description: 'Motion element tag for typed text.',
    },
    {
      name: 'AnimatedSpan.delay',
      type: 'number',
      default: '0',
      description: 'Fade-in delay in ms when not sequenced.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" overflow="hidden" minH={400}>
          <Terminal>
            <TypingAnimation>{'> pnpm dlx bemoui@latest add terminal'}</TypingAnimation>
            <AnimatedSpan style={{ color: '#7BE9C6' }}>
              ✔ Checking registry.
            </AnimatedSpan>
            <AnimatedSpan style={{ color: '#7BE9C6' }}>
              ✔ Installing dependencies.
            </AnimatedSpan>
            <AnimatedSpan style={{ color: '#1620E4' }}>
              ✔ Created 1 file.
            </AnimatedSpan>
            <TypingAnimation>
              {'> Ready. Happy shipping.'}
            </TypingAnimation>
          </Terminal>
        </Box>

        <PropTable data={propData} />

        <Text fontSize="sm" mt={6} color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/terminal"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Terminal
          </Link>
          . MIT License.
        </Text>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={terminal} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...terminal} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TerminalDemo;
