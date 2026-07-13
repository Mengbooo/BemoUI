import { Box, Button, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import CoolMode from '../../content/Components/CoolMode/CoolMode';
import { coolMode } from '../../constants/code/Components/coolModeCode';

const PROP_DATA = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Trigger content that emits particles while pressed.',
  },
  {
    name: 'options',
    type: 'CoolParticleOptions',
    default: '{}',
    description: 'Particle settings: particle ("circle" or short text/emoji), size, particleCount, speedHorz, speedUp. Remote URLs are rejected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer interactions and particle emission.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name for the wrapper span.',
  },
];

const CoolModeDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box display="flex" flexDirection="column" alignItems="center" gap={6} py={10}>
          <CoolMode>
            <Button
              bg="#1620E4"
              color="white"
              _hover={{ bg: '#1018b8' }}
              _active={{ bg: '#0d1496' }}
              borderRadius="full"
              px={8}
            >
              Click and hold
            </Button>
          </CoolMode>

          <CoolMode options={{ particle: '✨', size: 20 }}>
            <Button
              variant="outline"
              borderColor="#7BE9C6"
              color="#1620E4"
              borderRadius="full"
              px={8}
            >
              Emoji particles
            </Button>
          </CoolMode>

          <Text fontSize="sm" color="gray.500" textAlign="center" maxW="lg">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/cool-mode"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Cool Mode
            </Link>{' '}
            · MIT License
          </Text>
        </Box>

        <PropTable data={PROP_DATA} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={coolMode} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...coolMode} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CoolModeDemo;
