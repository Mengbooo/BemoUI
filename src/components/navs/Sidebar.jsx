import {
  Box,
  Flex,
  VStack,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Image,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logos/bemoUI-logo-white.svg';
import { useRef, useState } from 'react';
import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories';
import { useSearch } from '../context/SearchContext/useSearch';

const scrollToTop = () => window.scrollTo(0, 0);

const Sidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const sidebarBgColor = useColorModeValue('gray.100', 'black');
  const linkHoverColor = useColorModeValue('gray.800', 'gray');
  const btnRef = useRef();
  const location = useLocation();

  const { toggleSearch } = useSearch();

  return (
    <>
      <Box display={{ md: 'none' }} position="fixed" top={0} left={0} zIndex="overlay" p="1em" w="100%" bgColor="#060606">
        <Flex alignItems="center" gap="1em" justifyContent="space-between" transition=".2s ease" transform={isDrawerOpen ? 'translateY(-200%)' : 'none'}>
          <Link to="/">
            <Image src={Logo} maxWidth="100px" alt="logo" />
          </Link>
          <Flex alignItems="center" gap={2}>
            <IconButton
              borderRadius="10px"
              border="1px solid #ffffff1c"
              bg="#060606"
              ref={btnRef}
              icon={<SearchIcon />}
              onClick={() => { setDrawerOpen(false); toggleSearch(); }}
              aria-label="Toggle Search"
            />
            <IconButton
              borderRadius="10px"
              border="1px solid #ffffff1c"
              bg="#060606"
              ref={btnRef}
              icon={<HamburgerIcon />}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Menu"
            />
          </Flex>
        </Flex>
      </Box>

      <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setDrawerOpen(false)} finalFocusRef={btnRef} size="full">
        <DrawerOverlay />
        <DrawerContent className="sidebar-mobile">
          <DrawerHeader py={0} h="72px" borderBottomWidth="1px" className="sidebar-logo">
            <Flex alignItems="center" justifyContent="space-between">
              <Link to="/">
                <Image maxWidth="100px" src={Logo} alt="Bits Logo" />
              </Link>
              <IconButton
                borderRadius="10px"
                border="1px solid #ffffff1c"
                bg="#060606"
                size="md"
                icon={<CloseIcon boxSize={3} />}
                aria-label="Close Menu"
                onClick={() => setDrawerOpen(false)}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody pb="6em">
            <VStack align="stretch" spacing={5} mt={8}>
              {CATEGORIES.map(category => (
                <Category
                  key={category.name}
                  category={category}
                  hoverColor={linkHoverColor}
                  location={location}
                  handleClick={() => { setDrawerOpen(false); scrollToTop(); }}
                />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box as="nav" position="fixed" top="57px" height="calc(100vh - 57px)" className="sidebar" overflowY="auto" bg={sidebarBgColor} w={{ base: 0, md: 40 }} p={5} display={{ base: 'none', md: 'block' }}>
        <VStack align="stretch" spacing={4}>
          {CATEGORIES.map(category => (
            <Category
              key={category.name}
              category={category}
              location={location}
              handleClick={() => scrollToTop()}
              hoverColor={linkHoverColor}
            />
          ))}
        </VStack>
      </Box>
    </>
  );
};

const Category = ({ category, handleClick, location }) => {
  const formatForURL = str => str.replace(/\s+/g, '-').toLowerCase();
  return (
    <Box>
      <Text className="category-name" mb={2}>{category.name}</Text>
      <Stack spacing={0.5} pl={4} borderLeft="1px solid #ffffff1c">
        {category.subcategories.map(sub => {
          const path = `/components/${formatForURL(sub)}`;
          const isActive = location.pathname === path;
          const isNew = NEW.includes(sub);
          const isUpdated = UPDATED.includes(sub);
          return (
            <Link
              key={path}
              className={isActive ? 'sidebar-item active-sidebar-item' : 'sidebar-item'}
              to={path}
              onClick={handleClick}
            >
              {sub}
              {isNew && <span className="new-tag">New</span>}
              {isUpdated && <span className="updated-tag">Updated</span>}
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Sidebar;
