import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import VideoText from '../../content/Components/VideoText/VideoText';
import { videoText } from '../../constants/code/Components/videoTextCode';

const VideoTextDemo = () => {
  const propData = [
    {
      name: 'src',
      type: 'string',
      default: 'undefined',
      description: 'Optional video source. When omitted, a brand gradient fallback is shown.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '—',
      description: 'Text content used for the mask and screen-reader label.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional class names for the root container.',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      default: 'true',
      description: 'Autoplay the video when reduced motion is not preferred.',
    },
    {
      name: 'muted',
      type: 'boolean',
      default: 'true',
      description: 'Mute the video element.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'Loop the video element.',
    },
    {
      name: 'preload',
      type: "'auto' | 'metadata' | 'none'",
      default: "'auto'",
      description: 'Native video preload strategy.',
    },
    {
      name: 'fontSize',
      type: 'string | number',
      default: '10',
      description: 'Mask text size. Numbers are treated as viewport-width units.',
    },
    {
      name: 'fontWeight',
      type: 'string | number',
      default: "'bold'",
      description: 'Mask text font weight.',
    },
    {
      name: 'fontFamily',
      type: 'string',
      default: "'sans-serif'",
      description: 'Mask text font family.',
    },
    {
      name: 'textAnchor',
      type: 'string',
      default: "'middle'",
      description: 'SVG text-anchor used for the mask text.',
    },
    {
      name: 'dominantBaseline',
      type: 'string',
      default: "'middle'",
      description: 'SVG dominant-baseline used for the mask text.',
    },
    {
      name: 'as',
      type: 'ElementType',
      default: "'div'",
      description: 'Root element type for the component container.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="280px"
          w="100%"
          borderRadius="lg"
          overflow="hidden"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="gray.900"
        >
          <VideoText fontSize={14} fontWeight="bold">
            BEMO
          </VideoText>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/video-text"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Video Text
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={videoText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...videoText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default VideoTextDemo;
