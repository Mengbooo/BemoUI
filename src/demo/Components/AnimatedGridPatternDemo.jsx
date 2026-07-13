import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import AnimatedGridPattern from '../../content/Components/AnimatedGridPattern/AnimatedGridPattern';
import { animatedGridPattern } from '../../constants/code/Components/animatedGridPatternCode';

const AnimatedGridPatternDemo = () => {
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
      description: 'Horizontal pattern offset.',
    },
    {
      name: 'y',
      type: 'number',
      default: '-1',
      description: 'Vertical pattern offset.',
    },
    {
      name: 'strokeDasharray',
      type: 'number | string',
      default: '0',
      description: 'SVG stroke-dasharray for grid lines.',
    },
    {
      name: 'numSquares',
      type: 'number',
      default: '50',
      description: 'Number of animated highlight squares.',
    },
    {
      name: 'maxOpacity',
      type: 'number',
      default: '0.5',
      description: 'Peak opacity of animated squares.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '4',
      description: 'Fade duration in seconds for each square.',
    },
    {
      name: 'repeatDelay',
      type: 'number',
      default: '0.5',
      description: 'Delay between reverse fade cycles.',
    },
    {
      name: 'color',
      type: 'string',
      default: '#1620E4',
      description: 'Accent color for squares (BemoUI blue). Use #7BE9C6 for green.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class names merged onto the root SVG.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="420px"
          w="100%"
          borderRadius="lg"
          overflow="hidden"
          border="1px solid"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <AnimatedGridPattern
            numSquares={36}
            maxOpacity={0.45}
            duration={3.5}
            repeatDelay={0.4}
            color="#1620E4"
          />
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
              Animated grid pattern
            </Text>
          </Box>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.400">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/animated-grid-pattern"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Animated Grid Pattern
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={animatedGridPattern} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...animatedGridPattern} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedGridPatternDemo;
