import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import ComicText from '../../content/Components/ComicText/ComicText';
import { comicText } from '../../constants/code/Components/comicTextCode';

const ComicTextDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'string',
      default: '—',
      description: 'Comic-style text content to render (must be a string).',
    },
    {
      name: 'fontSize',
      type: 'number',
      default: '5',
      description: 'Font size in rem units.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS class names applied to the root element.',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      default: '—',
      description: 'Inline styles merged onto the root element.',
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
        >
          <ComicText fontSize={4}>BAMO!</ComicText>
        </Box>

        <PropTable data={propData} />

        <Text fontSize="sm" mt={4} color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/comic-text"
            target="_blank"
            rel="noopener noreferrer"
            color="#1620E4"
          >
            Magic UI Comic Text
          </Link>
          . MIT License.
        </Text>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={comicText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...comicText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ComicTextDemo;
