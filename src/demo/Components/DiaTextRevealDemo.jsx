import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import DiaTextReveal from '../../content/Components/DiaTextReveal/DiaTextReveal';
import { diaTextReveal } from '../../constants/code/Components/diaTextRevealCode';

const propData = [
  {
    name: 'text',
    type: 'string | string[]',
    default: '—',
    description: 'Text to reveal. Pass multiple strings to rotate when repeat is true.',
  },
  {
    name: 'colors',
    type: 'string[]',
    default: '["#1620E4", "#7BE9C6", "#1620E4", "#7BE9C6", "#1620E4"]',
    description: 'Colors sampled across the moving gradient band.',
  },
  {
    name: 'textColor',
    type: 'string',
    default: '"#0a0a0a"',
    description: 'CSS color for revealed text after the sweep and for leading/trailing regions.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '1.5',
    description: 'Duration of one sweep pass, in seconds.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay before the sweep starts, in seconds.',
  },
  {
    name: 'repeat',
    type: 'boolean',
    default: 'false',
    description: 'When text is an array, replay the sweep and advance to the next string.',
  },
  {
    name: 'repeatDelay',
    type: 'number',
    default: '0.5',
    description: 'Pause between cycles when repeat is true, in seconds.',
  },
  {
    name: 'startOnView',
    type: 'boolean',
    default: 'true',
    description: 'If true, the animation starts only after the element enters the viewport.',
  },
  {
    name: 'once',
    type: 'boolean',
    default: 'true',
    description: 'If true, in-view detection fires at most once.',
  },
  {
    name: 'fixedWidth',
    type: 'boolean',
    default: 'false',
    description: 'When text has multiple entries, lock layout to the widest string.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Freezes animation and shows the final revealed text.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional class names for the animated span.',
  },
];

export default function DiaTextRevealDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack spacing={8} align="stretch" py={6}>
          <Box textAlign="center">
            <Text as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="gray.900">
              Build with{' '}
              <DiaTextReveal
                text={['speed', 'clarity', 'delight']}
                repeat
                duration={1.5}
                colors={['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6', '#1620E4']}
                textColor="#0a0a0a"
              />
            </Text>
          </Box>

          <Box textAlign="center">
            <Text as="p" fontSize="xl" color="gray.800">
              Ship{' '}
              <DiaTextReveal text="production-safe UI" duration={1.8} />{' '}
              with BemoUI.
            </Text>
          </Box>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/dia-text-reveal"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Dia Text Reveal
            </Link>
            . MIT License.
          </Text>

          <PropTable data={propData} />
        </VStack>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={diaTextReveal} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...diaTextReveal} />
      </CliTab>
    </TabbedLayout>
  );
}
