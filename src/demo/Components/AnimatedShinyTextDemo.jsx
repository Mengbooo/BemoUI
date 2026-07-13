import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { AnimatedShinyText } from '../../content/Components/AnimatedShinyText/AnimatedShinyText';
import { animatedShinyText } from '../../constants/code/Components/animatedShinyTextCode';

const propData = [
  {
    name: 'shimmerWidth',
    type: 'number',
    default: '100',
    description: 'Width of the shimmer effect band in pixels.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '-',
    description: 'The content to apply the shiny animation to.',
  },
  {
    name: 'className',
    type: 'string',
    default: '-',
    description: 'Additional CSS class names for the element.',
  },
];

const AnimatedShinyTextDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack spacing={8} align="stretch" w="100%">
          <Text fontSize="sm" color="gray.400">
            Visible source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/animated-shiny-text"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI Animated Shiny Text
            </Link>
            {' '}(MIT License)
          </Text>
          <Box display="flex" justifyContent="center" py={10}>
            <AnimatedShinyText shimmerWidth={120}>
              ✨ Introducing BemoUI
            </AnimatedShinyText>
          </Box>
          <PropTable data={propData} />
        </VStack>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={animatedShinyText} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...animatedShinyText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedShinyTextDemo;
