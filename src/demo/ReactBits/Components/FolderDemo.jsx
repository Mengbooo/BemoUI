import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../_shared/Customize';
import PreviewSlider from '../_shared/PreviewSlider';
import PreviewColorPickerCustom from '../_shared/PreviewColorPickerCustom';
import CodeExample from '../../../components/code/CodeExample';
import useForceRerender from '../../../hooks/useForceRerender';
import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

import PropTable from '../../../components/common/PropTable';

import Folder from '../../../content/ReactBits/Components/Folder/Folder';
import { folder } from '../../../constants/code/ReactBits/Components/folderCode';

const DEFAULT_PROPS = {
  color: '#1620E4',
  size: 2
};

const FolderDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { color, size } = props;

  const propData = useMemo(
    () => [
      {
        name: 'color',
        type: 'string',
        default: '#1620E4',
        description: 'The primary color of the folder.'
      },
      {
        name: 'size',
        type: 'number',
        default: '1',
        description: 'Scale factor for the folder size.'
      },
      {
        name: 'items',
        type: 'React.ReactNode[]',
        default: '[]',
        description: 'An array of up to 3 items rendered as papers in the folder.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Additional CSS classes for the folder container.'
      }
    ],
    []
  );

  const [key, forceRerender] = useForceRerender();

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <Folder key={key} size={size} color={color} className="custom-folder" />
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={color} onChange={val => { updateProp('color', val); forceRerender(); }} />

            <PreviewSlider
              title="Size"
              min={0.1}
              max={3}
              step={0.1}
              value={size}
              onChange={val => {
                updateProp('size', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={folder} componentName="Folder" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FolderDemo;
