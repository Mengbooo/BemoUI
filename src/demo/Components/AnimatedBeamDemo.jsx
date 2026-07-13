import { useRef } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import AnimatedBeam from '../../content/Components/AnimatedBeam/AnimatedBeam';
import { animatedBeam } from '../../constants/code/Components/animatedBeamCode';

const AnimatedBeamDemo = () => {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const propData = [
    { name: 'containerRef', type: 'RefObject<HTMLElement | null>', default: '—', description: 'Ref for the relatively positioned container that owns the SVG overlay.' },
    { name: 'fromRef', type: 'RefObject<HTMLElement | null>', default: '—', description: 'Ref for the beam origin element.' },
    { name: 'toRef', type: 'RefObject<HTMLElement | null>', default: '—', description: 'Ref for the beam destination element.' },
    { name: 'curvature', type: 'number', default: '0', description: 'Vertical control-point offset for the quadratic curve.' },
    { name: 'reverse', type: 'boolean', default: 'false', description: 'Reverses gradient travel direction.' },
    { name: 'duration', type: 'number', default: '5', description: 'Seconds for one gradient pass.' },
    { name: 'delay', type: 'number', default: '0', description: 'Seconds before the animation starts.' },
    { name: 'pathColor', type: 'string', default: 'gray', description: 'Base path stroke color.' },
    { name: 'pathWidth', type: 'number', default: '2', description: 'Stroke width of both paths.' },
    { name: 'pathOpacity', type: 'number', default: '0.2', description: 'Opacity of the base path.' },
    { name: 'gradientStartColor', type: 'string', default: '#1620E4', description: 'Beam gradient start accent (BemoUI blue).' },
    { name: 'gradientStopColor', type: 'string', default: '#7BE9C6', description: 'Beam gradient stop accent (BemoUI green).' },
    { name: 'repeat', type: 'number', default: 'Infinity', description: 'Animation repeat count.' },
    { name: 'repeatDelay', type: 'number', default: '0', description: 'Delay between repeats in seconds.' },
    { name: 'startXOffset', type: 'number', default: '0', description: 'Horizontal offset from the from element center.' },
    { name: 'startYOffset', type: 'number', default: '0', description: 'Vertical offset from the from element center.' },
    { name: 'endXOffset', type: 'number', default: '0', description: 'Horizontal offset from the to element center.' },
    { name: 'endYOffset', type: 'number', default: '0', description: 'Vertical offset from the to element center.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional class names on the SVG overlay.' },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" w="100%" maxW="560px" mx="auto" py={10} px={6} ref={containerRef}>
          <Flex align="center" justify="space-between" gap={8}>
            <Box
              ref={fromRef}
              w="64px"
              h="64px"
              borderRadius="full"
              border="2px solid"
              borderColor="whiteAlpha.200"
              bg="#111116"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="sm"
              fontWeight="bold"
              color="#1620E4"
              tabIndex={0}
              aria-label="Source node"
            >
              A
            </Box>
            <Box
              ref={toRef}
              w="64px"
              h="64px"
              borderRadius="full"
              border="2px solid"
              borderColor="whiteAlpha.200"
              bg="#111116"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="sm"
              fontWeight="bold"
              color="#7BE9C6"
              tabIndex={0}
              aria-label="Target node"
            >
              B
            </Box>
          </Flex>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            curvature={40}
            gradientStartColor="#1620E4"
            gradientStopColor="#7BE9C6"
          />
        </Box>
        <Text mt={6} fontSize="sm" color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/animated-beam"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Animated Beam
          </Link>
          . MIT License.
        </Text>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={animatedBeam} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...animatedBeam} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedBeamDemo;
