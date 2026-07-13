import code from '@content/Components/DottedMap/DottedMap.jsx?raw';
import css from '@content/Components/DottedMap/DottedMap.css?raw';
import tailwind from '@tailwind/Components/DottedMap/DottedMap.jsx?raw';
import tsCode from '@ts-default/Components/DottedMap/DottedMap.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/DottedMap/DottedMap.tsx?raw';

export const dottedMap = {
  usage: `<DottedMap\\n  width={150}\\n  height={75}\\n  markers={[\\n    { lat: 40.7128, lng: -74.006, size: 0.45, pulse: true },\\n    { lat: 51.5074, lng: -0.1278, size: 0.4 },\\n  ]}\\n  markerColor=\\"#1620E4\\"\\n  pulse\\n/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
