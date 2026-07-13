import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import AnimatedThemeToggler from '../../content/Components/AnimatedThemeToggler/AnimatedThemeToggler';
import { animatedThemeToggler } from '../../constants/code/Components/animatedThemeTogglerCode';

const AnimatedThemeTogglerDemo = () => {
  const propData = [
    {
      name: 'duration',
      type: 'number',
      default: '400',
      description: 'View transition duration in milliseconds.',
    },
    {
      name: 'variant',
      type: '"circle" | "square" | "triangle" | "diamond" | "hexagon" | "rectangle" | "star"',
      default: '"circle"',
      description: 'Clip-path shape used for the theme reveal animation.',
    },
    {
      name: 'fromCenter',
      type: 'boolean',
      default: 'false',
      description: 'When true, expands the transition from the viewport center instead of the button.',
    },
    {
      name: 'theme',
      type: '"light" | "dark"',
      default: 'undefined',
      description: 'Controlled theme value. When set, the parent owns persistence.',
    },
    {
      name: 'onThemeChange',
      type: '(theme: "light" | "dark") => void',
      default: 'undefined',
      description: 'Fires after a toggle. Pair with `theme` for controlled usage.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables interaction and dims the control.',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional class name merged onto the native button.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={280} overflow="hidden">
          <Flex h="100%" align="center" justify="center" direction="column" gap={4}>
            <AnimatedThemeToggler duration={400} variant="circle" />
            <Text fontSize="sm" color="gray.500">
              Click to animate between light and dark themes
            </Text>
          </Flex>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/animated-theme-toggler"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Animated Theme Toggler
          </Link>
          {' '}(MIT License)
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={animatedThemeToggler} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...animatedThemeToggler} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedThemeTogglerDemo;
