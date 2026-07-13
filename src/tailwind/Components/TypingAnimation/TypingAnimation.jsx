import { useEffect, useMemo, useRef, useState } from 'react';

const ALLOWED_TAGS = {
  article: 'article',
  div: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  li: 'li',
  p: 'p',
  section: 'section',
  span: 'span',
};

function TypingAnimation({
  children,
  words,
  className = '',
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  as: asTag = 'span',
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = 'line',
  ...props
}) {
  const Tag = ALLOWED_TAGS[asTag] || 'span';
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState('typing');
  const [isInView, setIsInView] = useState(!startOnView);
  const elementRef = useRef(null);

  const wordsToAnimate = useMemo(
    () => words ?? (children ? [String(children)] : []),
    [words, children]
  );
  const hasMultipleWords = wordsToAnimate.length > 1;
  const typingSpeed = typeSpeed ?? duration;
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const animationSourceKey = useMemo(
    () => (words ? words.join('\0') : children ? String(children) : ''),
    [words, children]
  );

  useEffect(() => {
    if (!startOnView) {
      setIsInView(true);
      return undefined;
    }
    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setPhase('typing');
  }, [animationSourceKey]);

  useEffect(() => {
    if (prefersReducedMotion && wordsToAnimate.length > 0) {
      const full = wordsToAnimate[0] || '';
      setDisplayedText(full);
      setCurrentCharIndex(Array.from(full).length);
      setPhase('typing');
      return undefined;
    }

    let timeout = null;

    if (isInView && wordsToAnimate.length > 0) {
      const timeoutDelay =
        delay > 0 && displayedText === ''
          ? delay
          : phase === 'typing'
            ? typingSpeed
            : phase === 'deleting'
              ? deletingSpeed
              : pauseDelay;

      timeout = setTimeout(() => {
        const currentWord = wordsToAnimate[currentWordIndex] || '';
        const graphemes = Array.from(currentWord);

        switch (phase) {
          case 'typing':
            if (currentCharIndex < graphemes.length) {
              setDisplayedText(graphemes.slice(0, currentCharIndex + 1).join(''));
              setCurrentCharIndex(currentCharIndex + 1);
            } else if (hasMultipleWords || loop) {
              const isLastWord = currentWordIndex === wordsToAnimate.length - 1;
              if (!isLastWord || loop) setPhase('pause');
            }
            break;
          case 'pause':
            setPhase('deleting');
            break;
          case 'deleting':
            if (currentCharIndex > 0) {
              setDisplayedText(graphemes.slice(0, currentCharIndex - 1).join(''));
              setCurrentCharIndex(currentCharIndex - 1);
            } else {
              setCurrentWordIndex((currentWordIndex + 1) % wordsToAnimate.length);
              setPhase('typing');
            }
            break;
          default:
            break;
        }
      }, timeoutDelay);
    }

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [
    isInView,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay,
    prefersReducedMotion,
  ]);

  const currentWordGraphemes = Array.from(wordsToAnimate[currentWordIndex] || '');
  const isComplete =
    !loop &&
    currentWordIndex === wordsToAnimate.length - 1 &&
    currentCharIndex >= currentWordGraphemes.length &&
    phase !== 'deleting';

  const shouldShowCursor =
    showCursor &&
    !isComplete &&
    !prefersReducedMotion &&
    (hasMultipleWords || loop || currentCharIndex < currentWordGraphemes.length);

  const getCursorChar = () => {
    if (cursorStyle === 'block') return '▌';
    if (cursorStyle === 'underscore') return '_';
    return '|';
  };

  const cursorColor =
    cursorStyle === 'underscore' ? 'text-[#7BE9C6]' : 'text-[#1620E4]';

  const classNames = [
    'tracking-[-0.02em] leading-tight',
    Tag === 'span' ? 'inline-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      {...props}
      ref={elementRef}
      className={classNames}
      aria-live="polite"
      aria-atomic="true"
    >
      {displayedText}
      {shouldShowCursor ? (
        <span
          className={[
            'inline-block ml-px',
            cursorColor,
            blinkCursor ? 'bemo-typing-animation-blink motion-reduce:animate-none' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {getCursorChar()}
        </span>
      ) : null}
    </Tag>
  );
}

export default TypingAnimation;

/*
Required global keyframes (add once to your global CSS for Tailwind v4):

@keyframes bemo-typing-animation-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.bemo-typing-animation-blink {
  animation: bemo-typing-animation-blink 1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .bemo-typing-animation-blink {
    animation: none;
    opacity: 1;
  }
}
*/
