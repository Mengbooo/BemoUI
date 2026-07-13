import { Box, Link, Text } from '@chakra-ui/react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import FileTree, { CollapseButton, File, Folder } from '../../content/Components/FileTree/FileTree';
import { fileTree } from '../../constants/code/Components/fileTreeCode';

const ELEMENTS = [
  {
    id: '1',
    name: 'src',
    children: [
      {
        id: '2',
        name: 'app',
        children: [
          { id: '3', name: 'layout.tsx' },
          { id: '4', name: 'page.tsx' },
        ],
      },
      {
        id: '5',
        name: 'components',
        children: [
          { id: '6', name: 'header.tsx' },
          { id: '7', name: 'footer.tsx', isSelectable: false },
        ],
      },
      { id: '8', name: 'lib', children: [{ id: '9', name: 'utils.ts' }] },
    ],
  },
  {
    id: '10',
    name: 'public',
    children: [
      { id: '11', name: 'favicon.ico' },
      { id: '12', name: 'robots.txt' },
    ],
  },
  { id: '13', name: 'package.json' },
];

const FileTreeDemo = () => {
  const propData = [
    {
      name: 'elements',
      type: 'TreeViewElement[]',
      default: 'undefined',
      description: 'Declarative tree data. Folders are inferred from children or type.',
    },
    {
      name: 'initialSelectedId',
      type: 'string',
      default: 'undefined',
      description: 'Initially selected item id. Expands ancestor folders automatically.',
    },
    {
      name: 'initialExpandedItems',
      type: 'string[]',
      default: 'undefined',
      description: 'Folder ids expanded on first render.',
    },
    {
      name: 'indicator',
      type: 'boolean',
      default: 'true',
      description: 'Shows the vertical guide line under expanded folders.',
    },
    {
      name: 'sort',
      type: "'default' | 'none' | comparator",
      default: "'default'",
      description: 'Sort folders first then by name, keep source order, or provide a comparator.',
    },
    {
      name: 'openIcon / closeIcon',
      type: 'ReactNode',
      default: 'built-in SVG',
      description: 'Optional custom folder icons for open and closed states.',
    },
    {
      name: 'dir',
      type: "'ltr' | 'rtl'",
      default: "'ltr'",
      description: 'Text and layout direction for the tree.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" h="360px" maxW="420px" mb={6}>
          <FileTree
            elements={ELEMENTS}
            initialExpandedItems={['1', '2']}
            initialSelectedId="4"
            indicator
          >
            <CollapseButton elements={ELEMENTS} />
          </FileTree>
        </Box>

        <Box position="relative" h="280px" maxW="420px" mb={6}>
          <FileTree initialExpandedItems={['app']}>
            <Folder value="app" element="app">
              <File value="page">page.tsx</File>
              <Folder value="components" element="components">
                <File value="button">button.tsx</File>
              </Folder>
            </Folder>
            <File value="package">package.json</File>
          </FileTree>
        </Box>

        <Text fontSize="sm" color="gray.500" mb={6}>
          Adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/file-tree"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI File Tree
          </Link>{' '}
          · MIT License
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={fileTree} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...fileTree} />
      </CliTab>
    </TabbedLayout>
  );
};

export default FileTreeDemo;
