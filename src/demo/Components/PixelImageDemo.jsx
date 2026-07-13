import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import PixelImage from '../../content/Components/PixelImage/PixelImage';
import { pixelImage } from '../../constants/code/Components/pixelImageCode';

const propData = [
  {
    name: 'src',
    type: 'string',
    default: '—',
    description: 'Image source URL or path used for every pixel piece.',
  },
  {
    name: 'alt',
    type: 'string',
    default: "''",
    description: 'Accessible label exposed on the root role="img" container.',
  },
  {
    name: 'grid',
    type: "'6x4' | '8x8' | '8x3' | '4x6' | '3x8'",
    default: "'6x4'",
    description: 'Predefined rows/cols grid used when customGrid is not provided.',
  },
  {
    name: 'customGrid',
    type: '{ rows: number; cols: number }',
    default: 'undefined',
    description: 'Optional custom grid (1–16 inclusive per axis). Overrides grid when valid.',
  },
  {
    name: 'grayscaleAnimation',
    type: 'boolean',
    default: 'true',
    description: 'Animates pieces from grayscale to full color after colorRevealDelay.',
  },
  {
    name: 'pixelFadeInDuration',
    type: 'number',
    default: '1000',
    description: 'Opacity (and filter) transition duration in milliseconds.',
  },
  {
    name: 'maxAnimationDelay',
    type: 'number',
    default: '1200',
    description: 'Maximum random per-piece fade-in delay in milliseconds.',
  },
  {
    name: 'colorRevealDelay',
    type: 'number',
    default: '1300',
    description: 'Delay before grayscale is removed when grayscaleAnimation is enabled.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name merged onto the root container.',
  },
];

export default function PixelImageDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={10}
          px={4}
          borderRadius="xl"
          bg="blackAlpha.50"
          _dark={{ bg: 'whiteAlpha.50' }}
        >
          <PixelImage
            src="/assets/pixel-image-demo.jpg"
            alt="Pixelated portrait reveal demo"
            grid="6x4"
            grayscaleAnimation
          />
        </Box>

        <Text mt={6} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/pixel-image"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Pixel Image
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={pixelImage} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...pixelImage} />
      </CliTab>
    </TabbedLayout>
  );
}
