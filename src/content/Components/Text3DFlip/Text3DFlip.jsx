import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAnimate } from 'framer-motion';
import './Text3DFlip.css';

const HAS_SEGMENTER = typeof Intl !== 'undefined' && 'Segmenter' in Intl;

const splitIntoCharacters = (text) => {
  if (HAS_SEGMENTER) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};

const extractTextFromChildren = (children) => {
  if (children == null) return '';
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (React.isValidElement(children)) {
    const childText = children.props?.children;
    if (childText != null) return extractTextFromChildren(childText);
  }
  return '';
};

const ROTATION_MAP = {
  top: 'rotateX(90deg)',
  right: 'rotateY(90deg)',
  bottom: 'rotateX(-90deg)',
  left: 'rotateY(-90deg)',
};

const CONTAINER_TRANSFORMS = {
  top: 'translateZ(-0.5lh)',
  bottom: 'translateZ(-0.5lh)',
  left: 'rotateY(90deg) translateX(50%) rotateY(-90deg)',
  right: 'rotateY(90deg) translateX(50%) rotateY(-90deg)',
};

const FRONT_FACE_TRANSFORMS = {
  top: 'translateZ(0.5lh)',
  bottom: 'translateZ(0.5lh)',
  left: 'rotateY(90deg) translateX(50%) rotateY(-90deg)',
  right: 'rotateY(-90deg) translateX(50%) rotateY(90deg)',
};

const SECOND_FACE_TRANSFORMS = {
  top: 'rotateX(-90deg) translateZ(0.5lh)',
  right:
    'rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)',
  bottom: 'rotateX(90deg) translateZ(0.5lh)',
  left: 'rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)',
};

const DEFAULT_TRANSITION = {
  type: 'spring',
  damping: 30,
  stiffness: 300,
};

const joinClass = (...parts) => parts.filter(Boolean).join(' ');

const CharBox = memo(function CharBox({
  char,
  textClassName,
  flipTextClassName,
  rotateDirection,
}) {
  return (
    <span
      className="bemo-text-3d-flip__char"
      style={{ transform: CONTAINER_TRANSFORMS[rotateDirection] }}
      aria-hidden="true"
    >
      <span
        className={joinClass('bemo-text-3d-flip__face', textClassName)}
        style={{ transform: FRONT_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>
      <span
        className={joinClass(
          'bemo-text-3d-flip__face',
          'bemo-text-3d-flip__face--flip',
          flipTextClassName
        )}
        style={{ transform: SECOND_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>
    </span>
  );
});

CharBox.displayName = 'CharBox';

const Text3DFlip = ({
  children,
  as: ElementTag = 'p',
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.05,
  staggerFrom = 'first',
  transition = DEFAULT_TRANSITION,
  rotateDirection = 'right',
  disabled = false,
  ...props
}) => {
  const isAnimatingRef = useRef(false);
  const isMountedRef = useRef(false);
  const [scope, animate] = useAnimate();
  const [reducedMotion, setReducedMotion] = useState(false);

  const rotationTransform = ROTATION_MAP[rotateDirection] || ROTATION_MAP.right;

  useEffect(() => {
    isMountedRef.current = true;
    const mq =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    const update = () => setReducedMotion(Boolean(mq?.matches));
    update();
    mq?.addEventListener?.('change', update);
    return () => {
      isMountedRef.current = false;
      isAnimatingRef.current = false;
      mq?.removeEventListener?.('change', update);
    };
  }, []);

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children);
    } catch {
      return '';
    }
  }, [children]);

  const characters = useMemo(() => {
    const words = text.split(' ');
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }));
  }, [text]);

  const charOffsets = useMemo(() => {
    const offsets = [0];
    for (const word of characters) {
      offsets.push(offsets[offsets.length - 1] + word.characters.length);
    }
    return offsets;
  }, [characters]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === 'random') {
        const randomIndex = Math.floor(Math.random() * totalChars);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      if (typeof staggerFrom === 'number') {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return index * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleFlip = useCallback(async () => {
    if (disabled || reducedMotion || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    try {
      const totalChars = characters.reduce(
        (sum, word) => sum + word.characters.length,
        0
      );
      const delays = Array.from({ length: totalChars }, (_, i) =>
        getStaggerDelay(i, totalChars)
      );

      await animate(
        '.bemo-text-3d-flip__char',
        { transform: rotationTransform },
        {
          ...transition,
          delay: (i) => delays[i] ?? 0,
        }
      );

      if (!isMountedRef.current) return;

      await animate(
        '.bemo-text-3d-flip__char',
        { transform: 'rotateX(0deg) rotateY(0deg)' },
        { duration: 0 }
      );
    } finally {
      if (isMountedRef.current) {
        isAnimatingRef.current = false;
      }
    }
  }, [
    animate,
    characters,
    disabled,
    getStaggerDelay,
    reducedMotion,
    rotationTransform,
    transition,
  ]);

  return (
    <ElementTag
      ref={scope}
      className={joinClass(
        'bemo-text-3d-flip',
        `bemo-text-3d-flip--${rotateDirection}`,
        disabled && 'bemo-text-3d-flip--disabled',
        className
      )}
      onMouseEnter={handleFlip}
      onFocus={handleFlip}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      {...props}
    >
      <span className="bemo-text-3d-flip__sr-only">{text}</span>
      {characters.map((wordObj, wordIndex) => (
        <span key={wordIndex} className="bemo-text-3d-flip__word" aria-hidden="true">
          {wordObj.characters.map((char, charIndex) => (
            <CharBox
              key={charOffsets[wordIndex] + charIndex}
              char={char}
              textClassName={textClassName}
              flipTextClassName={flipTextClassName}
              rotateDirection={rotateDirection}
            />
          ))}
          {wordObj.needsSpace ? (
            <span className="bemo-text-3d-flip__space"> </span>
          ) : null}
        </span>
      ))}
    </ElementTag>
  );
};

Text3DFlip.displayName = 'Text3DFlip';

export default Text3DFlip;
