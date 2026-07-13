import code from '@content/Components/ClientTweetCard/ClientTweetCard.jsx?raw';
import css from '@content/Components/ClientTweetCard/ClientTweetCard.css?raw';
import tailwind from '@tailwind/Components/ClientTweetCard/ClientTweetCard.jsx?raw';
import tsCode from '@ts-default/Components/ClientTweetCard/ClientTweetCard.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ClientTweetCard/ClientTweetCard.tsx?raw';

export const clientTweetCard = {
  usage: `import ClientTweetCard from './ClientTweetCard';

<ClientTweetCard
  name="BemoUI"
  handle="bemoui"
  text="Build beautiful interfaces with BemoUI."
  date="Mar 15"
  likes="1.2K"
  retweets="340"
  replies="89"
  verified
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
