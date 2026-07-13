import { Box, Link, Stack, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import SparklesText from '../../content/Components/SparklesText/SparklesText';
import { sparklesText } from '../../constants/code/Components/sparklesTextCode';

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Text content displayed with sparkles.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names for the root element.',
  },
  {
    name: 'sparklesCount',
    type: 'number',
    default: '10',
    description: 'Number of sparkles rendered around the text.',
  },
  {
    name: 'colors',
    type: '{ first: string; second: string }',
    default: "{ first: '#1620E4', second: '#7BE9C6' }",
    description: 'Primary and secondary sparkle colors.',
  },
];

export default function SparklesTextDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Stack spacing={8} align="flex-start" w="100%">
          <Box
            w="100%"
            minH="220px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
            bg="#0D0D12"
            p={8}
          >
            <SparklesText
              sparklesCount={12}
              colors={{ first: '#1620E4', second: '#7BE9C6' }}
            >
              BemoUI
            </SparklesText>
          </Box>

          <Text fontSize="sm" color="gray.400">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/sparkles-text"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Sparkles Text
            </Link>
            {' '}
            · MIT License
          </Text>

          <PropTable data={propData} />
        </Stack>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={sparklesText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...sparklesText} />
      </CliTab>
    </TabbedLayout>
  );
}
