import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import {
  motion,
  useMotionValue,
  type Transition,
  type HTMLMotionProps,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CarouselContextType = {
  index: number;
  setIndex: (newIndex: number) => void;
  itemsCount: number;
  setItemsCount: (newItemsCount: number) => void;
  disableDrag: boolean;
};

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

export function useCarousel(): CarouselContextType {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
}

export type CarouselProviderProps = {
  children: ReactNode;
  initialIndex?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState<number>(initialIndex);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const handleSetIndex = useCallback(
    (newIndex: number) => {
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

export type CarouselProps = {
  children: ReactNode;
  className?: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Carousel({
  children,
  className = '',
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
  ...props
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState<number>(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = useCallback(
    (newIndex: number) => {
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
        className={`group/hover relative w-full text-zinc-950 dark:text-zinc-50 ${className}`.trim()}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        <div className="overflow-hidden w-full rounded-xl">{children}</div>
      </div>
    </CarouselProvider>
  );
}

export type CarouselNavigationProps = {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function CarouselNavigation({
  className = '',
  classNameButton = '',
  alwaysShow = false,
}: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel();

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goNext = () => {
    if (index < itemsCount - 1) setIndex(index + 1);
  };

  const baseBtn =
    'pointer-events-auto inline-flex h-fit w-fit items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-500 shadow-sm transition-all duration-200 hover:border-[#1620E4] hover:bg-zinc-50 hover:text-[#1620E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-[#7BE9C6] dark:focus-visible:ring-[#7BE9C6]';

  return (
    <div
      className={`pointer-events-none absolute left-0 sm:left-[-12.5%] top-1/2 z-10 flex w-full sm:w-[125%] -translate-y-1/2 justify-between px-1.5 sm:px-2 ${className}`.trim()}
    >
      <button
        type="button"
        aria-label="Previous slide"
        className={`${baseBtn} ${alwaysShow ? 'opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover/hover:opacity-100 sm:group-focus-within/hover:opacity-100'} ${classNameButton}`.trim()}
        disabled={index === 0}
        onClick={goPrev}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={`${baseBtn} ${alwaysShow ? 'opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover/hover:opacity-100 sm:group-focus-within/hover:opacity-100'} ${classNameButton}`.trim()}
        disabled={index + 1 === itemsCount || itemsCount === 0}
        onClick={goNext}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export type CarouselIndicatorProps = {
  className?: string;
  classNameButton?: string;
} & HTMLAttributes<HTMLDivElement>;

export function CarouselIndicator({
  className = '',
  classNameButton = '',
}: CarouselIndicatorProps) {
  const { index, itemsCount, setIndex } = useCarousel();

  if (itemsCount <= 0) return null;

  return (
    <div
      className={`absolute bottom-3 z-10 flex w-full items-center justify-center pointer-events-none ${className}`.trim()}
      role="tablist"
      aria-label="Carousel pagination"
    >
      <div className="pointer-events-auto flex gap-2 rounded-full border border-zinc-200 bg-white/75 px-2.5 py-1.5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/75">
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={index === i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7BE9C6] focus-visible:ring-offset-2 ${index === i ? 'scale-115 bg-[#1620E4] shadow-[0_0_0_2px_rgba(123,233,198,0.45)] dark:bg-[#7BE9C6] dark:shadow-[0_0_0_2px_rgba(22,32,228,0.45)]' : 'bg-zinc-900/35 hover:bg-[#1620E4]/55 dark:bg-zinc-100/35 dark:hover:bg-[#7BE9C6]/55'} ${classNameButton}`.trim()}
          />
        ))}
      </div>
    </div>
  );
}

export type CarouselContentProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'transition'>;

export function CarouselContent({
  children,
  className = '',
  transition,
}: CarouselContentProps) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsLength = Children.count(children);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCount = entries.filter((entry) => entry.isIntersecting).length;
        setVisibleItemsCount(Math.max(1, visibleCount || 1));
      },
      { root: el, threshold: 0.5 }
    );

    Array.from(el.children).forEach((child) => observer.observe(child));
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

  const defaultTransition: Transition = prefersReducedMotion
    ? { type: 'tween', duration: 0 }
    : transition || {
        damping: 18,
        stiffness: 90,
        type: 'spring',
        duration: 0.2,
      };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      className={`flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2 ${!disableDrag ? 'cursor-grab active:cursor-grabbing touch-pan-y select-none' : ''} ${className}`.trim()}
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

export type CarouselItemProps = {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<'div'>;

export function CarouselItem({ children, className = '', ...props }: CarouselItemProps) {
  return (
    <motion.div
      className={`w-full min-w-0 shrink-0 grow-0 overflow-hidden ${className}`.trim()}
      role="group"
      aria-roledescription="slide"
      {...props}
    >
      {children}
    </motion.div>
  );
}

export type TwentyFirstCarouselProps = CarouselProps & {
  showNavigation?: boolean;
  showIndicators?: boolean;
  alwaysShowNavigation?: boolean;
  navigationClassName?: string;
  indicatorClassName?: string;
  contentClassName?: string;
  transition?: Transition;
};

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
}: TwentyFirstCarouselProps) {
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

export { TwentyFirstCarousel };
export default TwentyFirstCarousel;

/* Tailwind v4 keyframes (optional — motion handled by framer-motion).
@keyframes bemo-21st-carousel-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
*/
