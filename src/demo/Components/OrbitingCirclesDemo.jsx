import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { OrbitingCircles } from '../../content/Components/OrbitingCircles/OrbitingCircles';
import { orbitingCircles } from '../../constants/code/Components/orbitingCirclesCode';

const OrbitingCirclesDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      description: 'Nodes rendered as orbiting items, evenly spaced around the circle.',
    },
    {
      name: 'radius',
      type: 'number',
      default: '160',
      description: 'Orbit radius in pixels from the center.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '20',
      description: 'Base animation duration in seconds before speed is applied.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '1',
      description: 'Speed multiplier applied to duration (higher is faster).',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: 'Animation delay in seconds for all orbiting items.',
    },
    {
      name: 'iconSize',
      type: 'number',
      default: '30',
      description: 'Width and height of each orbiting item in pixels.',
    },
    {
      name: 'path',
      type: 'boolean',
      default: 'true',
      description: 'Whether to render the decorative orbit path circle.',
    },
    {
      name: 'reverse',
      type: 'boolean',
      default: 'false',
      description: 'Reverses the orbit animation direction.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class name for the root container.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="400px"
          overflow="hidden"
          borderRadius="md"
          bg="#0D0D12"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <Box position="relative" w="320px" h="320px">
            <OrbitingCircles radius={120} iconSize={36} duration={20} speed={1}>
              <Box w="100%" h="100%" borderRadius="full" bg="#1620E4" />
              <Box w="100%" h="100%" borderRadius="full" bg="#7BE9C6" />
              <Box w="100%" h="100%" borderRadius="full" bg="#1620E4" />
              <Box w="100%" h="100%" borderRadius="full" bg="#7BE9C6" />
            </OrbitingCircles>
          </Box>
        </Box>
        <Text mt={4} fontSize="sm" color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/orbiting-circles"
            color="#1620E4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Magic UI Orbiting Circles
          </Link>
          . MIT License.
        </Text>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={orbitingCircles} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...orbitingCircles} />
      </CliTab>
    </TabbedLayout>
  );
};

export default OrbitingCirclesDemo;
