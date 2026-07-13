import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import AnimatedGradientText from '../../content/Components/AnimatedGradientText/AnimatedGradientText';
import { animatedGradientText } from '../../constants/code/Components/animatedGradientTextCode';

const AnimatedGradientTextDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      description: 'Content rendered inside the gradient text.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '1',
      description: 'Multiplier for the gradient background size (higher values increase perceived motion).',
    },
    {
      name: 'colorFrom',
      type: 'string',
      default: '#1620E4',
      description: 'Starting and ending color of the animated gradient.',
    },
    {
      name: 'colorTo',
      type: 'string',
      default: '#7BE9C6',
      description: 'Middle color of the animated gradient.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional class names applied to the root element.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box>
        <Text mb={4}>
          Animated gradient text effect. Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/animated-gradient-text"
            isExternal
            color="#1620E4"
          >
            Magic UI Animated Gradient Text <ExternalLinkIcon mx="2px" />
          </Link>
          {' '}(MIT License).
        </Text>

        <Flex
          justify="center"
          align="center"
          py={12}
          mb={6}
          borderWidth="1px"
          borderRadius="md"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <AnimatedGradientText
            style={{ fontSize: '1.5rem', fontWeight: 600 }}
          >
            BemoUI Animated Gradient Text
          </AnimatedGradientText>
        </Flex>

          <PropTable data={propData} />
        </Box>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={animatedGradientText} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...animatedGradientText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedGradientTextDemo;
