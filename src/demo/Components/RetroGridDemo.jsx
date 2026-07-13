import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import RetroGrid from '../../content/Components/RetroGrid/RetroGrid';
import { retroGrid } from '../../constants/code/Components/retroGridCode';

const PROP_DATA = [
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the grid container.',
  },
  {
    name: 'angle',
    type: 'number',
    default: '65',
    description: 'Rotation angle of the grid plane in degrees (clamped 1–89).',
  },
  {
    name: 'cellSize',
    type: 'number',
    default: '60',
    description: 'Grid cell size in pixels.',
  },
  {
    name: 'opacity',
    type: 'number',
    default: '0.5',
    description: 'Grid opacity between 0 and 1.',
  },
  {
    name: 'lightLineColor',
    type: 'string',
    default: '#1620E4',
    description: 'Grid line color in light mode.',
  },
  {
    name: 'darkLineColor',
    type: 'string',
    default: '#7BE9C6',
    description: 'Grid line color in dark mode.',
  },
];

export default function RetroGridDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="420px"
          w="100%"
          overflow="hidden"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#0D0D12"
          _dark={{ borderColor: 'gray.700', bg: 'gray.900' }}
        >
          <RetroGrid />
          <VStack
            position="relative"
            zIndex={1}
            h="100%"
            justify="center"
            spacing={3}
            px={6}
            textAlign="center"
          >
            <Heading size="lg" color="gray.800" _dark={{ color: 'white' }}>
              RetroGrid
            </Heading>
            <Text color="gray.400" _dark={{ color: 'gray.300' }} maxW="md">
              Animated perspective grid backdrop for hero sections and product showcases.
            </Text>
          </VStack>
        </Box>
        <Text fontSize="sm" color="gray.400" _dark={{ color: 'gray.400' }} mt={4}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/retro-grid"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Retro Grid
          </Link>
          . Source available under the MIT License.
        </Text>
        <PropTable data={PROP_DATA} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={retroGrid} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...retroGrid} />
      </CliTab>
    </TabbedLayout>
  );
}
