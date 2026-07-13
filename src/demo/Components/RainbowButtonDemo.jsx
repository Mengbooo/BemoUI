import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import RainbowButton from '../../content/Components/RainbowButton/RainbowButton';
import { rainbowButton } from '../../constants/code/Components/rainbowButtonCode';

const propData = [
  {
    name: 'variant',
    type: "'default' | 'outline'",
    default: "'default'",
    description: 'Visual style of the button.',
  },
  {
    name: 'size',
    type: "'default' | 'sm' | 'lg' | 'icon'",
    default: "'default'",
    description: 'Controls padding and dimensions.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction and dims the button.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional extra class names.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Button label or content.',
  },
];

const RainbowButtonDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={300} overflow="hidden">
          <Flex h="100%" align="center" justify="center" gap={4} wrap="wrap" p={6}>
            <RainbowButton>Get Started</RainbowButton>
            <RainbowButton variant="outline">Outline</RainbowButton>
            <RainbowButton size="sm">Small</RainbowButton>
            <RainbowButton size="lg">Large</RainbowButton>
            <RainbowButton disabled>Disabled</RainbowButton>
          </Flex>
        </Box>

        <Text fontSize="sm" color="gray.500" mt={4}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/rainbow-button"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Rainbow Button
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={rainbowButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...rainbowButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default RainbowButtonDemo;
