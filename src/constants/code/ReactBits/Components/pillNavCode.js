import code from '@content/ReactBits/Components/PillNav/PillNav.jsx?raw';
import css from '@content/ReactBits/Components/PillNav/PillNav.css?raw';
import tailwind from '@tailwind/ReactBits/Components/PillNav/PillNav.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/PillNav/PillNav.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/PillNav/PillNav.tsx?raw';

export const pillNav = {
  dependencies: `gsap`,
  usage: `import PillNav from './PillNav';
import logo from '/path/to/logo.svg';

<PillNav
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
