/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useMediaQuery(
  query,
  { defaultValue = false, initializeWithValue = true } = {}
) {
  const getMatches = (q) => {
    if (typeof window === 'undefined') return defaultValue;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState(() => {
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

function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

const DURATION = 0.15;
const TRANSITION = {
  duration: DURATION,
  ease: [0.32, 0.72, 0, 1],
};
const TRANSITION_OVERLAY = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

const DEFAULT_IMAGES = [
  { src: '/assets/demo/cs1.webp', alt: 'Demo image 1' },
  { src: '/assets/demo/cs2.webp', alt: 'Demo image 2' },
  { src: '/assets/demo/cs3.webp', alt: 'Demo image 3' },
  { src: '/assets/demo/cs1.webp', alt: 'Demo image 4' },
  { src: '/assets/demo/cs2.webp', alt: 'Demo image 5' },
  { src: '/assets/demo/cs3.webp', alt: 'Demo image 6' },
  { src: '/assets/demo/cs1.webp', alt: 'Demo image 7' },
  { src: '/assets/demo/cs2.webp', alt: 'Demo image 8' },
];

const Carousel = memo(function Carousel({
  handleClick,
  controls,
  cards,
  isCarouselActive,
  reducedMotion,
}) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = Math.max(cards.length, 1);
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="flex h-full items-center justify-center bg-[#0f1115]"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <motion.div
        drag={isCarouselActive && !reducedMotion ? 'x' : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing outline-none motion-reduce:cursor-default motion-reduce:active:cursor-default"
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
            controls.start({
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
            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-[#0f1115] p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            role="listitem"
          >
            <button
              type="button"
              className="block w-full m-0 p-0 overflow-hidden rounded-xl border-2 border-transparent bg-transparent cursor-pointer transition-[border-color,box-shadow,transform] duration-200 hover:border-[#7BE9C6] hover:shadow-[0_0_0_1px_#7BE9C6,0_12px_40px_rgba(22,32,228,0.25)] focus:outline-none focus-visible:border-[#1620E4] focus-visible:shadow-[0_0_0_3px_rgba(22,32,228,0.45),0_0_0_1px_#7BE9C6] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none motion-reduce:transition-none"
              onClick={() => handleClick(card, i)}
              aria-label={`Open image: ${card.alt || `Image ${i + 1}`}`}
            >
              <motion.img
                src={card.src}
                alt={card.alt || `Carousel image ${i + 1}`}
                layoutId={`img-${card.src}-${i}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square block select-none"
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
}) {
  const [activeImg, setActiveImg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  const reducedMotion = usePrefersReducedMotion();
  const closeBtnRef = useRef(null);

  const cards = useMemo(() => {
    if (!images || images.length === 0) return DEFAULT_IMAGES;
    return images.map((img, i) =>
      typeof img === 'string'
        ? { src: img, alt: `Carousel image ${i + 1}` }
        : { src: img.src, alt: img.alt || `Carousel image ${i + 1}` }
    );
  }, [images]);

  const handleClick = useCallback(
    (card, index) => {
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
    const onKeyDown = (e) => {
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

  return (
    <motion.div layout className={`relative w-full text-gray-900 ${className}`.trim()} {...rest}>
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            layoutId={`img-container-${activeImg.src}-${activeIndex}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 z-50 m-5 flex items-center justify-center rounded-3xl bg-black/70 backdrop-blur-md cursor-pointer md:m-20 lg:mx-48"
            style={{ willChange: 'opacity' }}
            transition={TRANSITION_OVERLAY}
            role="dialog"
            aria-modal="true"
            aria-label={activeImg.alt || 'Expanded image'}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="absolute top-4 right-4 z-[2] inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gray-900/85 text-white text-2xl leading-none cursor-pointer transition-[background,border-color,transform] duration-150 hover:bg-[#1620E4] hover:border-[#7BE9C6] focus:outline-none focus-visible:shadow-[0_0_0_3px_rgba(123,233,198,0.55)] focus-visible:border-[#7BE9C6] disabled:opacity-50 disabled:cursor-not-allowed motion-reduce:transition-none"
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
              className="max-w-[min(92vw,720px)] max-h-[min(80vh,720px)] w-auto h-auto rounded-lg object-contain shadow-2xl cursor-default select-none ring-1 ring-[#7BE9C6]/25"
              initial={reducedMotion ? false : { scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: reducedMotion ? 0 : 0.35,
                duration: reducedMotion ? 0 : 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: 'transform' }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[#0f1115] motion-reduce:rounded-xl"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
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

/* Tailwind v4 keyframes (if needed elsewhere):
@keyframes bemo-spin-y {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}
*/
