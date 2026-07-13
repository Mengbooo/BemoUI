import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TextReveal from '../../content/Components/TextReveal/TextReveal';
import { textReveal } from '../../constants/code/Components/textRevealCode';

const propData = [
  {
    name: 'children',
    type: 'string',
    default: "''",
    description: 'Plain text revealed word-by-word while scrolling through the section.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name merged onto the root scroll container.',
  },
];

export default function TextRevealDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          borderRadius="md"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          overflow="auto"
          maxH="420px"
          mb={6}
        >
          <TextReveal>
            BemoUI turns scroll into story with calm, accessible word reveals.
          </TextReveal>
        </Box>

        <Text fontSize="sm" color="gray.400" mb={4}>
          Source adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/text-reveal"
            isExternal
            color="#1620E4"
            fontWeight="semibold"
          >
            Magic UI Text Reveal
          </Link>{' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={textReveal} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...textReveal} />
      </CliTab>
    </TabbedLayout>
  );
}
