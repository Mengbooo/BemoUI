import code from '@content/ReactBits/Components/GlassIcons/GlassIcons.jsx?raw';
import css from '@content/ReactBits/Components/GlassIcons/GlassIcons.css?raw';
import tailwind from '@tailwind/ReactBits/Components/GlassIcons/GlassIcons.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/GlassIcons/GlassIcons.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/GlassIcons/GlassIcons.tsx?raw';

export const glassIcons = {
  usage: `import GlassIcons from './GlassIcons'

// update with your own icons and colors
const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Health' },
  { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

<div style={{ height: '600px', position: 'relative' }}>
  <GlassIcons items={items} className="custom-class"/>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
