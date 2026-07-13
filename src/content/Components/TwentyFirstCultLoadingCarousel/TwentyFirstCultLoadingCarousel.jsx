import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TwentyFirstCultLoadingCarousel.css';

/**
 * @typedef {{ text: string; image: string; url?: string }} Tip
 * @typedef {{
 *   tips?: Tip[];
 *   className?: string;
 *   autoplayInterval?: number;
 *   showNavigation?: boolean;
 *   showIndicators?: boolean;
 *   showProgress?: boolean;
 *   aspectRatio?: 'video' | 'square' | 'wide';
 *   textPosition?: 'top' | 'bottom';
 *   onTipChange?: (index: number) => void;
 *   backgroundTips?: boolean;
 *   backgroundGradient?: boolean;
 *   shuffleTips?: boolean;
 *   paused?: boolean;
 * }} TwentyFirstCultLoadingCarouselProps
 */

const DEFAULT_TIPS = [
  {
    text: 'Backend snippets. Shadcn style headless components.. but for your backend.',
    image: '/assets/demo/cs1.webp',
  },
  {
    text: 'Create your first directory app today. AI batch scripts to process 100s of urls in seconds.',
    image: '/assets/demo/cs2.webp',
  },
  {
    text: 'Cult landing page template. Framer motion, shadcn, and tailwind.',
    image: '/assets/demo/cs3.webp',
  },
  {
    text: 'Vector embeddings, semantic search, and chat based vector retrieval on easy mode.',
    image: '/assets/demo/cs1.webp',
  },
  {
    text: 'SEO analysis app. Scraping, analysis, insights, and AI recommendations.',
    image: '/assets/demo/cs2.webp',
  },
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getTipKey(tip, index) {
  return `${tip.text}-${tip.image}-${index}`;
}

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

const aspectRatioClass = {
  video: 'bemo-21st-cult-loading-carousel-aspect-video',
  square: 'bemo-21st-cult-loading-carousel-aspect-square',
  wide: 'bemo-21st-cult-loading-carousel-aspect-wide',
};

const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};

/**
 * Production-ready loading carousel adapted from Cult UI (MIT).
 * @param {TwentyFirstCultLoadingCarouselProps} props
 */
export function TwentyFirstCultLoadingCarousel({
  onTipChange,
  className,
  tips = DEFAULT_TIPS,
  showProgress = true,
  aspectRatio = 'video',
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = 'bottom',
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  paused = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayTips] = useState(() => (shuffleTips ? shuffleArray(tips) : tips));
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const autoplayRef = useRef(null);
  const rootRef = useRef(null);
  const tipCount = displayTips?.length || 0;

  const goTo = useCallback(
    (index, dir) => {
      if (!tipCount) return;
      const next = ((index % tipCount) + tipCount) % tipCount;
      setDirection(dir ?? (next > current ? 1 : next < current ? -1 : 1));
      setCurrent(next);
      setProgressKey((k) => k + 1);
      onTipChange?.(next);
    },
    [current, onTipChange, tipCount],
  );

  const goNext = useCallback(() => {
    goTo(current + 1, 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo(current - 1, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused || tipCount <= 1 || prefersReducedMotion) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return undefined;
    }

    autoplayRef.current = window.setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % tipCount;
        setDirection(1);
        setProgressKey((k) => k + 1);
        onTipChange?.(next);
        return next;
      });
    }, autoplayInterval);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [autoplayInterval, onTipChange, paused, prefersReducedMotion, tipCount]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev]);

  const activeTip = displayTips[current];

  return (
    <motion.div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Loading tips carousel"
      tabIndex={0}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.8, ease: 'easeOut' }
      }
      className={cn('bemo-21st-cult-loading-carousel', className)}
    >
      <div className="bemo-21st-cult-loading-carousel-inner">
        <div className="bemo-21st-cult-loading-carousel-stage">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {activeTip ? (
              <motion.div
                key={getTipKey(activeTip, current)}
                role="group"
                aria-roledescription="slide"
                aria-label={`Tip ${current + 1} of ${tipCount}`}
                variants={carouselVariants}
                initial={prefersReducedMotion ? false : 'enter'}
                animate="center"
                exit={prefersReducedMotion ? undefined : 'exit'}
                custom={direction}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.8, ease: 'easeInOut' }
                }
                className={cn(
                  'bemo-21st-cult-loading-carousel-slide',
                  aspectRatioClass[aspectRatio] || aspectRatioClass.video,
                )}
              >
                <img
                  src={activeTip.image}
                  alt={`Visual for: ${activeTip.text}`}
                  className="bemo-21st-cult-loading-carousel-image"
                  draggable={false}
                />
                {backgroundGradient ? (
                  <div className="bemo-21st-cult-loading-carousel-gradient" aria-hidden="true" />
                ) : null}

                {backgroundTips ? (
                  <motion.div
                    variants={textVariants}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="visible"
                    className={cn(
                      'bemo-21st-cult-loading-carousel-overlay-text',
                      textPosition === 'top'
                        ? 'bemo-21st-cult-loading-carousel-overlay-top'
                        : 'bemo-21st-cult-loading-carousel-overlay-bottom',
                    )}
                  >
                    {activeTip.url ? (
                      <a
                        href={activeTip.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bemo-21st-cult-loading-carousel-overlay-link"
                      >
                        <p className="bemo-21st-cult-loading-carousel-overlay-copy">{activeTip.text}</p>
                      </a>
                    ) : (
                      <p className="bemo-21st-cult-loading-carousel-overlay-copy">{activeTip.text}</p>
                    )}
                  </motion.div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {showNavigation && tipCount > 1 ? (
            <>
              <button
                type="button"
                className="bemo-21st-cult-loading-carousel-nav bemo-21st-cult-loading-carousel-nav-prev"
                onClick={goPrev}
                aria-label="Previous tip"
              >
                <ChevronLeft aria-hidden="true" className="bemo-21st-cult-loading-carousel-nav-icon" />
              </button>
              <button
                type="button"
                className="bemo-21st-cult-loading-carousel-nav bemo-21st-cult-loading-carousel-nav-next"
                onClick={goNext}
                aria-label="Next tip"
              >
                <ChevronRight aria-hidden="true" className="bemo-21st-cult-loading-carousel-nav-icon" />
              </button>
            </>
          ) : null}
        </div>

        <div
          className={cn(
            'bemo-21st-cult-loading-carousel-footer',
            showIndicators && !backgroundTips
              ? 'bemo-21st-cult-loading-carousel-footer-compact'
              : '',
          )}
        >
          <div
            className={cn(
              'bemo-21st-cult-loading-carousel-footer-row',
              showIndicators && !backgroundTips
                ? 'bemo-21st-cult-loading-carousel-footer-stacked'
                : '',
            )}
          >
            {showIndicators && tipCount > 0 ? (
              <div className="bemo-21st-cult-loading-carousel-indicators" role="tablist" aria-label="Tips">
                {displayTips.map((tip, index) => {
                  const isActive = index === current;
                  const isComplete = index < current;

                  return (
                    <button
                      key={getTipKey(tip, index)}
                      type="button"
                      role="tab"
                      className="bemo-21st-cult-loading-carousel-indicator"
                      onClick={() => goTo(index)}
                      aria-label={`Go to tip ${index + 1}`}
                      aria-selected={isActive}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="bemo-21st-cult-loading-carousel-indicator-track">
                        {showProgress ? (
                          isComplete ? (
                            <span className="bemo-21st-cult-loading-carousel-indicator-fill bemo-21st-cult-loading-carousel-indicator-complete" />
                          ) : isActive ? (
                            <motion.span
                              key={progressKey}
                              initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                              animate={{ scaleX: 1 }}
                              transition={
                                prefersReducedMotion || paused
                                  ? { duration: 0 }
                                  : {
                                      duration: autoplayInterval / 1000,
                                      ease: 'linear',
                                    }
                              }
                              className="bemo-21st-cult-loading-carousel-indicator-fill"
                            />
                          ) : null
                        ) : (
                          <span
                            className={cn(
                              'bemo-21st-cult-loading-carousel-indicator-fill',
                              prefersReducedMotion
                                ? 'bemo-21st-cult-loading-carousel-no-motion'
                                : 'bemo-21st-cult-loading-carousel-indicator-transition',
                              isActive
                                ? 'bemo-21st-cult-loading-carousel-indicator-on'
                                : 'bemo-21st-cult-loading-carousel-indicator-off',
                            )}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="bemo-21st-cult-loading-carousel-caption">
              {backgroundTips ? (
                <span className="bemo-21st-cult-loading-carousel-tip-count">
                  Tip {current + 1}/{tipCount}
                </span>
              ) : (
                <div className="bemo-21st-cult-loading-carousel-caption-body">
                  {activeTip?.url ? (
                    <a
                      href={activeTip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bemo-21st-cult-loading-carousel-caption-link"
                    >
                      {activeTip?.text}
                    </a>
                  ) : (
                    <span className="bemo-21st-cult-loading-carousel-caption-text">
                      {activeTip?.text}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips ? (
                <ChevronRight aria-hidden="true" className="bemo-21st-cult-loading-carousel-caption-chevron" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TwentyFirstCultLoadingCarousel;
