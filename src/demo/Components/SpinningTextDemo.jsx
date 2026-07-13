import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import SpinningText from '../../content/Components/SpinningText/SpinningText';
import { spinningText } from '../../constants/code/Components/spinningTextCode';

const propData = [
  {
    name: 'children',
    type: 'string | string[]',
    default: '-',
    description: 'Text content arranged and spun around a circle.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '10',
    description: 'Full rotation duration in seconds.',
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: 'Spins counter-clockwise when true.',
  },
  {
    name: 'radius',
    type: 'number',
    default: '5',
    description: 'Circle radius in ch units.',
  },
  {
    name: 'className',
    type: 'string',
    default: '-',
    description: 'Optional class names for the root element.',
  },
];

const SpinningTextDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="240px"
          py={10}
          borderRadius="md"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          bg="#111116"
        >
          <SpinningText duration={12} radius={6}>
            BemoUI • Spin
          </SpinningText>
        </Box>

        <Box mt={6} display="flex" justifyContent="center" gap={10} flexWrap="wrap">
          <SpinningText duration={8} radius={4} reverse style={{ color: '#7BE9C6' }}>
            reverse pass
          </SpinningText>
          <SpinningText duration={14} radius={5}>
            #1620E4
          </SpinningText>
        </Box>

        <Text fontSize="sm" color="gray.500" mt={8}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/spinning-text"
            isExternal
            color="#1620E4"
            fontWeight="medium"
          >
            Magic UI Spinning Text
          </Link>
          {' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={spinningText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...spinningText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default SpinningTextDemo;
