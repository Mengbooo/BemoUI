import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import AvatarCircles from '../../content/Components/AvatarCircles/AvatarCircles';
import { avatarCircles } from '../../constants/code/Components/avatarCirclesCode';

const propData = [
  {
    name: 'avatarUrls',
    type: 'AvatarCirclesItem[]',
    default: '[]',
    description:
      'Avatars to display. Each item may include optional imageUrl, profileUrl, and name (used for initials fallback and labels).',
  },
  {
    name: 'numPeople',
    type: 'number',
    default: '0',
    description: 'Extra people count shown in the trailing +N badge when greater than zero.',
  },
  {
    name: 'moreHref',
    type: 'string',
    default: 'undefined',
    description: 'Optional href for the trailing +N badge. When omitted, the badge is non-interactive.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name merged onto the root group element.',
  },
];

const demoAvatars = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Alan Turing' },
  { name: 'Katherine Johnson' },
];

export default function AvatarCirclesDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box py={6}>
          <AvatarCircles numPeople={12} avatarUrls={demoAvatars} />
        </Box>
        <Text fontSize="sm" color="gray.500" mt={4}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/avatar-circles"
            color="#1620E4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Magic UI Avatar Circles
          </Link>
          . MIT License.
        </Text>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={avatarCircles} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...avatarCircles} />
      </CliTab>
    </TabbedLayout>
  );
}
