import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import MagicAnimatedList from '../../content/Components/MagicAnimatedList/MagicAnimatedList';
import { magicAnimatedList } from '../../constants/code/Components/magicAnimatedListCode';

const notifications = [
  {
    name: 'Payment received',
    description: 'BemoUI',
    time: '15m ago',
    accent: '#1620E4',
  },
  {
    name: 'User signed up',
    description: 'BemoUI',
    time: '10m ago',
    accent: '#7BE9C6',
  },
  {
    name: 'New message',
    description: 'BemoUI',
    time: '5m ago',
    accent: '#1620E4',
  },
  {
    name: 'New event',
    description: 'BemoUI',
    time: '2m ago',
    accent: '#7BE9C6',
  },
];

function NotificationCard({ name, description, time, accent }) {
  return (
    <Flex
      align="center"
      gap={3}
      w="100%"
      maxW="380px"
      mx="auto"
      p={3}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      bg="#111116"
      boxShadow="sm"
    >
      <Box
        w="40px"
        h="40px"
        borderRadius="full"
        flexShrink={0}
        bg={accent}
        aria-hidden="true"
      />
      <Box flex="1" minW={0}>
        <Text fontWeight="600" fontSize="sm" color="gray.900" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="xs" color="gray.400" noOfLines={1}>
          {description}
        </Text>
      </Box>
      <Text fontSize="xs" color="gray.500" flexShrink={0}>
        {time}
      </Text>
    </Flex>
  );
}

const propData = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Items revealed one by one from the top of the stack.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '1000',
    description: 'Milliseconds between revealing each subsequent item.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name applied to the list container.',
  },
];

const MagicAnimatedListDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h="420px"
          w="100%"
          overflow="hidden"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#0D0D12"
          p={6}
        >
          <MagicAnimatedList delay={1200}>
            {notifications.map((item) => (
              <NotificationCard key={item.name} {...item} />
            ))}
          </MagicAnimatedList>
        </Box>

        <Text mt={4} fontSize="sm" color="gray.400">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/animated-list"
            isExternal
            color="#1620E4"
            fontWeight="600"
          >
            Magic UI Animated List
          </Link>
          {' — '}MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={magicAnimatedList} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...magicAnimatedList} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MagicAnimatedListDemo;
