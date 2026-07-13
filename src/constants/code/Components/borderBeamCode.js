import code from '@content/Components/BorderBeam/BorderBeam.jsx?raw';
import css from '@content/Components/BorderBeam/BorderBeam.css?raw';
import tailwind from '@tailwind/Components/BorderBeam/BorderBeam.jsx?raw';
import tsCode from '@ts-default/Components/BorderBeam/BorderBeam.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BorderBeam/BorderBeam.tsx?raw';

export const borderBeam = {
  usage: `<div style={{ position: 'relative', height: 200, borderRadius: 16, border: '1px solid #333' }}>
  <BorderBeam colorFrom="#1620E4" colorTo="#7BE9C6" />
  <p style={{ textAlign: 'center', paddingTop: 80 }}>Content</p>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
