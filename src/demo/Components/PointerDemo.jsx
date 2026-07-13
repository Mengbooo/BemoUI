import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Pointer from '../../content/Components/Pointer/Pointer';
import { pointer } from '../../constants/code/Components/pointerCode';

const PROP_DATA = [
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'default cursor SVG',
    description: 'Custom content rendered as the animated pointer.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional class names applied to the default pointer icon.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: 'Inline styles applied to the floating pointer container.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the custom pointer and restores the system cursor.',
  },
];

export default function PointerDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="320px"
          w="100%"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#0D0D12"
          overflow="hidden"
        >
          <Pointer />
          <Text fontSize="lg" color="gray.400" userSelect="none">
            Hover to see the custom pointer
          </Text>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/pointer"
            color="#1620E4"
            isExternal
            rel="noopener noreferrer"
          >
            Magic UI Pointer
          </Link>
          {' '}\u00b7 MIT License
        </Text>

        <PropTable data={PROP_DATA} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={pointer} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...pointer} />
      </CliTab>
    </TabbedLayout>
  );
}
