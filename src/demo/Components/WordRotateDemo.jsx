import { Box, Text, Link } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import WordRotate from '../../content/Components/WordRotate/WordRotate';
import { wordRotate } from '../../constants/code/Components/wordRotateCode';

const WordRotateDemo = () => {
  const propData = [
    {
      name: 'words',
      type: 'string[]',
      default: '[]',
      description: 'Words to cycle through in order.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '2500',
      description: 'Milliseconds between each word change.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class name for the root element.',
    },
    {
      name: 'motionProps',
      type: 'MotionProps',
      default: '—',
      description: 'Optional framer-motion props for enter/exit animation.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          className="demo-container"
          position="relative"
          h={300}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color="white"
            display="flex"
            flexWrap="wrap"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            Build
            <WordRotate
              words={['beautiful', 'modern', 'accessible', 'delightful']}
              duration={2500}
            />
            UIs
          </Text>
        </Box>

        <PropTable data={propData} />

        <Box mt={4} fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/word-rotate"
            isExternal
            color="#7BE9C6"
          >
            Magic UI Word Rotate
          </Link>
          . MIT License.
        </Box>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={wordRotate} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...wordRotate} />
      </CliTab>
    </TabbedLayout>
  );
};

export default WordRotateDemo;
