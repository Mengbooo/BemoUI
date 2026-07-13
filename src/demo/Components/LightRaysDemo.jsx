import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import LightRays from '../../content/Components/LightRays/LightRays';
import { lightRays } from '../../constants/code/Components/lightRaysCode';

const propData = [
  {
    name: 'count',
    type: 'number',
    default: '7',
    description: 'Number of light rays rendered (capped at 32).',
  },
  {
    name: 'color',
    type: 'string',
    default: 'rgba(22, 32, 228, 0.35)',
    description: 'Primary ray color. Defaults to BemoUI logo blue.',
  },
  {
    name: 'blur',
    type: 'number',
    default: '36',
    description: 'Blur radius applied to each ray in pixels.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '14',
    description: 'Base animation cycle duration in seconds.',
  },
  {
    name: 'length',
    type: 'string',
    default: '70vh',
    description: 'CSS length of each ray (e.g. 70vh, 500px).',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class names merged onto the root element.',
  },
];

export default function LightRaysDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          minH="420px"
          borderRadius="xl"
          overflow="hidden"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LightRays color="rgba(22, 32, 228, 0.4)" count={8} />
          <Box position="relative" zIndex={1} textAlign="center" px={6}>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Light Rays
            </Text>
            <Text mt={2} color="gray.300">
              Soft volumetric beams with BemoUI blue and green accents.
            </Text>
          </Box>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/light-rays"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Light Rays
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lightRays} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...lightRays} />
      </CliTab>
    </TabbedLayout>
  );
}
