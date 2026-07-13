import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import WarpBackground from '../../content/Components/WarpBackground/WarpBackground';
import { warpBackground } from '../../constants/code/Components/warpBackgroundCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Foreground content rendered above the warp scene.',
  },
  {
    name: 'perspective',
    type: 'number',
    default: '100',
    description: 'CSS perspective depth in pixels for the 3D grid.',
  },
  {
    name: 'beamsPerSide',
    type: 'number',
    default: '3',
    description: 'Number of traveling beams generated on each side.',
  },
  {
    name: 'beamSize',
    type: 'number',
    default: '5',
    description: 'Grid cell size percentage used for beam width and spacing.',
  },
  {
    name: 'beamDelayMax',
    type: 'number',
    default: '3',
    description: 'Maximum animation delay in seconds for beams.',
  },
  {
    name: 'beamDelayMin',
    type: 'number',
    default: '0',
    description: 'Minimum animation delay in seconds for beams.',
  },
  {
    name: 'beamDuration',
    type: 'number',
    default: '3',
    description: 'Duration in seconds for one beam travel cycle.',
  },
  {
    name: 'gridColor',
    type: 'string',
    default: 'rgba(128, 128, 128, 0.35)',
    description: 'Color used for the perspective grid lines.',
  },
  {
    name: 'className',
    type: 'string',
    default: '-',
    description: 'Optional class name merged onto the root container.',
  },
];

const WarpBackgroundDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" overflow="hidden" borderRadius="lg" mb={6}>
          <WarpBackground
            perspective={120}
            beamsPerSide={3}
            beamSize={5}
            beamDuration={3}
            gridColor="rgba(22, 32, 228, 0.2)"
          >
            <Box textAlign="center" py={8}>
              <Heading as="h2" size="lg" mb={2} color="#1620E4">
                WarpBackground
              </Heading>
              <Text color="gray.400">
                Perspective grid with BemoUI accent beams (#1620E4 / #7BE9C6).
              </Text>
            </Box>
          </WarpBackground>
        </Box>

        <Text fontSize="sm" color="gray.500" mb={6}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/warp-background"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Warp Background
          </Link>
          . Source available under the MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={warpBackground} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...warpBackground} />
      </CliTab>
    </TabbedLayout>
  );
};

export default WarpBackgroundDemo;
