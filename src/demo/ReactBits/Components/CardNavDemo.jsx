import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../_shared/TabsLayout';
import { Box } from '@chakra-ui/react';
import useForceRerender from '../../../hooks/useForceRerender';
import useComponentProps from '../_shared/useComponentProps';
import { ComponentPropsProvider } from '../_shared/ComponentPropsContext';

import Customize from '../_shared/Customize';
import CodeExample from '../../../components/code/CodeExample';

import PropTable from '../../../components/common/PropTable';
import PreviewSelect from '../_shared/PreviewSelect';
import Dependencies from '../../../components/code/Dependencies';

import logoDark from '../../../assets/logos/bemoUI-logo-white.svg';
import logoLight from '../../../assets/logos/bemoUI-logo-black.svg';

import CardNav from '../../../content/ReactBits/Components/CardNav/CardNav';
import { cardNav } from '../../../constants/code/ReactBits/Components/cardNavCode';

const DEFAULT_PROPS = {
  theme: 'light',
  ease: 'power3.out'
};

const CardNavDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { theme, ease } = props;

  const propData = useMemo(
    () => [
      {
        name: 'logo',
        type: 'string',
        default: '-',
        description: 'URL for the logo image'
      },
      {
        name: 'logoAlt',
        type: 'string',
        default: 'Logo',
        description: 'Alt text for the logo image'
      },
      {
        name: 'items',
        type: 'CardNavItem[]',
        default: '-',
        description: 'Array of navigation items with label, bgColor, textColor, and links'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes for the navigation container'
      },
      {
        name: 'ease',
        type: 'string',
        default: 'power3.out',
        description: 'GSAP easing function for animations'
      },
      {
        name: 'baseColor',
        type: 'string',
        default: '#fff',
        description: 'Background color for the navigation container'
      },
      {
        name: 'menuColor',
        type: 'string',
        default: 'undefined',
        description: 'Color for the hamburger menu lines'
      },
      {
        name: 'buttonBgColor',
        type: 'string',
        default: '#111',
        description: 'Background color for the CTA button'
      },
      {
        name: 'buttonTextColor',
        type: 'string',
        default: 'white',
        description: 'Text color for the CTA button'
      }
    ],
    []
  );

  const [key, forceRerender] = useForceRerender();

  const easeOptions = [
    { value: 'power3.out', label: 'power3.out' },
    { value: 'back.out(1.7)', label: 'back.out(1.7)' },
    { value: 'elastic.out(1, 0.8)', label: 'elastic.out(1, 0.8)' },
    { value: 'circ.out', label: 'circ.out' }
  ];

  const items = [
    {
      label: 'About',
      bgColor: '#1B1722',
      textColor: '#fff',
      links: [
        { label: 'Company', ariaLabel: 'About Company' },
        { label: 'Careers', ariaLabel: 'About Careers' }
      ]
    },
    {
      label: 'Projects',
      bgColor: '#2F293A',
      textColor: '#fff',
      links: [
        { label: 'Featured', ariaLabel: 'Featured Projects' },
        { label: 'Case Studies', ariaLabel: 'Project Case Studies' }
      ]
    },
    {
      label: 'Contact',
      bgColor: '#2F293A',
      textColor: '#fff',
      links: [
        { label: 'Email', ariaLabel: 'Email us' },
        { label: 'Twitter', ariaLabel: 'Twitter' },
        { label: 'LinkedIn', ariaLabel: 'LinkedIn' }
      ]
    }
  ];

  const themeConfigs = {
    light: {
      logo: logoLight,
      baseColor: '#fff',
      menuColor: '#000',
      buttonBgColor: '#111',
      buttonTextColor: '#fff',
      backgroundColor: '#f5f5f5',
      items
    },
    dark: {
      logo: logoDark,
      baseColor: '#120F17',
      menuColor: '#fff',
      buttonBgColor: '#1620E4',
      buttonTextColor: '#fff',
      backgroundColor: '#120F17',
      items
    },
    color: {
      logo: logoDark,
      baseColor: '#1620E4',
      menuColor: '#fff',
      buttonBgColor: '#fff',
      buttonTextColor: '#1620E4',
      backgroundColor: '#120F17',
      items
    }
  };

  const currentTheme = themeConfigs[theme];

  const themeOptions = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'color', label: 'Colorful' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            position="relative"
            className="demo-container demo-container-dots"
            h={550}
            overflow="hidden"
            bg={currentTheme.backgroundColor}
          >
            <CardNav
              key={key}
              logo={currentTheme.logo}
              items={currentTheme.items}
              baseColor={currentTheme.baseColor}
              menuColor={currentTheme.menuColor}
              buttonBgColor={currentTheme.buttonBgColor}
              buttonTextColor={currentTheme.buttonTextColor}
              ease={ease}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Example"
              options={themeOptions}
              value={theme}
              onChange={value => {
                updateProp('theme', value);
                forceRerender();
              }}
              width={150}
            />

            <PreviewSelect
              title="Animation Ease"
              options={easeOptions}
              value={ease}
              onChange={value => {
                updateProp('ease', value);
                forceRerender();
              }}
              width={170}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={cardNav} componentName="CardNav" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CardNavDemo;
