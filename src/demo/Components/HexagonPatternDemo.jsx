import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import HexagonPattern from '../../content/Components/HexagonPattern/HexagonPattern';
import { hexagonPattern } from '../../constants/code/Components/hexagonPatternCode';

const propData = [
  {
    name: 'radius',
    type: 'number',
    default: '40',
    description: 'Radius of each hexagon from center to vertex.',
  },
  {
    name: 'gap',
    type: 'number',
    default: '0',
    description: 'Spacing in pixels between adjacent hexagons.',
  },
  {
    name: 'x',
    type: 'number',
    default: '-1',
    description: 'Pattern origin offset on the x-axis.',
  },
  {
    name: 'y',
    type: 'number',
    default: '-1',
    description: 'Pattern origin offset on the y-axis.',
  },
  {
    name: 'direction',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'Orientation of the honeycomb grid.',
  },
  {
    name: 'strokeDasharray',
    type: 'string',
    default: '"0"',
    description: 'SVG stroke-dasharray for hexagon outlines.',
  },
  {
    name: 'hexagons',
    type: 'Array<[col: number, row: number]>',
    default: 'undefined',
    description: 'Coordinates of hexagons to highlight with a fill.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional class name merged onto the root SVG.',
  },
];

const HexagonPatternDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="360px"
          w="100%"
          borderRadius="lg"
          overflow="hidden"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <HexagonPattern
            radius={36}
            gap={4}
            hexagons={[
              [1, 1],
              [2, 2],
              [3, 1],
              [4, 3],
            ]}
          />
        </Box>

        <Text mt={4} fontSize="sm" color="gray.400">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/hexagon-pattern"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Hexagon Pattern
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={hexagonPattern} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...hexagonPattern} />
      </CliTab>
    </TabbedLayout>
  );
};

export default HexagonPatternDemo;
