import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import HyperText from '../../content/Components/HyperText/HyperText';
import { hyperText } from '../../constants/code/Components/hyperTextCode';

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to animate with the scramble effect.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Optional class name merged onto the root element.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '800',
    description: 'Scramble animation duration in milliseconds.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay before the animation starts in milliseconds.',
  },
  {
    name: 'as',
    type: "'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'",
    default: "'div'",
    description: 'Semantic element rendered as the animated root.',
  },
  {
    name: 'startOnView',
    type: 'boolean',
    default: 'false',
    description: 'When true, starts the animation once the element enters the viewport.',
  },
  {
    name: 'animateOnHover',
    type: 'boolean',
    default: 'true',
    description: 'Re-triggers the scramble effect on hover and keyboard focus.',
  },
  {
    name: 'characterSet',
    type: 'string[] | readonly string[]',
    default: 'A-Z',
    description: 'Characters used while scrambling unresolved letters.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables animation triggers and interactive states.',
  },
];

export default function HyperTextDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          minH="220px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          bg="#0D0D12"
          p={8}
          mb={6}
        >
          <HyperText duration={1000} animateOnHover>
            BemoUI Hyper Text
          </HyperText>
        </Box>

        <PropTable data={propData} />

        <Text mt={6} fontSize="sm" color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/hyper-text"
            isExternal
            rel="noopener noreferrer"
            color="#1620E4"
          >
            Magic UI Hyper Text
          </Link>
          . MIT License.
        </Text>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={hyperText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...hyperText} />
      </CliTab>
    </TabbedLayout>
  );
}
