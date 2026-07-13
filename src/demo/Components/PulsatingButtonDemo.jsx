import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { PulsatingButton } from '../../content/Components/PulsatingButton/PulsatingButton';
import { pulsatingButton } from '../../constants/code/Components/pulsatingButtonCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Visible button label or content.',
  },
  {
    name: 'pulseColor',
    type: 'string',
    default: '#1620E4',
    description: 'Accent color for the pulse or ripple effect.',
  },
  {
    name: 'duration',
    type: 'string',
    default: '1.5s',
    description: 'CSS duration for the repeating animation.',
  },
  {
    name: 'distance',
    type: 'string',
    default: '8px',
    description: 'Spread distance used by the pulse shadow.',
  },
  {
    name: 'variant',
    type: '"pulse" | "ripple"',
    default: '"pulse"',
    description: 'Chooses the decorative animation style.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and stops the accent animation.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional extra class names for layout or theming.',
  },
];

const PulsatingButtonDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box py={8}>
          <Flex gap={6} align="center" justify="center" wrap="wrap">
            <PulsatingButton>Pulse</PulsatingButton>
            <PulsatingButton variant="ripple" pulseColor="#7BE9C6">
              Ripple
            </PulsatingButton>
            <PulsatingButton disabled>Disabled</PulsatingButton>
          </Flex>

          <Text fontSize="sm" color="gray.500" mt={6} textAlign="center">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/pulsating-button"
              isExternal
              color="#1620E4"
            >
              Magic UI Pulsating Button
            </Link>
            {' '}
            · MIT License
          </Text>
        </Box>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={pulsatingButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...pulsatingButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default PulsatingButtonDemo;
