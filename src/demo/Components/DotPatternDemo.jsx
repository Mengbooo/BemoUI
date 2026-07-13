import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import DotPattern from '../../content/Components/DotPattern/DotPattern';
import { dotPattern } from '../../constants/code/Components/dotPatternCode';

const propData = [
  {
    name: 'width',
    type: 'number',
    default: '16',
    description: 'Horizontal spacing between dots.',
  },
  {
    name: 'height',
    type: 'number',
    default: '16',
    description: 'Vertical spacing between dots.',
  },
  {
    name: 'x',
    type: 'number',
    default: '0',
    description: 'Horizontal offset of the full pattern.',
  },
  {
    name: 'y',
    type: 'number',
    default: '0',
    description: 'Vertical offset of the full pattern.',
  },
  {
    name: 'cx',
    type: 'number',
    default: '1',
    description: 'Horizontal offset applied to each individual dot.',
  },
  {
    name: 'cy',
    type: 'number',
    default: '1',
    description: 'Vertical offset applied to each individual dot.',
  },
  {
    name: 'cr',
    type: 'number',
    default: '1',
    description: 'Radius of each dot.',
  },
  {
    name: 'glow',
    type: 'boolean',
    default: 'false',
    description: 'Enables the glowing pulse animation on dots.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class names for the SVG container.',
  },
];

export default function DotPatternDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
        position="relative"
        h="420px"
        w="100%"
        bg="#0D0D12"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="lg"
        overflow="hidden"
      >
        <DotPattern width={20} height={20} cr={1.2} glow />
        <Box
          position="relative"
          zIndex={1}
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          <Heading size="md" color="gray.800">
            DotPattern
          </Heading>
        </Box>
      </Box>

      <Text mt={4} fontSize="sm" color="gray.400">
        Source credit:{' '}
        <Link
          href="https://magicui.design/docs/components/dot-pattern"
          isExternal
          color="#1620E4"
          fontWeight="medium"
        >
          Magic UI Dot Pattern
        </Link>
        . MIT License.
      </Text>

        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={dotPattern} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...dotPattern} />
      </CliTab>
    </TabbedLayout>
  );
}
