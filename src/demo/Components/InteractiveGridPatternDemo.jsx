import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { InteractiveGridPattern } from '../../content/Components/InteractiveGridPattern/InteractiveGridPattern';
import { interactiveGridPattern } from '../../constants/code/Components/interactiveGridPatternCode';

const propData = [
  {
    name: 'width',
    type: 'number',
    default: '40',
    description: 'Width of each grid square in pixels.'
  },
  {
    name: 'height',
    type: 'number',
    default: '40',
    description: 'Height of each grid square in pixels.'
  },
  {
    name: 'squares',
    type: '[number, number]',
    default: '[24, 24]',
    description: 'Grid dimensions as [horizontal, vertical] square counts.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class name applied to the root SVG.'
  },
  {
    name: 'squaresClassName',
    type: 'string',
    default: "''",
    description: 'Additional class name applied to each square rect.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables hover interaction and dims the pattern.'
  }
];

const InteractiveGridPatternDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="420px"
          w="100%"
          overflow="hidden"
          borderRadius="md"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <InteractiveGridPattern width={40} height={40} squares={[24, 12]} />
          <Box
            position="relative"
            zIndex={1}
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
          >
            <Text fontWeight="semibold" color="gray.700">
              Hover the grid cells
            </Text>
          </Box>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/interactive-grid-pattern"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Interactive Grid Pattern
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={interactiveGridPattern} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...interactiveGridPattern} />
      </CliTab>
    </TabbedLayout>
  );
};

export default InteractiveGridPatternDemo;
