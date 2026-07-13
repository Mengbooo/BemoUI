import { Box, Link, Stack, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Android from '../../content/Components/Android/Android';
import { android } from '../../constants/code/Components/androidCode';

const AndroidDemo = () => {
  const propData = [
    {
      name: 'width',
      type: 'number',
      default: '433',
      description: 'Display width of the Android mockup in pixels.',
    },
    {
      name: 'height',
      type: 'number',
      default: '882',
      description: 'Display height of the Android mockup in pixels.',
    },
    {
      name: 'src',
      type: 'string',
      default: 'undefined',
      description: 'Optional local image path rendered on the device screen.',
    },
    {
      name: 'videoSrc',
      type: 'string',
      default: 'undefined',
      description: 'Optional local video path played on the device screen.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Dims the mockup and disables pointer interaction.',
    },
    {
      name: 'aria-label',
      type: 'string',
      default: '"Android device mockup"',
      description: 'Accessible label announced for the SVG graphic.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box display="flex" justifyContent="center" py={8}>
          <Android width={280} height={570} />
        </Box>
        <Stack spacing={2} mt={4} mb={6}>
          <Text fontSize="sm" color="gray.500">
            Source credit:{' '}
            <Link
              href="https://magicui.design/docs/components/android"
              isExternal
              color="#1620E4"
              textDecoration="underline"
            >
              Magic UI Android
            </Link>
            . MIT License.
          </Text>
        </Stack>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={android} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...android} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AndroidDemo;
