import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import SmoothCursor from '../../content/Components/SmoothCursor/SmoothCursor';
import { smoothCursor } from '../../constants/code/Components/smoothCursorCode';

const propData = [
  {
    name: 'cursor',
    type: 'ReactNode',
    default: '<DefaultCursorSVG />',
    description: 'Custom cursor element rendered at the pointer position.',
  },
  {
    name: 'springConfig',
    type: '{ damping: number; stiffness: number; mass: number; restDelta: number }',
    default: '{ damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }',
    description: 'Spring physics used for position, rotation, and scale smoothing.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the custom cursor and restores the system pointer.',
  },
];

export default function SmoothCursorDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          minH="360px"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#111116"
          overflow="hidden"
          p={8}
        >
          <SmoothCursor />
          <VStack align="start" spacing={3} maxW="lg">
            <Heading size="md" color="gray.900">
              Smooth Cursor
            </Heading>
            <Text color="gray.400">
              Move your pointer across this preview on a fine-pointer device to
              see the spring-smoothed cursor. Touch and reduced-motion
              preferences fall back to the system cursor.
            </Text>
            <Box
              mt={2}
              px={4}
              py={3}
              borderRadius="md"
              bg="#1620E4"
              color="white"
              fontWeight="medium"
            >
              Accent blue #1620E4
            </Box>
            <Box
              px={4}
              py={3}
              borderRadius="md"
              bg="#7BE9C6"
              color="gray.900"
              fontWeight="medium"
            >
              Accent green #7BE9C6
            </Box>
          </VStack>
        </Box>

        <Text fontSize="sm" color="gray.500" mt={4}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/smooth-cursor"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Smooth Cursor
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={smoothCursor} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...smoothCursor} />
      </CliTab>
    </TabbedLayout>
  );
}
