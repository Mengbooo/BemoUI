import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import HeroVideoDialog from '../../content/Components/HeroVideoDialog/HeroVideoDialog';
import { heroVideoDialog } from '../../constants/code/Components/heroVideoDialogCode';

const demoThumbnail =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1620E4"/>
          <stop offset="100%" stop-color="#7BE9C6"/>
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#ffffff" font-family="system-ui,sans-serif" font-size="72" text-anchor="middle" dominant-baseline="middle">BemoUI Hero Video</text>
    </svg>`
  );

const propData = [
  {
    name: 'videoSrc',
    type: 'string',
    default: '—',
    description: 'Embed URL loaded in the dialog iframe when the video opens.',
  },
  {
    name: 'thumbnailSrc',
    type: 'string',
    default: '—',
    description: 'Image source shown as the clickable thumbnail preview.',
  },
  {
    name: 'thumbnailAlt',
    type: 'string',
    default: '"Video thumbnail"',
    description: 'Accessible alt text for the thumbnail image.',
  },
  {
    name: 'animationStyle',
    type: 'AnimationStyle',
    default: '"from-center"',
    description:
      'Dialog animation preset: from-bottom, from-center, from-top, from-left, from-right, fade, top-in-bottom-out, left-in-right-out.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional class name applied to the root container.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the play trigger and prevents opening the dialog.',
  },
];

const HeroVideoDialogDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box maxW="720px" w="100%">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            thumbnailSrc={demoThumbnail}
            thumbnailAlt="BemoUI hero video preview"
          />
        </Box>

        <Text fontSize="sm" mt={8} color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/hero-video-dialog"
            isExternal
            color="#1620E4"
          >
            Magic UI Hero Video Dialog
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={heroVideoDialog} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...heroVideoDialog} />
      </CliTab>
    </TabbedLayout>
  );
};

export default HeroVideoDialogDemo;
