import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import LineShadowText from '../../content/Components/LineShadowText/LineShadowText';
import { lineShadowText } from '../../constants/code/Components/lineShadowTextCode';

const LineShadowTextDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'string',
      default: '—',
      description: 'Text content rendered with the animated line shadow effect.',
    },
    {
      name: 'shadowColor',
      type: 'string',
      default: '#1620E4',
      description: 'Color of the diagonal animated line shadow pattern.',
    },
    {
      name: 'as',
      type: 'AllowedTag',
      default: 'span',
      description: 'Semantic HTML element to render (whitelisted tags only).',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional extra class names for typography or layout.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          h={200}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="black"
          borderRadius="md"
        >
          <Heading as="h1" size="2xl" color="white" fontWeight="bold">
            <LineShadowText shadowColor="#7BE9C6">BemoUI</LineShadowText>
          </Heading>
        </Box>

        <Text fontSize="sm" mt={4} color="gray.500">
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/line-shadow-text"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Line Shadow Text
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lineShadowText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...lineShadowText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LineShadowTextDemo;
