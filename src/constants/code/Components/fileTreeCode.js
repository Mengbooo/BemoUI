import code from '@content/Components/FileTree/FileTree.jsx?raw';
import css from '@content/Components/FileTree/FileTree.css?raw';
import tailwind from '@tailwind/Components/FileTree/FileTree.jsx?raw';
import tsCode from '@ts-default/Components/FileTree/FileTree.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/FileTree/FileTree.tsx?raw';

export const fileTree = {
  usage: `import FileTree, { CollapseButton, File, Folder } from './FileTree';

const elements = [
  {
    id: '1',
    name: 'src',
    children: [
      { id: '2', name: 'app.tsx' },
      { id: '3', name: 'components', children: [{ id: '4', name: 'Button.tsx' }] },
    ],
  },
];

export default function Example() {
  return (
    <div style={{ height: 320, position: 'relative' }}>
      <FileTree
        elements={elements}
        initialExpandedItems={['1']}
        initialSelectedId="2"
        indicator
      >
        <CollapseButton elements={elements} />
      </FileTree>

      {/* or compose manually */}
      <FileTree initialExpandedItems={['src']}>
        <Folder value="src" element="src">
          <File value="index">index.ts</File>
        </Folder>
      </FileTree>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
