import { Box, Link, Text } from '@chakra-ui/react';
import { FiBell, FiFileText, FiShare2 } from 'react-icons/fi';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import { BentoCard, BentoGrid } from '../../content/Components/BentoGrid/BentoGrid';
import { bentoGrid } from '../../constants/code/Components/bentoGridCode';

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'BentoCard elements rendered inside the grid.',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class names for the grid or card.',
  },
  {
    name: 'name',
    type: 'string',
    default: '—',
    description: 'Card title text (BentoCard).',
  },
  {
    name: 'description',
    type: 'string',
    default: '—',
    description: 'Supporting copy shown under the title (BentoCard).',
  },
  {
    name: 'Icon',
    type: 'React.ElementType',
    default: '—',
    description: 'Icon component rendered above the title (BentoCard).',
  },
  {
    name: 'background',
    type: 'ReactNode',
    default: '—',
    description: 'Decorative background content for a card (BentoCard).',
  },
  {
    name: 'href',
    type: 'string',
    default: '—',
    description: 'Destination for the card call-to-action link (BentoCard).',
  },
  {
    name: 'cta',
    type: 'string',
    default: '—',
    description: 'Call-to-action label (BentoCard).',
  },
];

const featureBackground = (from, to) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(145deg, ${from}22 0%, ${to}33 55%, transparent 100%)`,
    }}
  />
);

const BentoGridDemo = () => (
  <TabbedLayout>
    <PreviewTab>
      <Box mb={4}>
        <Text fontSize="sm" color="gray.500">
          Source credit:{' '}
          <Link
            href="https://magicui.design/docs/components/bento-grid"
            isExternal
            color="#1620E4"
            fontWeight="600"
          >
            Magic UI Bento Grid
          </Link>{' '}
          · MIT License
        </Text>
      </Box>

      <Box maxW="960px" w="100%">
        <BentoGrid>
          <BentoCard
            name="Save your files"
            className="bemo-bento-grid__card--span-2"
            href="#"
            cta="Learn more"
            description="Store project assets with a clean, glanceable overview."
            Icon={FiFileText}
            background={featureBackground('#1620E4', '#7BE9C6')}
          />
          <BentoCard
            name="Notifications"
            href="#"
            cta="View inbox"
            description="Stay informed without leaving your workspace."
            Icon={FiBell}
            background={featureBackground('#7BE9C6', '#1620E4')}
          />
          <BentoCard
            name="Share anywhere"
            className="bemo-bento-grid__card--span-3"
            href="#"
            cta="Open share"
            description="Ship polished feature cards with keyboard-friendly CTAs."
            Icon={FiShare2}
            background={featureBackground('#1620E4', '#7BE9C6')}
          />
        </BentoGrid>
      </Box>

      <PropTable data={props} />
    </PreviewTab>
    <CodeTab>
      <CodeExample codeObject={bentoGrid} />
    </CodeTab>
    <CliTab>
      <CliInstallation {...bentoGrid} />
    </CliTab>
  </TabbedLayout>
);
export default BentoGridDemo;
