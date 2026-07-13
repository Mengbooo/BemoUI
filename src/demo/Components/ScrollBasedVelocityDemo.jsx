import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import {
  ScrollBasedVelocity,
  ScrollBasedVelocityRow,
} from '../../content/Components/ScrollBasedVelocity/ScrollBasedVelocity';
import { scrollBasedVelocity } from '../../constants/code/Components/scrollBasedVelocityCode';

const propData = [
  {
    name: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'Content rendered inside the container or velocity marquee row.',
  },
  {
    name: 'baseVelocity',
    type: 'number',
    default: '5',
    description: 'Base marquee speed factor (ScrollBasedVelocityRow).',
  },
  {
    name: 'direction',
    type: '1 | -1',
    default: '1',
    description: 'Initial marquee direction (ScrollBasedVelocityRow).',
  },
  {
    name: 'scrollReactivity',
    type: 'boolean',
    default: 'true',
    description: 'Multiplies speed from page scroll velocity when enabled (ScrollBasedVelocityRow).',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name applied to the root element.',
  },
];

const ScrollBasedVelocityDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box minH="120vh" py={8}>
          <VStack spacing={8} align="stretch">
            <Text color="gray.500" fontSize="sm">
              Scroll the page to accelerate the marquee rows.
            </Text>
            <ScrollBasedVelocity>
              <ScrollBasedVelocityRow baseVelocity={5} direction={1}>
                <Box
                  as="span"
                  color="#1620E4"
                  fontSize="3xl"
                  fontWeight="bold"
                  mr={8}
                >
                  BemoUI
                </Box>
                <Box
                  as="span"
                  color="#7BE9C6"
                  fontSize="3xl"
                  fontWeight="bold"
                  mr={8}
                >
                  Scroll Based Velocity
                </Box>
                <Box
                  as="span"
                  color="#1620E4"
                  fontSize="3xl"
                  fontWeight="bold"
                  mr={8}
                >
                  Production Ready
                </Box>
              </ScrollBasedVelocityRow>
              <ScrollBasedVelocityRow baseVelocity={5} direction={-1}>
                <Box
                  as="span"
                  color="#7BE9C6"
                  fontSize="3xl"
                  fontWeight="bold"
                  mr={8}
                >
                  React Components
                </Box>
                <Box
                  as="span"
                  color="#1620E4"
                  fontSize="3xl"
                  fontWeight="bold"
                  mr={8}
                >
                  Smooth Motion
                </Box>
                <Box
                  as="span"
                  color="#7BE9C6"
                  fontSize="3xl"
                  fontWeight="bold"
                  mr={8}
                >
                  Accessible UI
                </Box>
              </ScrollBasedVelocityRow>
            </ScrollBasedVelocity>
            <Box h="40vh" />
            <Text fontSize="sm" color="gray.400">
              Source credit:{' '}
              <Link
                href="https://magicui.design/docs/components/scroll-based-velocity"
                isExternal
                color="#1620E4"
              >
                Magic UI Scroll Based Velocity
              </Link>
              {' '}
              · MIT License
            </Text>
          </VStack>
        </Box>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={scrollBasedVelocity} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...scrollBasedVelocity} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ScrollBasedVelocityDemo;
