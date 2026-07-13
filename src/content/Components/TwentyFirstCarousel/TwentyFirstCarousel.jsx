/* eslint-disable react-refresh/only-export-components */
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TwentyFirstCarousel.css';

const CarouselContext = createContext(undefined);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
}

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}) {
  const [index, setIndex] = useState(initialIndex);
  const [itemsCount, setItemsCount] = useState(0);

  const handleSetIndex = useCallback(
    (newIndex) => {
      setIndex(newIndex);
      onIndexChange?.(newIndex);
    },
    [onIndexChange]
  );

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: handleSetIndex,
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

function Carousel({
  children,
  className = '',
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
  ...props
}) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = useCallback(
    (newIndex) => {
      if (!isControlled) {
        setInternalIndex(newIndex);
      }
      onIndexChange?.(newIndex);
    },
    [isControlled, onIndexChange]
  );

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
      disableDrag={disableDrag}
    >
      <div
        className={`bemo-21st-carousel group/hover relative ${className}`.trim()}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        <div className="bemo-21st-carousel__viewport overflow-hidden">{children}</div>
      </div>
    </CarouselProvider>
  );
}

function CarouselNavigation({
  className = '',
  classNameButton = '',
  alwaysShow = false,
}) {
  const { index, setIndex, itemsCount } = useCarousel();

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goNext = () => {
    if (index < itemsCount - 1) setIndex(index + 1);
  };

  return (
    <div
      className={`bemo-21st-carousel__nav ${alwaysShow ? 'bemo-21st-carousel__nav--always' : ''} ${className}`.trim()}
    >
      <button
        type="button"
        aria-label="Previous slide"
        className={`bemo-21st-carousel__nav-btn ${classNameButton}`.trim()}
        disabled={index === 0}
        onClick={goPrev}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={`bemo-21st-carousel__nav-btn ${classNameButton}`.trim()}
        disabled={index + 1 === itemsCount || itemsCount === 0}
        onClick={goNext}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

function CarouselIndicator({ className = '', classNameButton = '' }) {
  const { index, itemsCount, setIndex } = useCarousel();

  if (itemsCount <= 0) return null;

  return (
    <div
      className={`bemo-21st-carousel__indicators ${className}`.trim()}
      role="tablist"
      aria-label="Carousel pagination"
    >
      <div className="bemo-21st-carousel__indicators-inner">
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={index === i}
            onClick={() => setIndex(i)}
            className={`bemo-21st-carousel__indicator ${index === i ? 'bemo-21st-carousel__indicator--active' : ''} ${classNameButton}`.trim()}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselContent({
  children,
  className = '',
  transition,
}) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);
  const itemsLength = Children.count(children);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const options = {
      root: el,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleCount = entries.filter((entry) => entry.isIntersecting).length;
      setVisibleItemsCount(Math.max(1, visibleCount || 1));
    }, options);

    const childNodes = el.children;
    Array.from(childNodes).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    if (!itemsLength) return;
    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -10 && index < itemsLength - 1) {
      setIndex(index + 1);
    } else if (x >= 10 && index > 0) {
      setIndex(index - 1);
    }
  };

  const defaultTransition = prefersReducedMotion
    ? { type: 'tween', duration: 0 }
    : transition || {
        damping: 18,
        stiffness: 90,
        type: 'spring',
        duration: 0.2,
      };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) setIndex(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < itemsLength - 1) setIndex(index + 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setIndex(Math.max(0, itemsLength - 1));
    }
  };

  return (
    <motion.div
      drag={disableDrag ? false : 'x'}
      dragConstraints={disableDrag ? undefined : { left: 0, right: 0 }}
      dragMomentum={disableDrag ? undefined : false}
      style={{ x: disableDrag ? undefined : dragX }}
      animate={{
        translateX: `-${index * (100 / Math.max(1, visibleItemsCount))}%`,
      }}
      onDragEnd={disableDrag ? undefined : onDragEnd}
      transition={defaultTransition}
      className={`bemo-21st-carousel__content flex items-center ${!disableDrag ? 'bemo-21st-carousel__content--draggable' : ''} ${className}`.trim()}
      ref={containerRef}
      role="group"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children}
    </motion.div>
  );
}

function CarouselItem({ children, className = '', ...props }) {
  return (
    <motion.div
      className={`bemo-21st-carousel__item w-full min-w-0 shrink-0 grow-0 overflow-hidden ${className}`.trim()}
      role="group"
      aria-roledescription="slide"
      {...props}
    >
      {children}
    </motion.div>
  );
}

function TwentyFirstCarousel({
  children,
  className,
  initialIndex = 0,
  index,
  onIndexChange,
  disableDrag = false,
  showNavigation = true,
  showIndicators = true,
  alwaysShowNavigation = false,
  navigationClassName,
  indicatorClassName,
  contentClassName,
  transition,
  ...props
}) {
  return (
    <Carousel
      className={className}
      initialIndex={initialIndex}
      index={index}
      onIndexChange={onIndexChange}
      disableDrag={disableDrag}
      {...props}
    >
      <CarouselContent className={contentClassName} transition={transition}>
        {children}
      </CarouselContent>
      {showNavigation && (
        <CarouselNavigation
          className={navigationClassName}
          alwaysShow={alwaysShowNavigation}
        />
      )}
      {showIndicators && <CarouselIndicator className={indicatorClassName} />}
    </Carousel>
  );
}

TwentyFirstCarousel.Content = CarouselContent;
TwentyFirstCarousel.Item = CarouselItem;
TwentyFirstCarousel.Navigation = CarouselNavigation;
TwentyFirstCarousel.Indicator = CarouselIndicator;
TwentyFirstCarousel.Root = Carousel;

export {
  TwentyFirstCarousel,
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
  useCarousel,
};

export default TwentyFirstCarousel;
