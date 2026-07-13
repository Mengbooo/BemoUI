import code from '@content/Components/AvatarCircles/AvatarCircles.jsx?raw';
import css from '@content/Components/AvatarCircles/AvatarCircles.css?raw';
import tailwind from '@tailwind/Components/AvatarCircles/AvatarCircles.jsx?raw';
import tsCode from '@ts-default/Components/AvatarCircles/AvatarCircles.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/AvatarCircles/AvatarCircles.tsx?raw';

export const avatarCircles = {
  usage: `<AvatarCircles
  numPeople={99}
  avatarUrls={[
    { name: 'Ada Lovelace', profileUrl: '/users/ada' },
    { name: 'Grace Hopper', imageUrl: '/avatars/grace.png', profileUrl: '/users/grace' },
  ]}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
