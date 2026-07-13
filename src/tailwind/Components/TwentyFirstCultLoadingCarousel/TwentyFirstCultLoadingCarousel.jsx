import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[2/1]',
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
      className={cn(
        'mx-auto w-full max-w-6xl overflow-hidden rounded-xl bg-zinc-100 text-zinc-900 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="w-full overflow-hidden rounded-xl">
        <div className="relative w-full">
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
                  'relative w-full overflow-hidden bg-zinc-950',
                  aspectRatioClass[aspectRatio] || aspectRatioClass.video,
                )}
              >
                <img
                  src={activeTip.image}
                  alt={`Visual for: ${activeTip.text}`}
                  className="absolute inset-0 block h-full w-full select-none object-cover"
                  draggable={false}
                />
                {backgroundGradient ? (
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                ) : null}

                {backgroundTips ? (
                  <motion.div
                    variants={textVariants}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="visible"
                    className={cn(
                      'absolute left-0 right-0 min-w-0 p-4 sm:p-6 md:p-8',
                      textPosition === 'top' ? 'top-0' : 'bottom-0',
                    )}
                  >
                    {activeTip.url ? (
                      <a
                        href={activeTip.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block min-w-0 rounded-sm text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        <p className="m-0 text-pretty break-words text-center text-base font-medium leading-relaxed tracking-tight text-white sm:text-lg md:text-left md:text-xl lg:text-2xl lg:font-bold">
                          {activeTip.text}
                        </p>
                      </a>
                    ) : (
                      <p className="m-0 text-pretty break-words text-center text-base font-medium leading-relaxed tracking-tight text-white sm:text-lg md:text-left md:text-xl lg:text-2xl lg:font-bold">
                        {activeTip.text}
                      </p>
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
                className="absolute left-2 top-1/2 z-[2] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-zinc-900/70 text-white transition active:scale-[0.96] hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45"
                onClick={goPrev}
                aria-label="Previous tip"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-[2] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-zinc-900/70 text-white transition active:scale-[0.96] hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45"
                onClick={goNext}
                aria-label="Next tip"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        <div
          className={cn(
            'bg-zinc-100 p-4 sm:p-5',
            showIndicators && !backgroundTips ? 'lg:px-4 lg:py-3' : '',
          )}
        >
          <div
            className={cn(
              'flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:items-center',
              showIndicators && !backgroundTips ? 'sm:flex-col sm:items-start' : '',
            )}
          >
            {showIndicators && tipCount > 0 ? (
              <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:pb-0" role="tablist" aria-label="Tips">
                {displayTips.map((tip, index) => {
                  const isActive = index === current;
                  const isComplete = index < current;

                  return (
                    <button
                      key={getTipKey(tip, index)}
                      type="button"
                      role="tab"
                      className="flex h-10 min-w-8 flex-1 items-center rounded-full bg-transparent p-0 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-100 active:scale-[0.96] sm:min-w-0 sm:shrink disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45"
                      onClick={() => goTo(index)}
                      aria-label={`Go to tip ${index + 1}`}
                      aria-selected={isActive}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-900/15">
                        {showProgress ? (
                          isComplete ? (
                            <span className="absolute inset-0 origin-left scale-x-100 rounded-full bg-gradient-to-r from-[#1620E4] to-[#7BE9C6]" />
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
                              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#1620E4] to-[#7BE9C6]"
                            />
                          ) : null
                        ) : (
                          <span
                            className={cn(
                              'absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#1620E4] to-[#7BE9C6]',
                              prefersReducedMotion ? 'duration-0' : 'duration-300 ease-out',
                              isActive ? 'scale-x-100' : 'scale-x-0',
                            )}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="flex min-w-0 items-center gap-2 text-[#1620E4]">
              {backgroundTips ? (
                <span className="whitespace-nowrap text-sm font-medium tabular-nums text-zinc-900">
                  Tip {current + 1}/{tipCount}
                </span>
              ) : (
                <div className="min-w-0 max-w-full">
                  {activeTip?.url ? (
                    <a
                      href={activeTip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block max-w-full break-words rounded-sm text-pretty text-base font-medium leading-tight tracking-tight text-zinc-900 no-underline hover:text-[#1620E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-100 lg:text-xl xl:text-2xl xl:font-semibold"
                    >
                      {activeTip?.text}
                    </a>
                  ) : (
                    <span className="block max-w-full break-words text-pretty text-base font-medium leading-tight tracking-tight text-zinc-900 lg:text-xl xl:text-2xl xl:font-semibold">
                      {activeTip?.text}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips ? (
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#1620E4]" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TwentyFirstCultLoadingCarousel;

/* Tailwind v4 keyframes (optional; progress uses framer-motion scaleX)
@keyframes bemo-21st-cult-loading-carousel-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
*/
