import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Kbd,
  Select,
  Text,
} from '@chakra-ui/react';
import { useDeviceOS } from 'react-haiku';
import { useSearch } from '../context/SearchContext/useSearch';
import { useLanguage } from '../context/LanguageContext/useLanguage'


import Logo from '../../assets/logos/bemoUI-logo-white.svg';
import FadeContent from '../../content/Animations/FadeContent/FadeContent';

const Header = () => {
  const { toggleSearch } = useSearch();
  const { languagePreset, setLanguagePreset } = useLanguage();
  const os = useDeviceOS();

  return (
    <Box zIndex={100} className='main-nav'>
      <Flex className='nav-items' h={20} alignItems="center" justifyContent="space-between">
        <Link to="/" className='logo'>
          <Image src={Logo} alt="Logo" maxWidth="136px" />
        </Link>

        {/* Links for larger screens */}
        <Flex alignItems="center" gap={2}>
          <FadeContent blur>
            <Flex
              fontSize="xs"
              h={8}
              border="1px solid #222"
              rounded="xl"
              alignItems="center"
              pr={2}
              pl={4}
              userSelect="none"
              cursor="pointer"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(0.98)' }}
              bg="#111"
              onClick={toggleSearch}
            >
              <Text fontSize="xs" fontWeight={600} mr={12}>Search Docs</Text>
              {os === 'macOS' ? <Kbd>⌘ K</Kbd> : <Kbd>CTRL K</Kbd>}
            </Flex>
          </FadeContent>
          <FadeContent blur>
            <Select
              fontSize="xs"
              bg="#111"
              cursor="pointer"
              border="1px solid #222"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(0.98)', border: '1px solid #222' }}
              h={8}
              rounded="xl"
              width="fit-content"
              fontWeight={600}
              onChange={(e) => setLanguagePreset(e.target.value)}
              value={languagePreset}
            >
              <option value="JS">JS</option>
              <option value="TS">TS</option>
            </Select>
          </FadeContent>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
