import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import ShinyButton from '../../content/Components/ShinyButton/ShinyButton';
import { shinyButton } from '../../constants/code/Components/shinyButtonCode';

const propData = [
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Button label content.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer interaction and dims the control.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description: 'Native button type attribute.',
  },
];

const ShinyButtonDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box py={8} display="flex" justifyContent="center">
          <ShinyButton>Shiny Button</ShinyButton>
        </Box>

        <VStack align="start" spacing={2} mt={4} mb={6}>
          <Text fontSize="sm" color="gray.500">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/shiny-button"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Shiny Button
            </Link>
            . MIT License.
          </Text>
        </VStack>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={shinyButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...shinyButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ShinyButtonDemo;
