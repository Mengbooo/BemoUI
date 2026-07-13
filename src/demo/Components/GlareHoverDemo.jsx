import { Box, Flex, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import GlareHover from '../../content/Components/GlareHover/GlareHover';
import { glareHover } from '../../constants/code/Components/glareHoverCode';

const propData = [
  {
    name: 'width',
    type: 'string',
    default: 'undefined',
    description: 'Optional CSS width on the root element (e.g. "100%", "320px").',
  },
  {
    name: 'height',
    type: 'string',
    default: 'undefined',
    description: 'Optional CSS height on the root element (e.g. "auto", "200px").',
  },
  {
    name: 'background',
    type: 'string',
    default: '"#000000"',
    description: 'Background color of the wrapper.',
  },
  {
    name: 'color',
    type: 'string',
    default: '"#7BE9C6"',
    description: 'Glare highlight as hex color, parsed to rgba for the gradient.',
  },
  {
    name: 'opacity',
    type: 'number',
    default: '0.5',
    description: 'Opacity applied to the glare color when converting hex to rgba (0–1).',
  },
  {
    name: 'angle',
    type: 'number',
    default: '-45',
    description: 'Gradient angle in degrees.',
  },
  {
    name: 'size',
    type: 'number',
    default: '250',
    description: 'Glare tile size as a percentage of the element.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '650',
    description: 'Transition duration for the glare sweep in milliseconds.',
  },
  {
    name: 'playOnce',
    type: 'boolean',
    default: 'false',
    description: 'When true, the glare transition only runs on hover/focus.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the glare interaction and dims the component.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional class names for the root element.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered inside the glare wrapper.',
  },
];

export default function GlareHoverDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          h={400}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GlareHover
            width="280px"
            height="180px"
            background="#0a0a0a"
            color="#7BE9C6"
            opacity={0.5}
            angle={-45}
            size={250}
            duration={650}
            tabIndex={0}
            style={{
              borderRadius: '12px',
              border: '1px solid #2a2a2a',
            }}
          >
            <Flex direction="column" align="center" gap={2} p={6}>
              <Box w="40px" h="40px" borderRadius="full" bg="#1620E4" />
              <Text color="white" fontWeight="bold" fontSize="lg">
                BemoUI
              </Text>
              <Text color="gray.400" fontSize="sm">
                Hover for glare
              </Text>
            </Flex>
          </GlareHover>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Adapted from{' '}
          <a
            href="https://magicui.design/docs/components/glare-hover"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1620E4' }}
          >
            Magic UI Glare Hover
          </a>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={glareHover} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...glareHover} />
      </CliTab>
    </TabbedLayout>
  );
}
