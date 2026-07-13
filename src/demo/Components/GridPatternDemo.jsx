import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { GridPattern } from '../../content/Components/GridPattern/GridPattern';
import { gridPattern } from '../../constants/code/Components/gridPatternCode';

const GridPatternDemo = () => {
  const propData = [
    {
      name: 'width',
      type: 'number',
      default: '40',
      description: 'Width of each grid cell in pixels.',
    },
    {
      name: 'height',
      type: 'number',
      default: '40',
      description: 'Height of each grid cell in pixels.',
    },
    {
      name: 'x',
      type: 'number',
      default: '-1',
      description: 'Horizontal offset of the pattern.',
    },
    {
      name: 'y',
      type: 'number',
      default: '-1',
      description: 'Vertical offset of the pattern.',
    },
    {
      name: 'squares',
      type: 'Array<[number, number]>',
      default: 'undefined',
      description: 'Optional highlighted square cells as [column, row] pairs.',
    },
    {
      name: 'strokeDasharray',
      type: 'string',
      default: '"0"',
      description: 'SVG stroke-dasharray applied to grid lines.',
    },
    {
      name: 'className',
      type: 'string',
      default: '""',
      description: 'Additional CSS class names for the root SVG.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box mb={6}>
        <Heading size="md" mb={2}>
          GridPattern
        </Heading>
        <Text mb={2}>
          Decorative SVG grid pattern background with optional highlighted cells.
        </Text>
        <Text fontSize="sm" color="gray.400" mb={4}>
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/grid-pattern"
            isExternal
            color="#1620E4"
          >
            Magic UI Grid Pattern
          </Link>
          . MIT License.
        </Text>
        <Box
          position="relative"
          h="320px"
          w="100%"
          overflow="hidden"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <GridPattern
            width={40}
            height={40}
            squares={[
              [4, 4],
              [5, 1],
              [8, 2],
              [5, 3],
              [5, 5],
              [10, 10],
            ]}
          />
        </Box>
        </Box>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={gridPattern} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...gridPattern} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GridPatternDemo;
