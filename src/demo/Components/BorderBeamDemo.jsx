import { Box, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { BorderBeam } from '../../content/Components/BorderBeam/BorderBeam';
import { borderBeam } from '../../constants/code/Components/borderBeamCode';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { PreviewTab, CodeTab, CliTab, TabbedLayout } from '../../components/common/TabbedLayout';

const BorderBeamDemo = () => {
  const propData = [
    {
      name: 'size',
      type: 'number',
      default: '50',
      description: 'Size of the animated beam in pixels.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '6',
      description: 'Duration of one full loop in seconds.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: 'Start delay in seconds (applied as a negative animation delay).',
    },
    {
      name: 'colorFrom',
      type: 'string',
      default: '#1620E4',
      description: 'Start color of the beam gradient.',
    },
    {
      name: 'colorTo',
      type: 'string',
      default: '#7BE9C6',
      description: 'Mid color of the beam gradient.',
    },
    {
      name: 'reverse',
      type: 'boolean',
      default: 'false',
      description: 'Reverses the travel direction of the beam.',
    },
    {
      name: 'initialOffset',
      type: 'number',
      default: '0',
      description: 'Initial offset along the path (0–100).',
    },
    {
      name: 'borderWidth',
      type: 'number',
      default: '1',
      description: 'Border width in pixels used for the beam mask.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class name applied to the beam element.',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      default: 'undefined',
      description: 'Optional inline styles applied to the beam element.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          h={300}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          bg="blackAlpha.400"
        >
          <BorderBeam />
          <Text fontSize="xl" fontWeight="semibold" color="white">
            Border Beam
          </Text>
        </Box>

        <Box
          mt={6}
          position="relative"
          h={200}
          overflow="hidden"
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#0a0a0a"
        >
          <BorderBeam
            size={80}
            duration={8}
            borderWidth={2}
            colorFrom="#1620E4"
            colorTo="#7BE9C6"
          />
          <Text color="gray.300">Custom size & colors</Text>
        </Box>

        <PropTable data={propData} />

        <Box mt={4} fontSize="sm" color="gray.400">
          <Text>
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/border-beam"
              isExternal
              color="#7BE9C6"
            >
              Magic UI Border Beam <ExternalLinkIcon mx="2px" />
            </Link>
            . MIT License.
          </Text>
        </Box>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={borderBeam} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...borderBeam} />
      </CliTab>
    </TabbedLayout>
  );
};

export default BorderBeamDemo;
