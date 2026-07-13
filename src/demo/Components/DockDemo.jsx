import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FiHome, FiMail, FiSearch, FiSettings, FiUser } from 'react-icons/fi';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { Dock, DockIcon } from '../../content/Components/Dock/Dock';
import { dock } from '../../constants/code/Components/dockCode';

const DockDemo = () => {
  const propData = [
    {
      name: 'iconSize',
      type: 'number',
      default: '40',
      description: 'Base size of each dock icon in pixels.',
    },
    {
      name: 'iconMagnification',
      type: 'number',
      default: '60',
      description: 'Magnified size of icons nearest the cursor.',
    },
    {
      name: 'disableMagnification',
      type: 'boolean',
      default: 'false',
      description: 'Disables the hover magnification effect.',
    },
    {
      name: 'iconDistance',
      type: 'number',
      default: '140',
      description: 'Cursor distance that influences magnification falloff.',
    },
    {
      name: 'direction',
      type: "'top' | 'middle' | 'bottom'",
      default: "'middle'",
      description: 'Vertical alignment of icons within the dock.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS class names for the dock container.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      description: 'DockIcon children rendered inside the dock.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={300} overflow="hidden">
          <Flex h="100%" align="center" justify="center">
            <Dock>
              <DockIcon aria-label="Home">
                <FiHome size={18} />
              </DockIcon>
              <DockIcon aria-label="Search">
                <FiSearch size={18} />
              </DockIcon>
              <DockIcon aria-label="Mail">
                <FiMail size={18} />
              </DockIcon>
              <DockIcon aria-label="Profile">
                <FiUser size={18} />
              </DockIcon>
              <DockIcon aria-label="Settings">
                <FiSettings size={18} />
              </DockIcon>
            </Dock>
          </Flex>
        </Box>

        <Text fontSize="sm" color="gray.500" mt={4}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/dock"
            isExternal
            color="#1620E4"
          >
            Magic UI Dock
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={dock} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...dock} />
      </CliTab>
    </TabbedLayout>
  );
};

export default DockDemo;
