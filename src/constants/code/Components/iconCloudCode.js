import code from '@content/Components/IconCloud/IconCloud.jsx?raw';
import css from '@content/Components/IconCloud/IconCloud.css?raw';
import tailwind from '@tailwind/Components/IconCloud/IconCloud.jsx?raw';
import tsCode from '@ts-default/Components/IconCloud/IconCloud.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/IconCloud/IconCloud.tsx?raw';

export const iconCloud = {
  usage: `import { IconCloud } from './IconCloud';
import { FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';

const icons = [
  <FaReact key="react" color="#1620E4" size={28} />,
  <FaNodeJs key="node" color="#7BE9C6" size={28} />,
  <FaGithub key="gh" size={28} />,
];

export default function Example() {
  return <IconCloud icons={icons} size={400} iconSize={40} />;
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
