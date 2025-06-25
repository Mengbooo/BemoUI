import { Flex, Text } from '@chakra-ui/react';
import { useMediaQuery } from 'react-haiku';
import { Link } from 'react-router-dom';

import bemoUIlogo from '../../../assets/logos/bemoUI-logo-white.png';

import FadeContent from '../../../content/Animations/FadeContent/FadeContent';

import './LandingHeader.css';

const LandingHeader = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <header className="app-header">
      <nav className="header-content">
        <FadeContent blur>
          <Link className='logo' to="/">
            <img src={bemoUIlogo} alt="BemoUI"/>
          </Link>
        </FadeContent>

        <Flex gap="8px" className='menu-items'>
          {!isMobile && (
            <FadeContent blur>
              <Text
                as="a"
                fontWeight={500}
                fontSize="16px"
                href="https://github.com/mengbooo"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Text>
            </FadeContent>
          )}

          {!isMobile && (
            <FadeContent blur>
              <Text
                as={Link}
                fontWeight={500}
                fontSize="16px"
                to="/text-animations/split-text"
              >
                Docs
              </Text>
            </FadeContent>
          )}
        </Flex>
      </nav>
    </header>
  );
}

export default LandingHeader;