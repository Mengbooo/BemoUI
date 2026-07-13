import { Box, Text, Link, Heading } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import DottedMap from '../../content/Components/DottedMap/DottedMap';
import { dottedMap } from '../../constants/code/Components/dottedMapCode';

const DottedMapDemo = () => {
  const propData = [
    {
      name: 'width',
      type: 'number',
      default: '150',
      description: 'Logical SVG width used for projection and viewBox.',
    },
    {
      name: 'height',
      type: 'number',
      default: '75',
      description: 'Logical SVG height used for projection and viewBox.',
    },
    {
      name: 'mapSamples',
      type: 'number',
      default: '5000',
      description: 'Target number of land dots to sample for the map.',
    },
    {
      name: 'markers',
      type: 'Marker[]',
      default: '[]',
      description: 'Location markers with lat, lng, optional size and pulse.',
    },
    {
      name: 'dotColor',
      type: 'string',
      default: '#9CA3AF',
      description: 'Fill color for background map dots.',
    },
    {
      name: 'markerColor',
      type: 'string',
      default: '#1620E4',
      description: 'Fill/stroke color for markers and pulse rings (BemoUI blue).',
    },
    {
      name: 'dotRadius',
      type: 'number',
      default: '0.2',
      description: 'Default radius for map dots and markers without size.',
    },
    {
      name: 'stagger',
      type: 'boolean',
      default: 'true',
      description: 'Offset alternating rows for a denser dotted appearance.',
    },
    {
      name: 'pulse',
      type: 'boolean',
      default: 'false',
      description: 'Enable pulse rings on markers unless marker.pulse is false.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Reduces opacity, disables pointer events, and stops pulse animation.',
    },
    {
      name: 'renderMarkerOverlay',
      type: 'function',
      default: 'undefined',
      description: 'Optional render prop for custom marker overlays.',
    },
    {
      name: 'aria-label',
      type: 'string',
      default: 'Dotted world map',
      description: 'Accessible label for the map SVG.',
    },
  ];

  const sampleMarkers = [
    { lat: 40.7128, lng: -74.006, size: 0.45, pulse: true },
    { lat: 51.5074, lng: -0.1278, size: 0.4 },
    { lat: 35.6762, lng: 139.6503, size: 0.4, pulse: true },
    { lat: -33.8688, lng: 151.2093, size: 0.35 },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" overflow="hidden" minH={320} display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={6}>
          <Box w="100%" maxW="720px">
            <DottedMap
              width={150}
              height={75}
              mapSamples={4000}
              markers={sampleMarkers}
              dotColor="#9CA3AF"
              markerColor="#1620E4"
              dotRadius={0.22}
              stagger
              pulse
            />
          </Box>
          <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
            Decorative accents use BemoUI blue #1620E4 and green #7BE9C6.
          </Text>
        </Box>

        <Box mt={6} mb={2}>
          <Heading as="h3" size="sm" mb={2}>
            Source credit
          </Heading>
          <Text fontSize="sm" color="gray.400">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/dotted-map"
              isExternal
              color="#1620E4"
              fontWeight="medium"
            >
              Magic UI Dotted Map
            </Link>
            . MIT License.
          </Text>
        </Box>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={dottedMap} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...dottedMap} />
      </CliTab>
    </TabbedLayout>
  );
};

export default DottedMapDemo;
