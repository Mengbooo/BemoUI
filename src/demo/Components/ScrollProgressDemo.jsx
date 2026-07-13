import { Box, Text, Link } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import ScrollProgress from '../../content/Components/ScrollProgress/ScrollProgress';
import { scrollProgress } from '../../constants/code/Components/scrollProgressCode';

const propData = [
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS class names applied to the progress bar.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'When true, hides the bar and freezes progress updates.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: 'undefined',
    description: 'Inline styles merged with the scroll-driven scaleX transform.',
  },
];

export default function ScrollProgressDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box minH="180vh" p={6}>
          <ScrollProgress />
          <Text fontWeight="bold" color="#1620E4" mb={3}>
            Scroll the page
          </Text>
          <Text mb={4} color="gray.700">
            A fixed 1px bar at the top of the viewport tracks document scroll
            progress. The default gradient uses BemoUI blue (#1620E4) and green
            (#7BE9C6).
          </Text>
          {Array.from({ length: 16 }).map((_, i) => (
            <Text key={i} mb={4} color="gray.400">
              Section {i + 1}: keep scrolling to fill the progress indicator.
            </Text>
          ))}
          <Text fontSize="sm" color="gray.500" mt={8}>
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/scroll-progress"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Scroll Progress
            </Link>
            . MIT License.
          </Text>
        </Box>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={scrollProgress} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...scrollProgress} />
      </CliTab>
    </TabbedLayout>
  );
}
