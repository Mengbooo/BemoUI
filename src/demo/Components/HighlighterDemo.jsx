import { Box, Link, Stack, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Highlighter from '../../content/Components/Highlighter/Highlighter';
import { highlighter } from '../../constants/code/Components/highlighterCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Content wrapped by the annotation.',
  },
  {
    name: 'action',
    type: "'highlight' | 'underline' | 'box' | 'circle' | 'strike-through' | 'crossed-off' | 'bracket'",
    default: "'highlight'",
    description: 'Annotation style drawn around the content.',
  },
  {
    name: 'color',
    type: 'string',
    default: "'#7BE9C6'",
    description: 'Stroke or marker color for the annotation.',
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '1.5',
    description: 'SVG stroke width for line-based actions.',
  },
  {
    name: 'animationDuration',
    type: 'number',
    default: '600',
    description: 'Draw animation duration in milliseconds.',
  },
  {
    name: 'iterations',
    type: 'number',
    default: '2',
    description: 'How many times the draw animation runs.',
  },
  {
    name: 'padding',
    type: 'number',
    default: '2',
    description: 'Extra space around the text for the annotation.',
  },
  {
    name: 'multiline',
    type: 'boolean',
    default: 'true',
    description: 'Allow wrapped text; false forces a single line.',
  },
  {
    name: 'isView',
    type: 'boolean',
    default: 'false',
    description: 'When true, animate only after the element enters the viewport.',
  },
];

const HighlighterDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box borderRadius="lg" borderWidth="1px" p={8} bg="#111116">
          <Stack spacing={6}>
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              Ship faster with{' '}
              <Highlighter action="highlight" color="#7BE9C6">
                BemoUI Highlighter
              </Highlighter>
            </Text>
            <Text fontSize="lg" color="gray.800">
              Mark key phrases with{' '}
              <Highlighter action="underline" color="#1620E4">
                underline
              </Highlighter>
              ,{' '}
              <Highlighter action="box" color="#1620E4">
                box
              </Highlighter>
              , or{' '}
              <Highlighter action="circle" color="#7BE9C6">
                circle
              </Highlighter>{' '}
              accents.
            </Text>
            <Text fontSize="md" color="gray.700">
              Use{' '}
              <Highlighter action="strike-through" color="#1620E4">
                strike-through
              </Highlighter>{' '}
              and{' '}
              <Highlighter action="crossed-off" color="#1620E4">
                crossed-off
              </Highlighter>{' '}
              for edits, or{' '}
              <Highlighter action="bracket" color="#7BE9C6">
                brackets
              </Highlighter>{' '}
              for emphasis.
            </Text>
          </Stack>
        </Box>

        <Text mt={6} fontSize="sm" color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/highlighter"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Highlighter
          </Link>{' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={highlighter} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...highlighter} />
      </CliTab>
    </TabbedLayout>
  );
};

export default HighlighterDemo;
