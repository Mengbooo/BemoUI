import { Box, Link, Text } from '@chakra-ui/react';
import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Text3DFlip from '../../content/Components/Text3DFlip/Text3DFlip';
import { text3DFlip } from '../../constants/code/Components/text3DFlipCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Text content to split into characters and flip in 3D.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: '"p"',
    description: 'Root HTML element or component used for the control.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Class names applied to the root element.',
  },
  {
    name: 'textClassName',
    type: 'string',
    default: 'undefined',
    description: 'Class names applied to the front character faces.',
  },
  {
    name: 'flipTextClassName',
    type: 'string',
    default: 'undefined',
    description: 'Class names applied to the secondary flip faces.',
  },
  {
    name: 'staggerDuration',
    type: 'number',
    default: '0.05',
    description: 'Delay step in seconds between character flips.',
  },
  {
    name: 'staggerFrom',
    type: '"first" | "last" | "center" | "random" | number',
    default: '"first"',
    description: 'Origin used when computing stagger delays.',
  },
  {
    name: 'transition',
    type: 'ValueAnimationTransition | AnimationOptions',
    default: '{ type: "spring", damping: 30, stiffness: 300 }',
    description: 'framer-motion transition applied to the flip animation.',
  },
  {
    name: 'rotateDirection',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"right"',
    description: 'Axis and direction of the 3D character flip.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables hover/focus flipping and dims the control.',
  },
];

const Text3DFlipDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" overflow="hidden" minH={240} display="flex" alignItems="center" justifyContent="center" p={8}>
          <Text3DFlip
            rotateDirection="right"
            staggerDuration={0.05}
            staggerFrom="first"
            style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            BemoUI Flip
          </Text3DFlip>
        </Box>

        <Box mt={4} mb={2}>
          <Text fontSize="sm" color="gray.500">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/text-3d-flip"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI Text 3D Flip
            </Link>
            {' '}· MIT License
          </Text>
        </Box>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={text3DFlip} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...text3DFlip} />
      </CliTab>
    </TabbedLayout>
  );
};

export default Text3DFlipDemo;
