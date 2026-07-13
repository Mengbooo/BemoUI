import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import GlyphMatrix from '../../content/Components/GlyphMatrix/GlyphMatrix';
import { glyphMatrix } from '../../constants/code/Components/glyphMatrixCode';

const GlyphMatrixDemo = () => {
  const propData = [
    {
      name: 'glyphs',
      type: 'string',
      default: '"01·•+*/\\<>="',
      description: 'Characters randomly sampled into each cell.',
    },
    {
      name: 'cellSize',
      type: 'number',
      default: '14',
      description: 'Cell size in pixels (also drives font size).',
    },
    {
      name: 'mutationRate',
      type: 'number',
      default: '0.04',
      description: 'Probability (0–1) that a cell mutates each tick.',
    },
    {
      name: 'interval',
      type: 'number',
      default: '90',
      description: 'Mutation tick interval in milliseconds.',
    },
    {
      name: 'fadeBottom',
      type: 'number',
      default: '0.6',
      description: 'Vertical fade strength toward the bottom (0 disables).',
    },
    {
      name: 'color',
      type: 'string',
      default: '#1620E4',
      description: 'Glyph color. Use #1620E4 or #7BE9C6 for BemoUI accents.',
    },
    {
      name: 'className',
      type: 'string',
      default: '—',
      description: 'Optional class names merged onto the canvas.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" w="100%" h="280px" borderRadius="md" overflow="hidden" bg="gray.900" mb={4}>
          <GlyphMatrix color="#1620E4" fadeBottom={0.55} />
          <Box
            position="absolute"
            inset={0}
            pointerEvents="none"
            background="linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)"
          />
        </Box>

        <Box position="relative" w="100%" h="180px" borderRadius="md" overflow="hidden" bg="gray.800" mb={6}>
          <GlyphMatrix color="#7BE9C6" cellSize={16} mutationRate={0.06} interval={110} />
        </Box>

        <Text fontSize="sm" color="gray.500" mb={6}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/glyph-matrix"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Glyph Matrix
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={glyphMatrix} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...glyphMatrix} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GlyphMatrixDemo;
