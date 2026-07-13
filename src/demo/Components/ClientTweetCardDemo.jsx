import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import ClientTweetCard from '../../content/Components/ClientTweetCard/ClientTweetCard';
import { clientTweetCard } from '../../constants/code/Components/clientTweetCardCode';

const propData = [
  { name: 'name', type: 'string', default: '"BemoUI"', description: 'Author display name shown in the card header.' },
  { name: 'handle', type: 'string', default: '"bemoui"', description: 'Author handle without the leading @.' },
  { name: 'text', type: 'string', default: 'sample copy', description: 'Tweet body text rendered in the card.' },
  { name: 'date', type: 'string', default: '"Mar 15"', description: 'Human-readable date label next to the handle.' },
  { name: 'likes', type: 'string', default: '"1.2K"', description: 'Likes metric label.' },
  { name: 'retweets', type: 'string', default: '"340"', description: 'Reposts metric label.' },
  { name: 'replies', type: 'string', default: '"89"', description: 'Replies metric label.' },
  { name: 'verified', type: 'boolean', default: 'true', description: 'Shows the verified badge when true.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables pointer and keyboard activation.' },
  { name: 'className', type: 'string', default: '""', description: 'Optional class names for the root article.' },
  { name: 'onClick', type: 'function', default: 'undefined', description: 'Optional click/keyboard activation handler.' },
];

export default function ClientTweetCardDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack align="stretch" spacing={6}>
          <Box maxW="36rem">
            <ClientTweetCard />
          </Box>
          <Box maxW="36rem">
            <ClientTweetCard
              name="Ada Lovelace"
              handle="analytical"
              text="Notes on the Analytical Engine still inspire modern interfaces."
              date="Dec 10"
              replies="42"
              retweets="128"
              likes="980"
              verified
            />
          </Box>
          <Text fontSize="sm" color="gray.500">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/client-tweet-card"
              isExternal
              color="#1620E4"
              fontWeight="600"
            >
              Magic UI Client Tweet Card
            </Link>
            . MIT License.
          </Text>
          <PropTable data={propData} />
        </VStack>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={clientTweetCard} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...clientTweetCard} />
      </CliTab>
    </TabbedLayout>
  );
}
