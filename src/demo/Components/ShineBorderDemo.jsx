import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import ShineBorder from '../../content/Components/ShineBorder/ShineBorder';
import { shineBorder } from '../../constants/code/Components/shineBorderCode';

const ShineBorderDemo = () => {
  const propData = [
    {
      name: 'borderWidth',
      type: 'number',
      default: '1',
      description: 'Width of the border in pixels.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '14',
      description: 'Duration of the shine animation in seconds.',
    },
    {
      name: 'shineColor',
      type: 'string | string[]',
      default: "['#1620E4', '#7BE9C6']",
      description: 'Single color or array of colors used for the border shine.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="xl"
          minH="220px"
          p={10}
          bg="gray.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ShineBorder borderWidth={1} duration={14} shineColor={['#1620E4', '#7BE9C6']} />
          <Text color="white" fontWeight="semibold">
            Shine Border
          </Text>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/shine-border"
            color="#1620E4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Magic UI Shine Border
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={shineBorder} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...shineBorder} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ShineBorderDemo;
