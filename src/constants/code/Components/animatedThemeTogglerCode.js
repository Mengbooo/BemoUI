import code from '@content/Components/AnimatedThemeToggler/AnimatedThemeToggler.jsx?raw';
import css from '@content/Components/AnimatedThemeToggler/AnimatedThemeToggler.css?raw';
import tailwind from '@tailwind/Components/AnimatedThemeToggler/AnimatedThemeToggler.jsx?raw';
import tsCode from '@ts-default/Components/AnimatedThemeToggler/AnimatedThemeToggler.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AnimatedThemeToggler/AnimatedThemeToggler.tsx?raw';

export const animatedThemeToggler = {
  usage: `import AnimatedThemeToggler from './AnimatedThemeToggler';

export default function Example() {
  return (
    <AnimatedThemeToggler
      duration={400}
      variant="circle"
      fromCenter={false}
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
