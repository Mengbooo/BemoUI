import { useEffect, useRef, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { componentMap } from '../constants/Components';
import { decodeLabel } from '../utils/utils';
import { Helmet } from 'react-helmet-async';
import { Box } from '@chakra-ui/react';

import BackToTopButton from '../components/common/BackToTopButton';

const CategoryPage = () => {
  const { component } = useParams();
  const scrollRef = useRef(null);

  const ComponentToRender = component ? lazy(componentMap[component]) : null;

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [component]);

  return (
    <Box className='category-page' ref={scrollRef}>
      <Helmet>
        <title>BemoUI - {decodeLabel(component)}</title>
      </Helmet>

      <h2 className='sub-category'>{decodeLabel(component)}</h2>

      <Suspense>
        <ComponentToRender />
      </Suspense>

      <BackToTopButton />
    </Box>
  );
};

export default CategoryPage;
