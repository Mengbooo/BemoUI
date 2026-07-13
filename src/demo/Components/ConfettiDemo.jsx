import { Box, Button, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { Confetti, ConfettiButton } from '../../content/Components/Confetti/Confetti';
import { confetti } from '../../constants/code/Components/confettiCode';

const ConfettiDemo = () => {
  const confettiRef = useRef(null);

  const propData = [
    {
      name: 'options',
      type: 'ConfettiOptions',
      default: '{}',
      description: 'Burst options such as particleCount, spread, colors, origin, and gravity.',
    },
    {
      name: 'globalOptions',
      type: 'ConfettiGlobalOptions',
      default: '{ resize: true }',
      description: 'Container-level settings. resize keeps the burst layer sized to its parent.',
    },
    {
      name: 'manualstart',
      type: 'boolean',
      default: 'false',
      description: 'When true, skips the automatic mount burst so you can call ref.fire().',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Optional content rendered above the decorative particle layer.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <VStack align="stretch" spacing={8}>
          <Box
            position="relative"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            borderRadius="lg"
            overflow="hidden"
            bg="#111116"
            minH="280px"
          >
            <Confetti
              ref={confettiRef}
              manualstart
              options={{
                particleCount: 80,
                spread: 75,
                colors: ['#1620E4', '#7BE9C6', '#FFFFFF', '#111827'],
              }}
              style={{ minHeight: '280px' }}
            >
              <Flex
                position="relative"
                zIndex={2}
                minH="280px"
                align="center"
                justify="center"
                direction="column"
                gap={4}
                p={8}
              >
                <Text fontWeight="semibold" color="gray.800">
                  Celebrate with BemoUI Confetti
                </Text>
                <Button
                  colorScheme="blue"
                  bg="#1620E4"
                  _hover={{ bg: '#1118b8' }}
                  onClick={() => confettiRef.current?.fire()}
                >
                  Fire confetti
                </Button>
              </Flex>
            </Confetti>
          </Box>

          <Flex justify="center">
            <ConfettiButton
              options={{
                particleCount: 70,
                spread: 65,
                colors: ['#1620E4', '#7BE9C6', '#FFFFFF'],
              }}
            >
              Confetti Button
            </ConfettiButton>
          </Flex>

          <Box fontSize="sm" color="gray.400">
            <Text>
              Adapted for BemoUI from{' '}
              <Link
                href="https://magicui.design/docs/components/confetti"
                isExternal
                color="#1620E4"
                textDecoration="underline"
              >
                Magic UI Confetti
              </Link>
              . Source credit: Magic UI. License: MIT License.
            </Text>
          </Box>

          <PropTable data={propData} />
        </VStack>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={confetti} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...confetti} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ConfettiDemo;
