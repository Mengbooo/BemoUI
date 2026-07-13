import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import NumberTicker from '../../content/Components/NumberTicker/NumberTicker';
import { numberTicker } from '../../constants/code/Components/numberTickerCode';

const propData = [
  {
    name: 'value',
    type: 'number',
    default: '—',
    description: 'Target number for the ticker (final value when direction is up).',
  },
  {
    name: 'startValue',
    type: 'number',
    default: '0',
    description: 'Starting number shown before the spring animation runs.',
  },
  {
    name: 'direction',
    type: '"up" | "down"',
    default: '"up"',
    description: 'Whether the value counts up to value or down to startValue.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay in seconds before the animation begins after entering view.',
  },
  {
    name: 'decimalPlaces',
    type: 'number',
    default: '0',
    description: 'Fixed number of fraction digits to display.',
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Optional extra class names for the root span.',
  },
];

const NumberTickerDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box>
        <Text mb={2} color="gray.400">
          Animated spring number ticker. Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/number-ticker"
            isExternal
            color="#1620E4"
            fontWeight="semibold"
          >
            Magic UI Number Ticker
            <ExternalLinkIcon mx="4px" mb="2px" />
          </Link>
          — MIT License.
        </Text>

        <Flex
          justify="center"
          align="center"
          py={12}
          minH="220px"
          bg="#0D0D12"
          borderRadius="md"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          mb={6}
        >
          <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight="bold" color="#1620E4">
            <NumberTicker value={1000} />
          </Text>
        </Flex>

        <Flex
          justify="center"
          align="center"
          gap={8}
          flexWrap="wrap"
          py={8}
          mb={6}
          bg="#111116"
          borderRadius="md"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.500" mb={1}>
              Up
            </Text>
            <Text fontSize="3xl" fontWeight="semibold" color="#1620E4">
              <NumberTicker value={2500} delay={0.2} />
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.500" mb={1}>
              Decimals
            </Text>
            <Text fontSize="3xl" fontWeight="semibold" color="#1620E4">
              <NumberTicker value={99.99} decimalPlaces={2} />
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.500" mb={1}>
              Down
            </Text>
            <Text fontSize="3xl" fontWeight="semibold" color="#1620E4">
              <NumberTicker value={100} startValue={0} direction="down" />
            </Text>
          </Box>
        </Flex>

          <PropTable data={propData} />
        </Box>
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={numberTicker} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...numberTicker} />
      </CliTab>
    </TabbedLayout>
  );
};

export default NumberTickerDemo;
