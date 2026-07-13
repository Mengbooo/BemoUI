import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { StripedPattern } from '../../content/Components/StripedPattern/StripedPattern';
import { stripedPattern } from '../../constants/code/Components/stripedPatternCode';

const propData = [
  {
    name: 'direction',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Direction of the diagonal stripes.',
  },
  {
    name: 'width',
    type: 'number | string',
    default: '10',
    description: 'Width of the repeating pattern unit.',
  },
  {
    name: 'height',
    type: 'number | string',
    default: '10',
    description: 'Height of the repeating pattern unit.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names applied to the SVG.',
  },
];

const StripedPatternDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack spacing={6} align="stretch">
          <Box
            position="relative"
            h="200px"
            w="100%"
            bg="gray.100"
            overflow="hidden"
            borderRadius="md"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
          >
            <StripedPattern direction="left" />
          </Box>
          <Box
            position="relative"
            h="200px"
            w="100%"
            bg="gray.900"
            overflow="hidden"
            borderRadius="md"
            color="#7BE9C6"
          >
            <StripedPattern direction="right" width={12} height={12} />
          </Box>
          <Text fontSize="sm" color="gray.400">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/striped-pattern"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI Striped Pattern
            </Link>
            . MIT License.
          </Text>
          <PropTable data={propData} />
        </VStack>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={stripedPattern} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...stripedPattern} />
      </CliTab>
    </TabbedLayout>
  );
};

export default StripedPatternDemo;
