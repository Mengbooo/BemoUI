import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TweetCard from '../../content/Components/TweetCard/TweetCard';
import { tweetCard } from '../../constants/code/Components/tweetCardCode';

const propData = [
  {
    name: 'name',
    type: 'string',
    default: "'BemoUI'",
    description: 'Display name shown in the card header.',
  },
  {
    name: 'username',
    type: 'string',
    default: "'bemoui'",
    description: 'Handle shown under the display name (without @).',
  },
  {
    name: 'body',
    type: 'string',
    default: 'Sample BemoUI copy',
    description: 'Plain-text post body rendered safely without HTML injection.',
  },
  {
    name: 'verified',
    type: 'boolean',
    default: 'true',
    description: 'Shows the verified badge next to the display name.',
  },
  {
    name: 'date',
    type: 'string',
    default: 'undefined',
    description: 'Optional footer timestamp label.',
  },
  {
    name: 'tweetUrl',
    type: 'string',
    default: 'undefined',
    description: 'Optional external post URL for the brand icon link.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional class names for the root article element.',
  },
];

const TweetCardDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack spacing={6} align="stretch">
          <Box maxW="lg">
            <TweetCard
              name="BemoUI"
              username="bemoui"
              verified
              date="Mar 14, 2026"
              body="Ship polished social cards without remote fetches, unsafe HTML, or extra dependencies. Accents use BemoUI blue and green."
            />
          </Box>
          <Box maxW="lg">
            <TweetCard
              name="Design Systems"
              username="systems"
              verified={false}
              body="A production-safe TweetCard variant focused on semantics, keyboard focus, and prefers-reduced-motion."
            />
          </Box>
          <Text fontSize="sm" color="gray.400">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/tweet-card"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Tweet Card
            </Link>
            {' '}
            · MIT License
          </Text>
          <PropTable data={propData} />
        </VStack>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={tweetCard} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...tweetCard} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TweetCardDemo;
