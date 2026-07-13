import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import InteractiveHoverButton from '../../content/Components/InteractiveHoverButton/InteractiveHoverButton';
import { interactiveHoverButton } from '../../constants/code/Components/interactiveHoverButtonCode';

const InteractiveHoverButtonDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'React.ReactNode',
      default: "'Button'",
      description: 'Visible button label rendered in both rest and hover states.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional extra class names for layout or theming overrides.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables pointer interaction and suppresses hover animation.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'Native button type attribute.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box display="flex" flexDirection="column" alignItems="center" gap={6} py={8}>
          <InteractiveHoverButton>Get Started</InteractiveHoverButton>
          <InteractiveHoverButton disabled>Disabled</InteractiveHoverButton>
        </Box>
        <Text fontSize="sm" color="gray.500" mt={4}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/interactive-hover-button"
            isExternal
            color="#1620E4"
          >
            Magic UI Interactive Hover Button
          </Link>
          . MIT License.
        </Text>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={interactiveHoverButton} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...interactiveHoverButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default InteractiveHoverButtonDemo;
