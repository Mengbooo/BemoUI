export const getLanguage = (key) => {
  const languages = {
    code: 'jsx',
    usage: 'jsx',
    tailwind: 'jsx',
    presets: 'jsx',
    utility: 'jsx',
    installation: 'bash',
    css: 'css',
  };

  return languages[key];
};

export const decodeLabel = (label) => label
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

export const forceChakraDarkTheme = () => {
  localStorage.setItem('chakra-ui-color-mode', 'dark');
  console.info('Successfully set dark color mode.');
};

export const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;

export const generateCliCommands = () => {
  return {};
};