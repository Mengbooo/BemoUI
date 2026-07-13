import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const animationVariants = {
  'from-bottom': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'from-center': {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  'from-top': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  'from-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'from-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'top-in-bottom-out': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'left-in-right-out': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
};

function PlayIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="32"
      height="32"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.1-6.86a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function HeroVideoDialog({
  animationStyle = 'from-center',
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = 'Video thumbnail',
  className = '',
  disabled = false,
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const closeBtnRef = useRef(null);
  const selectedAnimation =
    animationVariants[animationStyle] || animationVariants['from-center'];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsVideoOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isVideoOpen]);

  const openVideo = useCallback(() => {
    if (!disabled) setIsVideoOpen(true);
  }, [disabled]);

  const closeVideo = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  const springTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', damping: 30, stiffness: 300 };

  const fadeTransition = reduceMotion ? { duration: 0 } : { duration: 0.2 };

  const dialogVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : selectedAnimation;

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        aria-label="Play video"
        aria-haspopup="dialog"
        aria-expanded={isVideoOpen}
        disabled={disabled}
        onClick={openVideo}
        className="group relative m-0 block w-full cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1620E4]"
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="block h-auto w-full rounded-md border border-gray-200 shadow-lg transition-[filter] duration-200 ease-out group-hover:brightness-[0.8] group-disabled:group-hover:brightness-100 motion-reduce:transition-none"
        />
        <div
          className="pointer-events-none absolute inset-0 flex scale-90 items-center justify-center rounded-2xl transition-transform duration-200 ease-out group-hover:scale-100 group-disabled:group-hover:scale-90 motion-reduce:transition-none motion-reduce:group-hover:scale-90"
          aria-hidden="true"
        >
          <div className="flex size-28 items-center justify-center rounded-full bg-[#1620E4]/10 backdrop-blur-md">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-linear-to-b from-[#1620E4]/35 to-[#1620E4] shadow-md transition-transform duration-200 ease-out group-hover:scale-120 group-disabled:group-hover:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100 after:pointer-events-none after:absolute after:inset-[-2px] after:rounded-full after:border-2 after:border-[#7BE9C6]/55">
              <PlayIcon className="ml-0.5 size-8 scale-100 fill-white text-white drop-shadow transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isVideoOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
            role="presentation"
            onClick={closeVideo}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Video player"
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              initial={dialogVariants.initial}
              animate={dialogVariants.animate}
              exit={dialogVariants.exit}
              transition={springTransition}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close video"
                onClick={closeVideo}
                className="absolute -top-16 right-0 flex cursor-pointer items-center justify-center rounded-full bg-neutral-900/50 p-2 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-neutral-900/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6] motion-reduce:transition-none"
              >
                <CloseIcon />
              </button>
              <div className="relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white bg-black">
                <iframe
                  src={videoSrc}
                  title="Hero Video player"
                  className="mt-0 size-full rounded-2xl border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/*
 * Tailwind v4 global keyframes:
 * None required. Dialog motion uses framer-motion; hover/focus use CSS transitions.
 * Respect prefers-reduced-motion via motion-reduce:* utilities and JS duration: 0.
 */
