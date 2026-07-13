import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import OpenInStudioButton from '../_shared/OpenInStudioButton';

import useForceRerender from '../../../hooks/useForceRerender';
import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

import Customize from '../_shared/Customize';
import CodeExample from '../../../components/code/CodeExample';
import PreviewSlider from '../_shared/PreviewSlider';
import PreviewSwitch from '../_shared/PreviewSwitch';

import PropTable from '../../../components/common/PropTable';
import Dependencies from '../../../components/code/Dependencies';
import BackgroundContent from '../_shared/BackgroundContent';

import Threads from '../../../content/ReactBits/Backgrounds/Threads/Threads';
import { threads } from '../../../constants/code/ReactBits/Backgrounds/threadsCode';

const DEFAULT_PROPS = {
  amplitude: 1,
  distance: 0,
  enableMouseInteraction: true
};

const ThreadsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { amplitude, distance, enableMouseInteraction } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'color',
        type: '[number, number, number]',
        default: '[1, 1, 1]',
        description: 'Customizes the color of the lines (RGB).'
      },
      {
        name: 'amplitude',
        type: 'number',
        default: '1',
        description: 'Adjusts the intensity of the wave effect on the lines.'
      },
      {
        name: 'distance',
        type: 'number',
        default: '0',
        description: 'Controls the spacing between the lines. A value of 0 means no offset.'
      },
      {
        name: 'enableMouseInteraction',
        type: 'boolean',
        default: 'false',
        description: "Enables smooth mouse hover effects that modulate the line's movement and amplitude."
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <Threads
              key={key}
              amplitude={amplitude}
              distance={distance}
              enableMouseInteraction={enableMouseInteraction}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Not to be confused with the Threads app by Meta!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="threads"
              currentProps={{ amplitude, distance, enableMouseInteraction }}
              defaultProps={{ amplitude: 1, distance: 0, enableMouseInteraction: true }}
            />
          </Flex>

          <Customize onReset={resetProps} onRerender={forceRerender} hasChanges={hasChanges}>
            <PreviewSlider
              title="Amplitude"
              min={0}
              max={5}
              step={0.1}
              value={amplitude}
              onChange={val => updateProp('amplitude', val)}
            />

            <PreviewSlider
              title="Distance"
              min={0}
              max={2}
              step={0.1}
              value={distance}
              onChange={val => updateProp('distance', val)}
            />

            <PreviewSwitch
              title="Enable Mouse Interaction"
              isChecked={enableMouseInteraction}
              onChange={checked => updateProp('enableMouseInteraction', checked)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={threads} componentName="Threads" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ThreadsDemo;
