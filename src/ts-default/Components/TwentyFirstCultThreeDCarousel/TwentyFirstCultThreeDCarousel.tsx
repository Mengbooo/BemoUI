import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  type AnimationControls,
  type HTMLMotionProps,
} from 'framer-motion';
import './TwentyFirstCultThreeDCarousel.css';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (q: string): boolean => {
    if (typeof window === 'undefined') return defaultValue;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(getMatches(query));
    handleChange();
    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

const DURATION = 0.15;
const TRANSITION = {
  duration: DURATION,
  ease: [0.32, 0.72, 0, 1] as const,
};
const TRANSITION_OVERLAY = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as const,
};

export type CarouselImage =
  | string
  | {
      src: string;
      alt?: string;
    };

export type NormalizedCarouselImage = {
  src: string;
  alt: string;
};

export interface TwentyFirstCultThreeDCarouselProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Array of image URLs or { src, alt } objects. Defaults to local demo assets. */
  images?: CarouselImage[];
  /** Stage height in px or CSS value. Default 500. */
  height?: number | string;
  /** Called when an image is opened in the overlay. */
  onImageOpen?: (image: NormalizedCarouselImage, index: number) => void;
  /** Called when the overlay is closed. */
  onImageClose?: () => void;
  className?: string;
}

const DEFAULT_IMAGES: NormalizedCarouselImage[] = [
  { src: '/assets/demo/cs1.webp', alt: 'Demo image 1' },
  { src: '/assets/demo/cs2.webp', alt: 'Demo image 2' },
  { src: '/assets/demo/cs3.webp', alt: 'Demo image 3' },
  { src: '/assets/demo/cs1.webp', alt: 'Demo image 4' },
  { src: '/assets/demo/cs2.webp', alt: 'Demo image 5' },
  { src: '/assets/demo/cs3.webp', alt: 'Demo image 6' },
  { src: '/assets/demo/cs1.webp', alt: 'Demo image 7' },
  { src: '/assets/demo/cs2.webp', alt: 'Demo image 8' },
];

type CarouselInnerProps = {
  handleClick: (card: NormalizedCarouselImage, index: number) => void;
  controls: AnimationControls;
  cards: NormalizedCarouselImage[];
  isCarouselActive: boolean;
  reducedMotion: boolean;
};

const Carousel = memo(function Carousel({
  handleClick,
  controls,
  cards,
  isCarouselActive,
  reducedMotion,
}: CarouselInnerProps) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = Math.max(cards.length, 1);
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (value: number) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="bemo-21st-cult-three-d-carousel__viewport"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      } as CSSProperties}
    >
      <motion.div
        drag={isCarouselActive && !reducedMotion ? 'x' : false}
        className="bemo-21st-cult-three-d-carousel__cylinder"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: 'preserve-3d',
        }}
        onDrag={(_, info) => {
          if (isCarouselActive && !reducedMotion) {
            rotation.set(rotation.get() + info.offset.x * 0.05);
          }
        }}
        onDragEnd={(_, info) => {
          if (isCarouselActive && !reducedMotion) {
            void controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            });
          }
        }}
        animate={controls}
        role="list"
        aria-label="3D image carousel"
      >
        {cards.map((card, i) => (
          <motion.div
            key={`key-${card.src}-${i}`}
            className="bemo-21st-cult-three-d-carousel__face"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            role="listitem"
          >
            <button
              type="button"
              className="bemo-21st-cult-three-d-carousel__face-btn"
              onClick={() => handleClick(card, i)}
              aria-label={`Open image: ${card.alt || `Image ${i + 1}`}`}
            >
              <motion.img
                src={card.src}
                alt={card.alt || `Carousel image ${i + 1}`}
                layoutId={`img-${card.src}-${i}`}
                className="bemo-21st-cult-three-d-carousel__img"
                initial={reducedMotion ? false : { filter: 'blur(4px)' }}
                layout="position"
                animate={reducedMotion ? {} : { filter: 'blur(0px)' }}
                transition={TRANSITION}
                draggable={false}
              />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

function TwentyFirstCultThreeDCarousel({
  images = DEFAULT_IMAGES,
  className = '',
  height = 500,
  onImageOpen,
  onImageClose,
  ...rest
}: TwentyFirstCultThreeDCarouselProps) {
  const [activeImg, setActiveImg] = useState<NormalizedCarouselImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  const reducedMotion = usePrefersReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const cards = useMemo((): NormalizedCarouselImage[] => {
    if (!images || images.length === 0) return DEFAULT_IMAGES;
    return images.map((img, i) =>
      typeof img === 'string'
        ? { src: img, alt: `Carousel image ${i + 1}` }
        : { src: img.src, alt: img.alt || `Carousel image ${i + 1}` }
    );
  }, [images]);

  const handleClick = useCallback(
    (card: NormalizedCarouselImage, index: number) => {
      setActiveImg(card);
      setActiveIndex(index);
      setIsCarouselActive(false);
      controls.stop();
      onImageOpen?.(card, index);
    },
    [controls, onImageOpen]
  );

  const handleClose = useCallback(() => {
    setActiveImg(null);
    setActiveIndex(-1);
    setIsCarouselActive(true);
    onImageClose?.();
  }, [onImageClose]);

  useEffect(() => {
    if (!activeImg) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeImg, handleClose]);

  const rootClass = ['bemo-21st-cult-three-d-carousel', className]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div layout className={rootClass} {...rest}>
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            layoutId={`img-container-${activeImg.src}-${activeIndex}`}
            layout="position"
            onClick={handleClose}
            className="bemo-21st-cult-three-d-carousel__overlay"
            style={{ willChange: 'opacity' }}
            transition={TRANSITION_OVERLAY}
            role="dialog"
            aria-modal="true"
            aria-label={activeImg.alt || 'Expanded image'}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="bemo-21st-cult-three-d-carousel__close"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close expanded image"
            >
              ×
            </button>
            <motion.img
              layoutId={`img-${activeImg.src}-${activeIndex}`}
              src={activeImg.src}
              alt={activeImg.alt || 'Expanded carousel image'}
              className="bemo-21st-cult-three-d-carousel__overlay-img"
              initial={reducedMotion ? false : { scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: reducedMotion ? 0 : 0.35,
                duration: reducedMotion ? 0 : 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              style={{ willChange: 'transform' }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="bemo-21st-cult-three-d-carousel__stage"
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
        }}
      >
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
          reducedMotion={reducedMotion}
        />
      </div>
    </motion.div>
  );
}

export default TwentyFirstCultThreeDCarousel;
