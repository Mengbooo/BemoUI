import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import Safari from '../../content/Components/Safari/Safari';
import { safari } from '../../constants/code/Components/safariCode';

export default function SafariDemo() {
  const props = [
    { name: 'url', type: 'string', default: "'bemoui.dev'", description: 'Address displayed in the browser toolbar.' },
    { name: 'imageSrc', type: 'string', default: 'undefined', description: 'Image displayed in the browser viewport.' },
    { name: 'videoSrc', type: 'string', default: 'undefined', description: 'Video displayed in the browser viewport.' },
    { name: 'mode', type: "'default' | 'simple'", default: "'default'", description: 'Controls optional browser toolbar actions.' },
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Custom viewport content when no media is supplied.' },
  ];
  return <TabbedLayout>
    <PreviewTab><Safari url="bemoui.dev/components"><Box h="100%" display="grid" placeItems="center" bg="linear-gradient(135deg, #1620E4, #7BE9C6)" color="white"><Text fontSize={{ base: '2xl', md: '5xl' }} fontWeight="bold">Build a better landing page.</Text></Box></Safari><Text mt={4} fontSize="sm" color="gray.500">Source credit: <Link href="https://magicui.design/docs/components/safari" isExternal color="#1620E4">Magic UI Safari</Link>. MIT License.</Text><PropTable data={props} /></PreviewTab>
    <CodeTab><CodeExample codeObject={safari} /></CodeTab>
    <CliTab><CliInstallation {...safari} /></CliTab>
  </TabbedLayout>;
}
