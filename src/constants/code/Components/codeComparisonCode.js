import code from '@content/Components/CodeComparison/CodeComparison.jsx?raw';
import css from '@content/Components/CodeComparison/CodeComparison.css?raw';
import tailwind from '@tailwind/Components/CodeComparison/CodeComparison.jsx?raw';
import tsCode from '@ts-default/Components/CodeComparison/CodeComparison.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/CodeComparison/CodeComparison.tsx?raw';

export const codeComparison = {
  usage: `<CodeComparison
  beforeCode={\`function greet(name) {
  console.log('Hello, ' + name);
}\`}
  afterCode={\`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}\`}
  language="javascript"
  filename="greet.js"
  highlightColor="#1620E4"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
