import { useState } from 'react';
import {
  Box,
  Link,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { AnimatedCircularProgressBar } from '../../content/Components/AnimatedCircularProgressBar/AnimatedCircularProgressBar';
import { animatedCircularProgressBar } from '../../constants/code/Components/animatedCircularProgressBarCode';

const propData = [
  {
    name: 'value',
    type: 'number',
    default: '0',
    description: 'Current progress value between min and max.',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum progress value.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum progress value.',
  },
  {
    name: 'gaugePrimaryColor',
    type: 'string',
    default: '#1620E4',
    description: 'Stroke color for the primary (filled) arc.',
  },
  {
    name: 'gaugeSecondaryColor',
    type: 'string',
    default: '#7BE9C6',
    description: 'Stroke color for the secondary (remaining) arc.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name for the root element.',
  },
];

export default function AnimatedCircularProgressBarDemo() {
  const [value, setValue] = useState(66);

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box display="flex" flexDirection="column" alignItems="center" gap={6} py={8}>
          <AnimatedCircularProgressBar
            value={value}
            min={0}
            max={100}
            gaugePrimaryColor="#1620E4"
            gaugeSecondaryColor="#7BE9C6"
          />
          <Stack width="240px" spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Value: {value}
            </Text>
            <Slider
              aria-label="Progress value"
              min={0}
              max={100}
              value={value}
              onChange={setValue}
              focusThumbOnChange={false}
            >
              <SliderTrack bg="gray.200">
                <SliderFilledTrack bg="#1620E4" />
              </SliderTrack>
              <SliderThumb borderColor="#1620E4" />
            </Slider>
          </Stack>
          <Text fontSize="sm" color="gray.500" textAlign="center" maxW="md">
            Adapted from{' '}
            <Link
              href="https://magicui.design/docs/components/animated-circular-progress-bar"
              isExternal
              color="#1620E4"
            >
              Magic UI Animated Circular Progress Bar
            </Link>
            . MIT License.
          </Text>
        </Box>
        <PropTable data={propData} />
      </PreviewTab>
      <CodeTab>
        <CodeExample codeObject={animatedCircularProgressBar} />
      </CodeTab>
      <CliTab>
        <CliInstallation {...animatedCircularProgressBar} />
      </CliTab>
    </TabbedLayout>
  );
}
