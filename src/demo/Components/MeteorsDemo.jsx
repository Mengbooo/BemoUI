import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Meteors from '../../content/Components/Meteors/Meteors';
import { meteors } from '../../constants/code/Components/meteorsCode';

const MeteorsDemo = () => {
  const propData = [
    {
      name: 'number',
      type: 'number',
      default: '20',
      description: 'How many meteor streaks to render.',
    },
    {
      name: 'minDelay',
      type: 'number',
      default: '0.2',
      description: 'Minimum animation delay in seconds.',
    },
    {
      name: 'maxDelay',
      type: 'number',
      default: '1.2',
      description: 'Maximum animation delay in seconds.',
    },
    {
      name: 'minDuration',
      type: 'number',
      default: '2',
      description: 'Minimum meteor travel duration in seconds.',
    },
    {
      name: 'maxDuration',
      type: 'number',
      default: '10',
      description: 'Maximum meteor travel duration in seconds.',
    },
    {
      name: 'angle',
      type: 'number',
      default: '215',
      description: 'Fall angle in degrees used for meteor rotation.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class name applied to the decorative container.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="420px"
          overflow="hidden"
          borderRadius="xl"
          bg="black"
          border="1px solid"
          borderColor="gray.800"
        >
          <Meteors number={24} />
          <Flex
            position="relative"
            zIndex={1}
            h="100%"
            align="center"
            justify="center"
            direction="column"
            gap={2}
            px={6}
            textAlign="center"
          >
            <Text color="white" fontSize="2xl" fontWeight="bold">
              Meteors
            </Text>
            <Text color="gray.400" fontSize="sm">
              Decorative falling streaks using BemoUI blue and green accents.
            </Text>
          </Flex>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/meteors"
            color="#1620E4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Magic UI Meteors
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={meteors} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...meteors} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MeteorsDemo;
