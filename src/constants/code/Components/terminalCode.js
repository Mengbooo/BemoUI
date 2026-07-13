import code from '@content/Components/Terminal/Terminal.jsx?raw';
import css from '@content/Components/Terminal/Terminal.css?raw';
import tailwind from '@tailwind/Components/Terminal/Terminal.jsx?raw';
import tsCode from '@ts-default/Components/Terminal/Terminal.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Terminal/Terminal.tsx?raw';

export const terminal = {
  usage: `import Terminal, { AnimatedSpan, TypingAnimation } from './Terminal';

export default function Example() {
  return (
    <Terminal>
      <TypingAnimation>{'> pnpm dlx bemoui@latest add terminal'}</TypingAnimation>
      <AnimatedSpan style={{ color: '#7BE9C6' }}>✔ Checking registry.</AnimatedSpan>
      <AnimatedSpan style={{ color: '#1620E4' }}>✔ Done.</AnimatedSpan>
    </Terminal>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
