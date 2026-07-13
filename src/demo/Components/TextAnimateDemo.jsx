import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TextAnimate from '../../content/Components/TextAnimate/TextAnimate';
import { textAnimate } from '../../constants/code/Components/textAnimateCode';

const propData = [
  {
    name: 'children',
    type: 'string',
    default: '—',
    description: 'The text content to animate.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Class name applied to the root motion element.',
  },
  {
    name: 'segmentClassName',
    type: 'string',
    default: 'undefined',
    description: 'Class name applied to each animated segment.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay in seconds before the animation starts.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.3',
    description: 'Base duration used to compute stagger timing.',
  },
  {
    name: 'variants',
    type: 'Variants',
    default: 'undefined',
    description: 'Custom framer-motion item variants. Overrides animation presets.',
  },
  {
    name: 'as',
    type: "'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | ...",
    default: "'p'",
    description: 'Semantic element type rendered as a motion component.',
  },
  {
    name: 'by',
    type: "'text' | 'word' | 'character' | 'line'",
    default: "'word'",
    description: 'How the text is split into animated segments.',
  },
  {
    name: 'startOnView',
    type: 'boolean',
    default: 'true',
    description: 'When true, animation starts when the element enters the viewport.',
  },
  {
    name: 'once',
    type: 'boolean',
    default: 'false',
    description: 'When true, viewport animation runs only once.',
  },
  {
    name: 'animation',
    type: "'fadeIn' | 'blurIn' | 'blurInUp' | 'blurInDown' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'scaleDown'",
    default: "'fadeIn'",
    description: 'Built-in animation preset.',
  },
  {
    name: 'accessible',
    type: 'boolean',
    default: 'true',
    description: 'Exposes full text via aria-label and a screen-reader-only span; hides animated segments from AT.',
  },
];

const TextAnimateDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Stack spacing={8} py={4}>
          <Box
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            borderRadius="lg"
            p={{ base: 6, md: 10 }}
            bg="#111116"
          >
            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              duration={0.45}
              once
              className="bemo-text-animate__accent"
              style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.25 }}
            >
              Animate text with BemoUI
            </TextAnimate>
            <Box mt={4}>
              <TextAnimate
                by="character"
                animation="fadeIn"
                duration={0.6}
                once
                style={{ fontSize: '1.125rem', color: '#4A5568' }}
              >
                Staggered entrances for words, characters, and lines.
              </TextAnimate>
            </Box>
            <Box
              mt={6}
              h="3px"
              w="72px"
              borderRadius="full"
              bg="linear-gradient(90deg, #1620E4 0%, #7BE9C6 100%)"
              aria-hidden="true"
            />
          </Box>

          <Box>
            <Heading as="h3" size="sm" mb={3} color="gray.700">
              Slide variants
            </Heading>
            <Stack spacing={3}>
              <TextAnimate by="word" animation="slideUp" once>
                Slide up on enter
              </TextAnimate>
              <TextAnimate by="word" animation="slideLeft" once>
                Slide left on enter
              </TextAnimate>
              <TextAnimate by="word" animation="scaleUp" once className="bemo-text-animate__accent-secondary">
                Scale up with spring
              </TextAnimate>
            </Stack>
          </Box>

          <Text fontSize="sm" color="gray.500">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/text-animate"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI Text Animate
            </Link>
            . MIT License.
          </Text>
        </Stack>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={textAnimate} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...textAnimate} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TextAnimateDemo;
