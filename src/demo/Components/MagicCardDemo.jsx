import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import MagicCard from '../../content/Components/MagicCard/MagicCard';
import { magicCard } from '../../constants/code/Components/magicCardCode';

const MagicCardDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content rendered inside the card surface.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class names merged onto the root element.',
    },
    {
      name: 'mode',
      type: "'gradient' | 'orb'",
      default: "'gradient'",
      description: 'Visual accent mode: mouse-following spotlight or spring-driven orb.',
    },
    {
      name: 'gradientSize',
      type: 'number',
      default: '200',
      description: 'Radius in pixels of the gradient border and spotlight.',
    },
    {
      name: 'gradientFrom',
      type: 'string',
      default: "'#1620E4'",
      description: 'Start color of the interactive border gradient.',
    },
    {
      name: 'gradientTo',
      type: 'string',
      default: "'#7BE9C6'",
      description: 'End color of the interactive border gradient.',
    },
    {
      name: 'gradientColor',
      type: 'string',
      default: "'#262626'",
      description: 'Spotlight fill color used in gradient mode.',
    },
    {
      name: 'gradientOpacity',
      type: 'number',
      default: '0.8',
      description: 'Opacity of the gradient-mode spotlight overlay.',
    },
    {
      name: 'glowFrom',
      type: 'string',
      default: "'#1620E4'",
      description: 'Orb gradient start color (orb mode only).',
    },
    {
      name: 'glowTo',
      type: 'string',
      default: "'#7BE9C6'",
      description: 'Orb gradient end color (orb mode only).',
    },
    {
      name: 'glowAngle',
      type: 'number',
      default: '90',
      description: 'Angle in degrees for the orb linear gradient.',
    },
    {
      name: 'glowSize',
      type: 'number',
      default: '420',
      description: 'Orb diameter in pixels.',
    },
    {
      name: 'glowBlur',
      type: 'number',
      default: '60',
      description: 'Blur radius applied to the orb glow.',
    },
    {
      name: 'glowOpacity',
      type: 'number',
      default: '0.9',
      description: 'Target opacity for the orb while hovered.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables pointer interaction and dims the card.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack align="stretch" spacing={8}>
          <Box
            borderRadius="16px"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
            maxW="420px"
          >
            <MagicCard className="rounded-[16px]" gradientFrom="#1620E4" gradientTo="#7BE9C6">
              <Box p={6} minH="160px">
                <Text fontWeight="semibold" mb={2}>
                  MagicCard
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Move the pointer across the card to reveal the BemoUI blue and green border
                  spotlight.
                </Text>
              </Box>
            </MagicCard>
          </Box>

          <Box
            borderRadius="16px"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
            maxW="420px"
          >
            <MagicCard
              mode="orb"
              className="rounded-[16px]"
              glowFrom="#1620E4"
              glowTo="#7BE9C6"
              gradientFrom="#1620E4"
              gradientTo="#7BE9C6"
            >
              <Box p={6} minH="160px">
                <Text fontWeight="semibold" mb={2}>
                  Orb mode
                </Text>
                <Text fontSize="sm" color="gray.400">
                  A spring-smoothed glow follows the cursor while preserving reduced-motion
                  preferences.
                </Text>
              </Box>
            </MagicCard>
          </Box>

          <Text fontSize="sm" color="gray.400">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/magic-card"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Magic Card
            </Link>
            . MIT License.
          </Text>

          <PropTable data={propData} />
        </VStack>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={magicCard} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...magicCard} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MagicCardDemo;
