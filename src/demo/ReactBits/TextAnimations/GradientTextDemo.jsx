import { useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';

import CodeExample from '../../../components/code/CodeExample';
import PropTable from '../../../components/common/PropTable';

import Customize from '../_shared/Customize';
import PreviewSlider from '../_shared/PreviewSlider';
import PreviewSwitch from '../_shared/PreviewSwitch';
import PreviewSelect from '../_shared/PreviewSelect';
import PreviewColorPickerCustom from '../_shared/PreviewColorPickerCustom';

import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

import GradientText from '../../../content/ReactBits/TextAnimations/GradientText/GradientText';
import { gradientText } from '../../../constants/code/ReactBits/TextAnimations/gradientTextCode';

const DEFAULT_PROPS = {
  colors: ['#1620E4', '#FF9FFC', '#B497CF'],
  animationSpeed: 8,
  direction: 'horizontal',
  pauseOnHover: false,
  yoyo: true,
  showBorder: false
};

const GradientTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { colors, animationSpeed, direction, pauseOnHover, yoyo, showBorder } = props;

  const updateColor = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    updateProp('colors', newColors);
  };

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'ReactNode',
        default: '-',
        description: 'The content to be displayed inside the gradient text.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Adds custom classes to the root element for additional styling.'
      },
      {
        name: 'colors',
        type: 'string[]',
        default: `["#1620E4", "#FF9FFC", "#B497CF"]`,
        description: 'Array of colors for the gradient effect.'
      },
      {
        name: 'animationSpeed',
        type: 'number',
        default: '8',
        description: 'Duration of one animation cycle in seconds.'
      },
      {
        name: 'direction',
        type: `'horizontal' | 'vertical' | 'diagonal'`,
        default: `'horizontal'`,
        description: 'Direction of the gradient animation.'
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        default: 'false',
        description: 'Pauses the animation when hovering over the text.'
      },
      {
        name: 'yoyo',
        type: 'boolean',
        default: 'true',
        description: 'Reverses animation direction at the end instead of looping.'
      },
      {
        name: 'showBorder',
        type: 'boolean',
        default: 'false',
        description: 'Displays a gradient border around the text.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400}>
            <Text fontSize={'3rem'} as="div">
              <GradientText
                colors={colors}
                animationSpeed={animationSpeed}
                direction={direction}
                pauseOnHover={pauseOnHover}
                yoyo={yoyo}
                showBorder={showBorder}
              >
                Gradient Magic
              </GradientText>
            </Text>
          </Box>

          <Customize>
            {colors.map((color, index) => (
              <PreviewColorPickerCustom
                key={index}
                title={`Color ${index + 1}`}
                color={color}
                onChange={val => updateColor(index, val)}
              />
            ))}

            <PreviewSlider
              title="Color Count"
              min={2}
              max={8}
              step={1}
              value={colors.length}
              onChange={val => {
                if (val > colors.length) {
                  const newColors = [...colors];
                  while (newColors.length < val) newColors.push('#ffffff');
                  updateProp('colors', newColors);
                } else if (val < colors.length) {
                  updateProp('colors', colors.slice(0, val));
                }
              }}
            />

            <PreviewSlider
              title="Animation Speed"
              min={1}
              max={20}
              step={0.5}
              value={animationSpeed}
              onChange={val => updateProp('animationSpeed', val)}
              valueUnit="s"
            />

            <PreviewSelect
              title="Direction"
              options={[
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' },
                { value: 'diagonal', label: 'Diagonal' }
              ]}
              value={direction}
              onChange={val => updateProp('direction', val)}
            />

            <PreviewSwitch title="Yoyo" isChecked={yoyo} onChange={checked => updateProp('yoyo', checked)} />

            <PreviewSwitch
              title="Pause on Hover"
              isChecked={pauseOnHover}
              onChange={checked => updateProp('pauseOnHover', checked)}
            />

            <PreviewSwitch
              title="Show Border"
              isChecked={showBorder}
              onChange={checked => updateProp('showBorder', checked)}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gradientText} componentName="GradientText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GradientTextDemo;
