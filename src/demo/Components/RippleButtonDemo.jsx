import { Box, Link, Stack, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import RippleButton from '../../content/Components/RippleButton/RippleButton';
import { rippleButton } from '../../constants/code/Components/rippleButtonCode';

const RippleButtonDemo = () => {
  const propData = [
    {
      name: 'rippleColor',
      type: 'string',
      default: "'#ffffff'",
      description: 'Fill color applied to each click ripple.',
    },
    {
      name: 'duration',
      type: 'string',
      default: "'600ms'",
      description: 'CSS duration for the ripple animation.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the button and prevents ripples.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      description: 'Visible button label or content.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box py={6} display="flex" flexDirection="column" alignItems="flex-start" gap={4}>
          <Stack direction="row" spacing={4} flexWrap="wrap">
            <RippleButton>Click me</RippleButton>
            <RippleButton rippleColor="#7BE9C6">Green ripple</RippleButton>
            <RippleButton duration="900ms">Slow ripple</RippleButton>
            <RippleButton disabled>Disabled</RippleButton>
          </Stack>
          <Text fontSize="sm" color="gray.500">
            Source adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/ripple-button"
              isExternal
              color="#1620E4"
            >
              Magic UI Ripple Button
            </Link>
            . MIT License.
          </Text>
        </Box>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={rippleButton} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...rippleButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default RippleButtonDemo;
