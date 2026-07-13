import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { KineticText } from '../../content/Components/KineticText/KineticText';
import { kineticText } from '../../constants/code/Components/kineticTextCode';

const propData = [
  {
    name: 'text',
    type: 'string',
    default: '—',
    description: 'Text content split into kinetic letter spans.',
  },
  {
    name: 'as',
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"',
    default: '"h1"',
    description: 'Semantic element rendered for the text root.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables hover, focus, and pointer interactions.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional class names merged onto the root element.',
  },
];

const KineticTextDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          minH={300}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={8}
          py={10}
        >
          <KineticText text="BemoUI" as="h1" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }} />
          <KineticText
            text="Hover the letters"
            as="p"
            style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', color: '#7BE9C6' }}
          />
        </Box>

        <Text fontSize="sm" mt={4} color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/kinetic-text"
            target="_blank"
            rel="noopener noreferrer"
            color="#1620E4"
          >
            Magic UI Kinetic Text
          </Link>
          {' '}\u00B7 MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={kineticText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...kineticText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default KineticTextDemo;
