import { useEffect, useRef, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { getComponentLoader } from '../constants/Components';
import { decodeLabel } from '../utils/utils';
import { Helmet } from 'react-helmet-async';
import { Box } from '@chakra-ui/react';

import BackToTopButton from '../components/common/BackToTopButton';

const CategoryPage = () => {
  const { component } = useParams();
  const scrollRef = useRef(null);

  const componentLoader = component ? getComponentLoader(component) : null;
  const ComponentToRender = componentLoader ? lazy(componentLoader) : null;

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [component]);

  return (
    <Box className='category-page' ref={scrollRef}>
      <Helmet>
        <title>BemoUI - {decodeLabel(component)}</title>
      </Helmet>

      <h2 className='sub-category'>{decodeLabel(component)}</h2>

      {ComponentToRender ? (
        <Suspense fallback={<Box color="#a1a1aa">Loading component…</Box>}>
          <ComponentToRender />
        </Suspense>
      ) : (
        <Box color="#a1a1aa" py={8}>
          Component not found. Please choose an available component from the sidebar.
        </Box>
      )}

      <BackToTopButton />
    </Box>
  );
};

export default CategoryPage;
