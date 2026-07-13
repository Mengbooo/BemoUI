import {
  Box,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { Lens } from '../../content/Components/Lens/Lens';
import { lens } from '../../constants/code/Components/lensCode';

const PROP_DATA = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Content rendered under the magnifying lens.',
  },
  {
    name: 'zoomFactor',
    type: 'number',
    default: '1.3',
    description: 'Scale factor applied inside the lens (must be > 1).',
  },
  {
    name: 'lensSize',
    type: 'number',
    default: '170',
    description: 'Diameter of the circular lens in pixels.',
  },
  {
    name: 'isStatic',
    type: 'boolean',
    default: 'false',
    description: 'Keeps the lens fixed at `position` instead of following pointer/focus.',
  },
  {
    name: 'position',
    type: '{ x: number; y: number }',
    default: '{ x: 0, y: 0 }',
    description: 'Fixed lens coordinates when `isStatic` is true.',
  },
  {
    name: 'defaultPosition',
    type: '{ x: number; y: number }',
    default: 'undefined',
    description: 'Resting lens position when not hovering/focused.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.1',
    description: 'Enter/exit animation duration in seconds (ignored when reduced motion is preferred).',
  },
  {
    name: 'lensColor',
    type: 'string',
    default: "'#1620E4'",
    description: 'Mask color used for the circular lens highlight.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'Zoom Area'",
    description: 'Accessible name for the interactive zoom region.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer/keyboard interaction and lens overlay.',
  },
];

export default function LensDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="md" mb={2}>
              Lens
            </Heading>
            <Text color="gray.400" mb={4}>
              Hover or focus the image to magnify a circular region. Use arrow keys to move the lens and Escape to dismiss.
            </Text>
            <Box maxW="420px" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="xl" overflow="hidden" bg="#111116">
              <Lens zoomFactor={1.5} lensSize={160} lensColor="#1620E4" ariaLabel="Product zoom area">
                <Box
                  h="280px"
                  w="100%"
                  bgGradient="linear(135deg, #1620E4 0%, #7BE9C6 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    inset={0}
                    opacity={0.25}
                    backgroundImage="radial-gradient(circle at 30% 30%, white 0, transparent 40%), radial-gradient(circle at 70% 70%, #7BE9C6 0, transparent 45%)"
                  />
                  <Text fontSize="3xl" fontWeight="bold" color="white" letterSpacing="wide" zIndex={1}>
                    BemoUI
                  </Text>
                </Box>
              </Lens>
            </Box>
          </Box>

          <Box>
            <Heading size="sm" mb={2}>
              Static lens
            </Heading>
            <Box maxW="420px" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="xl" overflow="hidden">
              <Lens
                isStatic
                position={{ x: 180, y: 120 }}
                zoomFactor={1.4}
                lensSize={140}
                lensColor="#7BE9C6"
                ariaLabel="Static zoom preview"
              >
                <Box h="240px" w="100%" bg="gray.900" display="grid" placeItems="center">
                  <Text color="#7BE9C6" fontWeight="semibold">
                    Fixed magnifier
                  </Text>
                </Box>
              </Lens>
            </Box>
          </Box>

          <PropTable data={PROP_DATA} />

          <Text fontSize="sm" color="gray.500">
            Adapted from{' '}
            <Link href="https://magicui.design/docs/components/lens" isExternal color="#1620E4">
              Magic UI Lens
            </Link>{' '}
            · MIT License
          </Text>
        </VStack>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lens} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...lens} />
      </CliTab>
    </TabbedLayout>
  );
}
