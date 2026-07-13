import { Box, Text, Link, VStack } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Iphone from '../../content/Components/Iphone/Iphone';
import { iphone } from '../../constants/code/Components/iphoneCode';

const IphoneDemo = () => {
  const propData = [
    {
      name: 'src',
      type: 'string',
      default: 'undefined',
      description: 'Optional image URL shown inside the device screen.',
    },
    {
      name: 'videoSrc',
      type: 'string',
      default: 'undefined',
      description: 'Optional video URL shown inside the device screen. Takes precedence over src.',
    },
    {
      name: 'alt',
      type: 'string',
      default: "''",
      description: 'Accessible label for the frame and image content.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Custom screen content when no src or videoSrc is provided.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional class names for the root element.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={10}
          px={4}
          maxW="280px"
          mx="auto"
        >
          <Iphone alt="BemoUI iPhone preview">
            <Box
              w="100%"
              h="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
              p={6}
              color="white"
            >
              <Box
                w="48px"
                h="48px"
                borderRadius="12px"
                bg="#7BE9C6"
              />
              <Text fontWeight="bold" fontSize="lg" textAlign="center">
                BemoUI
              </Text>
              <Text fontSize="sm" opacity={0.85} textAlign="center">
                Device frame preview
              </Text>
            </Box>
          </Iphone>
        </Box>

        <VStack align="start" spacing={2} mt={6} px={1}>
          <Text fontSize="sm" color="gray.500">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/iphone"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI iPhone
            </Link>
            {' '}— MIT License
          </Text>
        </VStack>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={iphone} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...iphone} />
      </CliTab>
    </TabbedLayout>
  );
};

export default IphoneDemo;
