import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';
import { hyperspeedPresets } from '../../../content/ReactBits/Backgrounds/Hyperspeed/HyperSpeedPresets';

import OpenInStudioButton from '../_shared/OpenInStudioButton';
import useForceRerender from '../../../hooks/useForceRerender';
import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

import PropTable from '../../../components/common/PropTable';
import CodeExample from '../../../components/code/CodeExample';
import Dependencies from '../../../components/code/Dependencies';
import PreviewSelect from '../_shared/PreviewSelect';
import Customize from '../_shared/Customize';

import BackgroundContent from '../_shared/BackgroundContent';

import Hyperspeed from '../../../content/ReactBits/Backgrounds/Hyperspeed/Hyperspeed';
import { hyperspeed } from '../../../constants/code/ReactBits/Backgrounds/hyperspeedCode';

const DEFAULT_PROPS = {
  activePreset: 'one'
};

const HyperspeedDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { activePreset } = props;
  const [key] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'effectOptions',
        type: 'object',
        default: 'See the "code" tab for default values and presets.',
        description:
          'The highly customizable configuration object for the effect, controls things like colors, distortion, line properties, etc.'
      }
    ],
    []
  );

  const options = [
    { value: 'one', label: 'Cyberpunk' },
    { value: 'two', label: 'Akira' },
    { value: 'three', label: 'Golden' },
    { value: 'four', label: 'Split' },
    { value: 'five', label: 'Highway' }
  ];

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['activePreset']}
      computedProps={{ effectOptions: hyperspeedPresets[activePreset] }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box
            key={key}
            position="relative"
            className="demo-container"
            overflow="hidden"
            h={500}
            cursor="pointer"
            p={0}
            mb={4}
          >
            <Hyperspeed effectOptions={hyperspeedPresets[activePreset]} />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Click & hold to see the real magic of hyperspeed!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="hyperspeed"
              currentProps={{ preset: activePreset }}
              defaultProps={{ preset: 'one' }}
            />
          </Flex>

          <Customize>
            <PreviewSelect
              title="Animation Preset"
              options={options}
              value={activePreset}
              name="tiltDirection"
              width={150}
              onChange={val => {
                updateProp('activePreset', val);
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', 'postprocessing']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={hyperspeed} componentName="Hyperspeed" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default HyperspeedDemo;
