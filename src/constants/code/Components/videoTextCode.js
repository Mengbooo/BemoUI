import code from '@content/Components/VideoText/VideoText.jsx?raw';
import css from '@content/Components/VideoText/VideoText.css?raw';
import tailwind from '@tailwind/Components/VideoText/VideoText.jsx?raw';
import tsCode from '@ts-default/Components/VideoText/VideoText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/VideoText/VideoText.tsx?raw';

export const videoText = {
  usage: `import VideoText from './VideoText';

export default function Example() {
  return (
    <div style={{ height: 240 }}>
      <VideoText fontSize={12} fontWeight="bold">
        BEMO
      </VideoText>
    </div>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
