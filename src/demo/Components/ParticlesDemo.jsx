import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Particles from '../../content/Components/Particles/Particles';
import { particles } from '../../constants/code/Components/particlesCode';

const propData = [
  {
    name: 'quantity',
    type: 'number',
    default: '100',
    description: 'Number of particles rendered on the canvas.',
  },
  {
    name: 'staticity',
    type: 'number',
    default: '50',
    description: 'How strongly particles resist mouse magnetism.',
  },
  {
    name: 'ease',
    type: 'number',
    default: '50',
    description: 'Easing divisor for mouse-follow translation.',
  },
  {
    name: 'size',
    type: 'number',
    default: '0.4',
    description: 'Base particle radius before random variance.',
  },
  {
    name: 'refresh',
    type: 'boolean',
    default: 'false',
    description: 'Toggle to force a canvas re-init of particles.',
  },
  {
    name: 'color',
    type: 'string',
    default: '#1620E4',
    description: 'Hex fill color for particles (defaults to BemoUI blue).',
  },
  {
    name: 'vx',
    type: 'number',
    default: '0',
    description: 'Constant horizontal drift applied each frame.',
  },
  {
    name: 'vy',
    type: 'number',
    default: '0',
    description: 'Constant vertical drift applied each frame.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class names merged onto the root container.',
  },
];

const ParticlesDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="420px"
          w="100%"
          bg="gray.900"
          borderRadius="md"
          overflow="hidden"
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Particles quantity={120} color="#1620E4" ease={70} staticity={40} />
          <Particles quantity={50} color="#7BE9C6" ease={90} size={0.5} staticity={60} />
          <Box
            position="relative"
            zIndex={1}
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
          >
            <Text color="white" fontSize="xl" fontWeight="semibold">
              Particles
            </Text>
          </Box>
        </Box>

        <Text fontSize="sm" mt={4} color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/particles"
            isExternal
            color="#7BE9C6"
            textDecoration="underline"
          >
            Magic UI Particles
          </Link>
          {' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={particles} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...particles} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ParticlesDemo;
