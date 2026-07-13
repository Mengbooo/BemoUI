import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './HeroVideoDialog.css';

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
    <div className={['bemo-hero-video-dialog', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="bemo-hero-video-dialog__trigger"
        aria-label="Play video"
        aria-haspopup="dialog"
        aria-expanded={isVideoOpen}
        disabled={disabled}
        onClick={openVideo}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="bemo-hero-video-dialog__thumbnail"
        />
        <div className="bemo-hero-video-dialog__play-wrap" aria-hidden="true">
          <div className="bemo-hero-video-dialog__play-ring">
            <div className="bemo-hero-video-dialog__play-btn">
              <PlayIcon className="bemo-hero-video-dialog__play-icon" />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isVideoOpen ? (
          <motion.div
            className="bemo-hero-video-dialog__overlay"
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
              className="bemo-hero-video-dialog__dialog"
              initial={dialogVariants.initial}
              animate={dialogVariants.animate}
              exit={dialogVariants.exit}
              transition={springTransition}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                type="button"
                className="bemo-hero-video-dialog__close"
                aria-label="Close video"
                onClick={closeVideo}
              >
                <CloseIcon />
              </button>
              <div className="bemo-hero-video-dialog__frame">
                <iframe
                  src={videoSrc}
                  title="Hero Video player"
                  className="bemo-hero-video-dialog__iframe"
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
