import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { Ripple } from '../../content/Components/Ripple/Ripple';
import { ripple } from '../../constants/code/Components/rippleCode';

const RippleDemo = () => {
  const propData = [
    {
      name: 'mainCircleSize',
      type: 'number',
      default: '210',
      description: 'Diameter of the innermost ripple circle in pixels.',
    },
    {
      name: 'mainCircleOpacity',
      type: 'number',
      default: '0.24',
      description: 'Base opacity of the innermost circle (outer circles fade further).',
    },
    {
      name: 'numCircles',
      type: 'number',
      default: '8',
      description: 'Number of concentric ripple circles (clamped 0–32).',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS class names applied to the container.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="400px"
          w="100%"
          bg="black"
          borderRadius="md"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Ripple />
          <Text color="white" zIndex={1} fontWeight="semibold" letterSpacing="wide">
            BemoUI Ripple
          </Text>
        </Box>
        <Text mt={4} fontSize="sm" color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/ripple"
            color="#1620E4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Magic UI Ripple
          </Link>
          . MIT License.
        </Text>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={ripple} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...ripple} />
      </CliTab>
    </TabbedLayout>
  );
};

export default RippleDemo;
