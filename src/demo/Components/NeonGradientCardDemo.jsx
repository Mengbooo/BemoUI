import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import NeonGradientCard from '../../content/Components/NeonGradientCard/NeonGradientCard';
import { neonGradientCard } from '../../constants/code/Components/neonGradientCardCode';

const NeonGradientCardDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'ReactNode',
      default: '—',
      description: 'Content rendered inside the neon card.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional class names for the outer card container.',
    },
    {
      name: 'borderSize',
      type: 'number',
      default: '2',
      description: 'Neon border thickness in pixels.',
    },
    {
      name: 'borderRadius',
      type: 'number',
      default: '20',
      description: 'Outer corner radius of the card in pixels.',
    },
    {
      name: 'neonColors',
      type: '{ firstColor: string; secondColor: string }',
      default: "{ firstColor: '#1620E4', secondColor: '#7BE9C6' }",
      description: 'Animated gradient colors for the neon border and glow.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box maxW="360px" h="220px">
          <NeonGradientCard>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Neon Gradient Card
            </Text>
            <Text fontSize="sm" color="gray.400">
              Animated neon border card using BemoUI brand accents.
            </Text>
          </NeonGradientCard>
        </Box>
        <Text mt={6} fontSize="sm" color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/neon-gradient-card"
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
          >
            Magic UI Neon Gradient Card
          </Link>
          . MIT License.
        </Text>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={neonGradientCard} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...neonGradientCard} />
      </CliTab>
    </TabbedLayout>
  );
};

export default NeonGradientCardDemo;
