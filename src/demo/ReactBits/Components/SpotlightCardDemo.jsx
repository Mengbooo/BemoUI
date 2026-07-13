import { useMemo } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { VscSparkleFilled } from 'react-icons/vsc';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';
import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

import CodeExample from '../../../components/code/CodeExample';
import Customize from '../_shared/Customize';
import PreviewColorPickerCustom from '../_shared/PreviewColorPickerCustom';
import PropTable from '../../../components/common/PropTable';

import SpotlightCard from '../../../content/ReactBits/Components/SpotlightCard/SpotlightCard';
import { spotlightCard } from '../../../constants/code/ReactBits/Components/spotlightCardCode';

const DEFAULT_PROPS = {
  spotlightColor: '#ffffff40'
};

const SpotlightCardDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { spotlightColor } = props;

  const propData = useMemo(
    () => [
      {
        name: 'spotlightColor',
        type: 'string',
        default: 'rgba(255, 255, 255, 0.25)',
        description: 'Controls the color of the radial gradient used for the spotlight effect.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Allows adding custom classes to the component.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" py={10}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor={spotlightColor}>
              <Flex h={'100%'} direction="column" alignItems="flex-start" justifyContent="center">
                <Icon mb={3} boxSize={12} as={VscSparkleFilled} />
                <Text fontWeight={600} fontSize={'1.4rem'} letterSpacing={'-.5px'}>
                  Boost Your Experience
                </Text>
                <Text color="#a1a1aa" fontSize={'14px'} mt={1} mb={8}>
                  Get exclusive benefits, features & 24/7 support as a permanent club member.
                </Text>
              </Flex>
            </SpotlightCard>
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Spotlight Color" color={spotlightColor} onChange={v => updateProp('spotlightColor', v)} />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={spotlightCard} componentName="SpotlightCard" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SpotlightCardDemo;
