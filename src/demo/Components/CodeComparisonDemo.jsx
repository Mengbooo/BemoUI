import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import CodeComparison from '../../content/Components/CodeComparison/CodeComparison';
import { codeComparison } from '../../constants/code/Components/codeComparisonCode';

const beforeSample = `function greet(name) {
  console.log('Hello, ' + name);
}

greet('world');`;

const afterSample = `function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('BemoUI');`;

const propData = [
  {
    name: 'beforeCode',
    type: 'string',
    default: "''",
    description: 'Source code shown in the before panel.',
  },
  {
    name: 'afterCode',
    type: 'string',
    default: "''",
    description: 'Source code shown in the after panel.',
  },
  {
    name: 'language',
    type: 'string',
    default: "'javascript'",
    description: 'Syntax highlighting language for both panels.',
  },
  {
    name: 'filename',
    type: 'string',
    default: "'example.js'",
    description: 'Filename label displayed in each panel header.',
  },
  {
    name: 'highlightColor',
    type: 'string',
    default: "'#1620E4'",
    description: 'Accent color used for focus rings and CSS variable.',
  },
  {
    name: 'showLineNumbers',
    type: 'boolean',
    default: 'true',
    description: 'Whether to render line numbers in the code panels.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name for the root container.',
  },
];

export default function CodeComparisonDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box py={4}>
          <CodeComparison
            beforeCode={beforeSample}
            afterCode={afterSample}
            language="javascript"
            filename="greet.js"
            highlightColor="#1620E4"
          />
        </Box>

        <Text mt={6} fontSize="sm" color="gray.500">
          Adapted for BemoUI from{' '}
          <Link
            href="https://magicui.design/docs/components/code-comparison"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Code Comparison
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={codeComparison} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...codeComparison} />
      </CliTab>
    </TabbedLayout>
  );
}
