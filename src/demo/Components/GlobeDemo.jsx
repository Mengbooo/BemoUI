import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Globe from '../../content/Components/Globe/Globe';
import { globe } from '../../constants/code/Components/globeCode';

const propData = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Optional class name for the globe container.',
  },
  {
    name: 'config',
    type: 'GlobeConfig',
    default: 'DEFAULT_CONFIG',
    description: 'Visual configuration including markers, colors, samples, phi, and theta.',
  },
  {
    name: 'autoRotate',
    type: 'boolean',
    default: 'true',
    description: 'Enables idle rotation when motion is allowed and the globe is not dragged.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer and keyboard interaction.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'Interactive 3D globe',
    description: 'Accessible label announced for the canvas.',
  },
];

const GlobeDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          w="100%"
          h={{ base: '320px', md: '420px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          borderRadius="xl"
          bg="blackAlpha.400"
        >
          <Globe />
        </Box>

        <VStack align="start" spacing={2} mt={6}>
          <Text fontSize="sm" color="gray.400">
            Drag to rotate, or focus the globe and use the left/right arrow keys. Auto-rotation respects
            prefers-reduced-motion.
          </Text>
          <Text fontSize="sm" color="gray.500">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/globe"
              isExternal
              color="#7BE9C6"
              textDecoration="underline"
            >
              Magic UI Globe
            </Link>{' '}
            · MIT License
          </Text>
        </VStack>

        <Box mt={8}>
          <PropTable data={propData} />
        </Box>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={globe} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...globe} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GlobeDemo;
