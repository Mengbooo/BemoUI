import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Backlight from '../../content/Components/Backlight/Backlight';
import { backlight } from '../../constants/code/Components/backlightCode';

const BacklightDemo = () => {
  const propData = [
    {
      name: 'blur',
      type: 'number',
      default: '20',
      description: 'Standard deviation of the Gaussian blur applied to the backlight glow.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'When true, disables the backlight filter effect.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class name for the root element.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Content to render with the backlight effect.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          h={300}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#0a0a0a"
        >
          <Backlight blur={24}>
            <Flex gap={4} align="center" p={8}>
              <Box w="64px" h="64px" borderRadius="xl" bg="#1620E4" />
              <Box w="64px" h="64px" borderRadius="xl" bg="#7BE9C6" />
              <Box w="64px" h="64px" borderRadius="xl" bg="#111116" />
            </Flex>
          </Backlight>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/backlight"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Backlight
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={backlight} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...backlight} />
      </CliTab>
    </TabbedLayout>
  );
};

export default BacklightDemo;
