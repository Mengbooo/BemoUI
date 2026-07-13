import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { NoiseTexture } from '../../content/Components/NoiseTexture/NoiseTexture';
import { noiseTexture } from '../../constants/code/Components/noiseTextureCode';

const propData = [
  {
    name: 'frequency',
    type: 'number',
    default: '0.4',
    description: 'baseFrequency for feTurbulence; higher values yield finer-grained noise.',
  },
  {
    name: 'octaves',
    type: 'number',
    default: '6',
    description: 'numOctaves for feTurbulence; more octaves add detail at smaller scales.',
  },
  {
    name: 'slope',
    type: 'number',
    default: '0.15',
    description: 'Linear slope on each channel after desaturation; adjusts noise contrast.',
  },
  {
    name: 'noiseOpacity',
    type: 'number',
    default: '0.6',
    description: 'Opacity of the filled noise layer (rect).',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Extra classes merged onto the root svg element.',
  },
];

const NoiseTextureDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="280px"
          borderRadius="lg"
          overflow="hidden"
          bg="#1620E4"
          mb={6}
        >
          <NoiseTexture />
          <Box
            position="relative"
            zIndex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="full"
          >
            <Text color="white" fontWeight="bold" fontSize="xl">
              BemoUI Noise Texture
            </Text>
          </Box>
        </Box>

        <Box
          position="relative"
          h="200px"
          borderRadius="lg"
          overflow="hidden"
          bg="#7BE9C6"
          mb={6}
        >
          <NoiseTexture frequency={0.65} noiseOpacity={0.45} slope={0.2} />
          <Box position="relative" zIndex={1} p={4}>
            <Text color="black" fontWeight="semibold">
              Custom frequency, slope & opacity
            </Text>
          </Box>
        </Box>

        <Box
          position="relative"
          h="160px"
          borderRadius="lg"
          overflow="hidden"
          bg="gray.900"
          mb={6}
        >
          <NoiseTexture frequency={0.25} octaves={4} noiseOpacity={0.7} />
          <Box position="relative" zIndex={1} p={4}>
            <Text color="white" fontWeight="medium">
              Coarser grain on dark surface
            </Text>
          </Box>
        </Box>

        <Text fontSize="sm" color="gray.500" mt={2} mb={6}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/noise-texture"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Noise Texture
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={noiseTexture} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...noiseTexture} />
      </CliTab>
    </TabbedLayout>
  );
};

export default NoiseTextureDemo;
