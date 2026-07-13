import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TypingAnimation from '../../content/Components/TypingAnimation/TypingAnimation';
import { typingAnimation } from '../../constants/code/Components/typingAnimationCode';

const TypingAnimationDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'string',
      default: 'undefined',
      description: 'Single string to type when words is not provided.',
    },
    {
      name: 'words',
      type: 'string[]',
      default: 'undefined',
      description: 'Array of strings to type, pause, and optionally delete through.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '100',
      description: 'Fallback typing delay in ms when typeSpeed is not set.',
    },
    {
      name: 'typeSpeed',
      type: 'number',
      default: 'duration',
      description: 'Delay in ms between typed characters.',
    },
    {
      name: 'deleteSpeed',
      type: 'number',
      default: 'typeSpeed / 2',
      description: 'Delay in ms between deleted characters.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: 'Initial delay in ms before typing starts.',
    },
    {
      name: 'pauseDelay',
      type: 'number',
      default: '1000',
      description: 'Pause in ms after a word is fully typed before deleting.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'false',
      description: 'Whether to continuously cycle through words.',
    },
    {
      name: 'as',
      type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'section' | 'article' | 'li'",
      default: "'span'",
      description: 'Semantic HTML element to render as the root.',
    },
    {
      name: 'startOnView',
      type: 'boolean',
      default: 'true',
      description: 'Start the animation when the element enters the viewport.',
    },
    {
      name: 'showCursor',
      type: 'boolean',
      default: 'true',
      description: 'Show a typing caret while animating.',
    },
    {
      name: 'blinkCursor',
      type: 'boolean',
      default: 'true',
      description: 'Blink the caret (disabled under prefers-reduced-motion).',
    },
    {
      name: 'cursorStyle',
      type: "'line' | 'block' | 'underscore'",
      default: "'line'",
      description: 'Visual style of the caret accent.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class names merged onto the root element.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={8}
          minH="180px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#111116"
          _dark={{ bg: 'gray.900' }}
        >
          <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" color="gray.900" _dark={{ color: 'white' }}>
            <TypingAnimation
              words={['BemoUI', 'Type safely', 'Ship faster']}
              loop
              typeSpeed={80}
              deleteSpeed={40}
              pauseDelay={1200}
              cursorStyle="line"
            />
          </Text>
        </Box>

        <Text fontSize="sm" mt={4} color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/typing-animation"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Typing Animation
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={typingAnimation} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...typingAnimation} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TypingAnimationDemo;
