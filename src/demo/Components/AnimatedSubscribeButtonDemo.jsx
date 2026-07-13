import { useState } from 'react';
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import AnimatedSubscribeButton from '../../content/Components/AnimatedSubscribeButton/AnimatedSubscribeButton';
import { animatedSubscribeButton } from '../../constants/code/Components/animatedSubscribeButtonCode';

const propData = [
  {
    name: 'subscribeStatus',
    type: 'boolean',
    default: 'undefined',
    description:
      'Controlled subscribed state. When provided, the component is controlled and will not toggle internally.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description:
      'Exactly two <span> children: the idle label first, then the subscribed label.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional extra class names merged onto the button.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer interaction and applies a muted disabled style.',
  },
  {
    name: 'onClick',
    type: '(event) => void',
    default: '—',
    description:
      'Native click handler. In controlled mode, update subscribeStatus from this callback.',
  },
];

const AnimatedSubscribeButtonDemo = () => {
  const [controlledSubscribed, setControlledSubscribed] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading size="md" mb={2}>
              Animated Subscribe Button
            </Heading>
            <Text color="gray.400" mb={4}>
              Toggle between idle and subscribed labels with a short motion transition.
              Default accents use BemoUI blue and green.
            </Text>
            <Text fontSize="sm" color="gray.500" mb={6}>
              Adapted from{' '}
              <Link
                href="https://magicui.design/docs/components/animated-subscribe-button"
                isExternal
                color="#1620E4"
              >
                Magic UI Animated Subscribe Button
              </Link>
              . MIT License.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={3}>
              Uncontrolled
            </Text>
            <AnimatedSubscribeButton>
              <span>Subscribe</span>
              <span>Subscribed</span>
            </AnimatedSubscribeButton>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={3}>
              Controlled
            </Text>
            <AnimatedSubscribeButton
              subscribeStatus={controlledSubscribed}
              onClick={() => setControlledSubscribed((prev) => !prev)}
            >
              <span>Join waitlist</span>
              <span>You&apos;re in</span>
            </AnimatedSubscribeButton>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={3}>
              Disabled
            </Text>
            <AnimatedSubscribeButton disabled>
              <span>Subscribe</span>
              <span>Subscribed</span>
            </AnimatedSubscribeButton>
          </Box>

          <PropTable data={propData} />
        </VStack>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={animatedSubscribeButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...animatedSubscribeButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedSubscribeButtonDemo;
