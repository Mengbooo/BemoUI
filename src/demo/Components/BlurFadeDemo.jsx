import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import BlurFade from '../../content/Components/BlurFade/BlurFade';
import { blurFade } from '../../constants/code/Components/blurFadeCode';

const propData = [
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Content rendered inside the animated wrapper.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name applied to the wrapper element.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.4',
    description: 'Animation duration in seconds.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Additional delay in seconds before the animation starts.',
  },
  {
    name: 'offset',
    type: 'number',
    default: '6',
    description: 'Travel distance in pixels for the entrance motion.',
  },
  {
    name: 'direction',
    type: '"up" | "down" | "left" | "right"',
    default: '"down"',
    description: 'Direction the content travels from while fading in.',
  },
  {
    name: 'inView',
    type: 'boolean',
    default: 'false',
    description: 'When true, animation waits until the element enters the viewport.',
  },
  {
    name: 'inViewMargin',
    type: 'string',
    default: '"-50px"',
    description: 'Root margin passed to the in-view detection logic.',
  },
  {
    name: 'blur',
    type: 'string',
    default: '"6px"',
    description: 'Initial CSS blur radius applied before the content focuses.',
  },
];

export default function BlurFadeDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          py={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={6}
        >
          <BlurFade delay={0.1} inView>
            <Heading size="lg" color="#1620E4">
              Blur Fade
            </Heading>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <Box
              px={6}
              py={4}
              borderRadius="md"
              bg="#7BE9C6"
              color="black"
              fontWeight="semibold"
            >
              Smooth blur-to-focus entrance
            </Box>
          </BlurFade>
          <BlurFade delay={0.4} direction="up" inView>
            <Text color="gray.400" maxW="md" textAlign="center">
              Animate children with a blur and offset fade as they enter view.
            </Text>
          </BlurFade>
        </Box>

        <Text fontSize="sm" color="gray.500" mt={8}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/blur-fade"
            isExternal
            color="#1620E4"
          >
            Magic UI Blur Fade
          </Link>
          {' · '}MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={blurFade} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...blurFade} />
      </CliTab>
    </TabbedLayout>
  );
}
