import { Box, Link, Text } from '@chakra-ui/react';
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaNpm,
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaDocker,
  FaFigma,
  FaAws,
  FaPython,
  FaGitAlt,
} from 'react-icons/fa';
import { SiTypescript, SiVite, SiTailwindcss, SiChakraui } from 'react-icons/si';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import IconCloud from '../../content/Components/IconCloud/IconCloud';
import { iconCloud } from '../../constants/code/Components/iconCloudCode';

const demoIcons = [
  <FaReact key="react" color="#1620E4" size={28} />,
  <SiTypescript key="ts" color="#1620E4" size={28} />,
  <FaNodeJs key="node" color="#7BE9C6" size={28} />,
  <SiVite key="vite" color="#1620E4" size={28} />,
  <SiTailwindcss key="tw" color="#7BE9C6" size={28} />,
  <FaGithub key="gh" color="#111111" size={28} />,
  <FaNpm key="npm" color="#1620E4" size={28} />,
  <FaCss3Alt key="css" color="#1620E4" size={28} />,
  <FaHtml5 key="html" color="#1620E4" size={28} />,
  <FaJs key="js" color="#7BE9C6" size={28} />,
  <FaDocker key="docker" color="#1620E4" size={28} />,
  <FaFigma key="figma" color="#111111" size={28} />,
  <FaAws key="aws" color="#1620E4" size={28} />,
  <FaPython key="py" color="#7BE9C6" size={28} />,
  <FaGitAlt key="git" color="#1620E4" size={28} />,
  <SiChakraui key="chakra" color="#7BE9C6" size={28} />,
];

const propData = [
  {
    name: 'icons',
    type: 'React.ReactNode[]',
    default: 'undefined',
    description: 'Icon nodes distributed on the sphere. Falls back to numbered BemoUI orbs.',
  },
  {
    name: 'size',
    type: 'number',
    default: '400',
    description: 'Canvas width and height in pixels.',
  },
  {
    name: 'iconSize',
    type: 'number',
    default: '40',
    description: 'Base pixel size for each icon slot.',
  },
  {
    name: 'radius',
    type: 'number',
    default: 'size * 0.35',
    description: 'Sphere radius used for Fibonacci distribution.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name for the root element.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: 'Interactive 3D Icon Cloud',
    description: 'Accessible label announced for the interactive cloud.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer and keyboard interaction.',
  },
];

const IconCloudDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Box display="flex" justifyContent="center" py={8}>
          <IconCloud icons={demoIcons} size={400} iconSize={40} />
        </Box>

        <Text mt={4} fontSize="sm" color="gray.500">
          Source adapted from{' '}
          <Link
            href="https://magicui.design/docs/components/icon-cloud"
            isExternal
            color="#1620E4"
            textDecoration="underline"
          >
            Magic UI Icon Cloud
          </Link>
          . MIT License.
        </Text>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={iconCloud} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...iconCloud} />
      </CliTab>
    </TabbedLayout>
  );
};

export default IconCloudDemo;
