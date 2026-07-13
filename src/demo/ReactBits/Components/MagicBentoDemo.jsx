import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../_shared/Customize';
import CodeExample from '../../../components/code/CodeExample';

import PropTable from '../../../components/common/PropTable';
import PreviewSlider from '../_shared/PreviewSlider';
import PreviewSwitch from '../_shared/PreviewSwitch';
import Dependencies from '../../../components/code/Dependencies';

import { magicBento } from '../../../constants/code/ReactBits/Components/magicBentoCode';
import MagicBento from '../../../content/ReactBits/Components/MagicBento/MagicBento';

import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

const DEFAULT_PROPS = {
  enableStars: true,
  enableSpotlight: true,
  disableAnimations: false,
  spotlightRadius: 400,
  enableTilt: false,
  clickEffect: true,
  enableMagnetism: false
};

const MagicBentoDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { enableStars, enableSpotlight, disableAnimations, spotlightRadius, enableTilt, clickEffect, enableMagnetism } =
    props;

  const propData = useMemo(
    () => [
      {
        name: 'textAutoHide',
        type: 'boolean',
        default: 'true',
        description: 'Whether text content should auto-hide on hover'
      },
      {
        name: 'enableStars',
        type: 'boolean',
        default: 'true',
        description: 'Enable particle star animation effect'
      },
      {
        name: 'enableSpotlight',
        type: 'boolean',
        default: 'true',
        description: 'Enable spotlight cursor following effect'
      },
      {
        name: 'enableBorderGlow',
        type: 'boolean',
        default: 'true',
        description: 'Enable border glow effect that follows cursor'
      },
      {
        name: 'disableAnimations',
        type: 'boolean',
        default: 'false',
        description: 'Disable all animations (automatically enabled on mobile)'
      },
      {
        name: 'spotlightRadius',
        type: 'number',
        default: '300',
        description: 'Radius of the spotlight effect in pixels'
      },
      {
        name: 'particleCount',
        type: 'number',
        default: '12',
        description: 'Number of particles in the star animation'
      },
      {
        name: 'enableTilt',
        type: 'boolean',
        default: 'false',
        description: 'Enable 3D tilt effect on card hover'
      },
      {
        name: 'glowColor',
        type: 'string',
        default: '"132, 0, 255"',
        description: 'RGB color values for glow effects (without rgba wrapper)'
      },
      {
        name: 'clickEffect',
        type: 'boolean',
        default: 'true',
        description: 'Enable ripple effect on card click'
      },
      {
        name: 'enableMagnetism',
        type: 'boolean',
        default: 'true',
        description: 'Enable subtle card attraction to cursor'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" py={8} className="demo-container" h="auto" overflow="hidden">
            <MagicBento
              enableStars={enableStars}
              enableSpotlight={enableSpotlight}
              disableAnimations={disableAnimations}
              spotlightRadius={spotlightRadius}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            />
          </Box>

          <Customize>
            <PreviewSlider
              title="Spotlight Radius"
              min={50}
              max={800}
              step={10}
              value={spotlightRadius}
              onChange={val => updateProp('spotlightRadius', val)}
            />

            <PreviewSwitch
              title="Stars Effect"
              isChecked={enableStars}
              onChange={val => updateProp('enableStars', val)}
            />

            <PreviewSwitch
              title="Spotlight Effect"
              isChecked={enableSpotlight}
              onChange={val => updateProp('enableSpotlight', val)}
            />

            <PreviewSwitch title="Tilt Effect" isChecked={enableTilt} onChange={val => updateProp('enableTilt', val)} />

            <PreviewSwitch
              title="Click Effect"
              isChecked={clickEffect}
              onChange={val => updateProp('clickEffect', val)}
            />

            <PreviewSwitch
              title="Magnetism"
              isChecked={enableMagnetism}
              onChange={val => updateProp('enableMagnetism', val)}
            />

            <PreviewSwitch
              title="Disable All Animations"
              isChecked={disableAnimations}
              onChange={val => updateProp('disableAnimations', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={magicBento} componentName="MagicBento" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default MagicBentoDemo;
