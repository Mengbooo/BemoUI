import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import FlickeringGrid from '../../content/Components/FlickeringGrid/FlickeringGrid';
import { flickeringGrid } from '../../constants/code/Components/flickeringGridCode';

const propData = [
  {
    name: 'squareSize',
    type: 'number',
    default: '4',
    description: 'Size of each grid square in pixels.',
  },
  {
    name: 'gridGap',
    type: 'number',
    default: '6',
    description: 'Gap between squares in pixels.',
  },
  {
    name: 'flickerChance',
    type: 'number',
    default: '0.3',
    description: 'Probability multiplier controlling how often squares flicker.',
  },
  {
    name: 'color',
    type: 'string',
    default: '#1620E4',
    description: 'Square color. Accepts hex or rgb/rgba values.',
  },
  {
    name: 'width',
    type: 'number',
    default: 'undefined',
    description: 'Optional fixed canvas width. Falls back to container width.',
  },
  {
    name: 'height',
    type: 'number',
    default: 'undefined',
    description: 'Optional fixed canvas height. Falls back to container height.',
  },
  {
    name: 'maxOpacity',
    type: 'number',
    default: '0.3',
    description: 'Maximum opacity applied to flickering squares.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name for the root container.',
  },
];

const FlickeringGridDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="360px"
          w="100%"
          borderRadius="lg"
          overflow="hidden"
          bg="gray.900"
          borderWidth="1px"
          borderColor="gray.700"
        >
          <FlickeringGrid
            squareSize={4}
            gridGap={6}
            flickerChance={0.3}
            color="#1620E4"
            maxOpacity={0.45}
          />
          <Box
            position="absolute"
            inset={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
          >
            <Text
              color="white"
              fontWeight="semibold"
              letterSpacing="wide"
              textShadow="0 1px 8px rgba(0,0,0,0.55)"
            >
              BemoUI FlickeringGrid
            </Text>
          </Box>
        </Box>

        <Box mt={6}>
          <Text fontSize="sm" color="gray.500">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/flickering-grid"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI Flickering Grid
            </Link>
            . MIT License.
          </Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Default accents use BemoUI blue #1620E4 and green #7BE9C6.
          </Text>
        </Box>

        <Box mt={8}>
          <PropTable data={propData} />
        </Box>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={flickeringGrid} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...flickeringGrid} />
      </CliTab>
    </TabbedLayout>
  );
};

export default FlickeringGridDemo;
