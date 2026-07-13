import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import MorphingText from '../../content/Components/MorphingText/MorphingText';
import { morphingText } from '../../constants/code/Components/morphingTextCode';

const MorphingTextDemo = () => {
  const propData = [
    {
      name: 'texts',
      type: 'string[]',
      default: '[]',
      description: 'Strings cycled by the morphing blur animation.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class names merged onto the root element.',
    },
    {
      name: 'morphTime',
      type: 'number',
      default: '1.5',
      description: 'Duration in seconds for each morph transition.',
    },
    {
      name: 'cooldownTime',
      type: 'number',
      default: '0.5',
      description: 'Pause in seconds between morph transitions.',
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
          mb={4}
        >
          <MorphingText texts={['BemoUI', 'Morphing', 'Text', 'Effect']} />
        </Box>

        <Text fontSize="sm" color="gray.500" mb={6}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/morphing-text"
            target="_blank"
            rel="noopener noreferrer"
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Morphing Text
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={morphingText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...morphingText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MorphingTextDemo;
