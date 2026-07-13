import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { AuroraText } from '../../content/Components/AuroraText/AuroraText';
import { auroraText } from '../../constants/code/Components/auroraTextCode';

const propData = [
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'The text content that receives the animated aurora gradient.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name applied to the root element.',
  },
  {
    name: 'colors',
    type: 'string[]',
    default: "['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6']",
    description: 'Color stops used to build the looping linear gradient.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Multiplier controlling animation speed (higher is faster).',
  },
];

export default function AuroraTextDemo() {
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
        >
          <Text
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            lineHeight="1.2"
          >
            <AuroraText>Aurora Text</AuroraText>
          </Text>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/aurora-text"
            isExternal
            color="#1620E4"
          >
            Magic UI Aurora Text
          </Link>
          {' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={auroraText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...auroraText} />
      </CliTab>
    </TabbedLayout>
  );
}
