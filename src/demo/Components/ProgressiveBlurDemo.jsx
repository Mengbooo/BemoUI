import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import ProgressiveBlur from '../../content/Components/ProgressiveBlur/ProgressiveBlur';
import { progressiveBlur } from '../../constants/code/Components/progressiveBlurCode';

const ProgressiveBlurDemo = () => {
  const propData = [
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional class names applied to the overlay root.',
    },
    {
      name: 'height',
      type: 'string',
      default: "'30%'",
      description: 'Overlay height when position is top or bottom.',
    },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'both'",
      default: "'bottom'",
      description: 'Edge(s) where the progressive blur is applied.',
    },
    {
      name: 'blurLevels',
      type: 'number[]',
      default: '[0.5, 1, 2, 4, 8, 16, 32, 64]',
      description: 'Blur radii in pixels for each progressive layer.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      description: 'Optional content rendered inside the overlay container.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="320px"
          overflow="hidden"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <Box
            h="100%"
            background="linear-gradient(135deg, #1620E4 0%, #7BE9C6 100%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={6}
          >
            <Text color="white" fontWeight="bold" fontSize="2xl" textAlign="center">
              BemoUI Progressive Blur
            </Text>
          </Box>
          <ProgressiveBlur position="bottom" height="45%" />
        </Box>

        <Text mt={4} fontSize="sm" color="gray.400">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/progressive-blur"
            color="#1620E4"
            isExternal
            rel="noopener noreferrer"
          >
            Magic UI Progressive Blur
          </Link>
          {' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={progressiveBlur} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...progressiveBlur} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ProgressiveBlurDemo;
