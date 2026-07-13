import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './HyperText.css';

const DEFAULT_CHARACTER_SET = Object.freeze(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
);

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  disabled = false,
  ...props
}) {
  const MotionComponent = motionElements[Component] || motion.div;
  const [displayText, setDisplayText] = useState(() =>
    String(children ?? '').split('')
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = media.matches;
    const handleChange = () => {
      reducedMotionRef.current = media.matches;
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      setDisplayText(String(children ?? '').split(''));
    }
  }, [children, isAnimating]);

  const triggerAnimation = () => {
    if (disabled || reducedMotionRef.current || isAnimating) return;
    iterationCount.current = 0;
    setIsAnimating(true);
  };

  useEffect(() => {
    if (disabled) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayText(String(children ?? '').split(''));
      return undefined;
    }

    if (!startOnView) {
      const startTimeout = window.setTimeout(() => {
        setIsAnimating(true);
      }, Math.max(0, delay));
      return () => window.clearTimeout(startTimeout);
    }

    const node = elementRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            setIsAnimating(true);
          }, Math.max(0, delay));
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-30% 0px -30% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, startOnView, disabled, children]);

  useEffect(() => {
    let animationFrameId = null;

    if (!isAnimating || reducedMotionRef.current) {
      return undefined;
    }

    const text = String(children ?? '');
    const maxIterations = text.length;
    const startTime = performance.now();
    const safeDuration = Math.max(Number(duration) || 800, 1);
    const safeSet =
      characterSet && characterSet.length > 0
        ? characterSet
        : DEFAULT_CHARACTER_SET;

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / safeDuration, 1);
      iterationCount.current = progress * maxIterations;

      setDisplayText(
        text.split('').map((letter, index) => {
          if (letter === ' ') return letter;
          if (index <= iterationCount.current) return text[index];
          return safeSet[getRandomInt(safeSet.length)];
        })
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [children, duration, isAnimating, characterSet]);

  const interactive = Boolean(animateOnHover && !disabled);
  const {
    onMouseEnter: propsOnMouseEnter,
    onFocus: propsOnFocus,
    ...restProps
  } = props;

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        'bemo-hyper-text',
        interactive && 'bemo-hyper-text--interactive',
        disabled && 'bemo-hyper-text--disabled',
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-label={String(children ?? '')}
      {...restProps}
      onMouseEnter={(event) => {
        if (typeof propsOnMouseEnter === 'function') propsOnMouseEnter(event);
        if (interactive) triggerAnimation();
      }}
      onFocus={(event) => {
        if (typeof propsOnFocus === 'function') propsOnFocus(event);
        if (interactive) triggerAnimation();
      }}
    >
      <span className="bemo-hyper-text__visual" aria-hidden="true">
        {displayText.map((letter, index) => (
          <span
            key={index}
            className={cn(
              'bemo-hyper-text__letter',
              letter === ' ' && 'bemo-hyper-text__letter--space'
            )}
          >
            {letter === ' ' ? '\u00a0' : String(letter).toUpperCase()}
          </span>
        ))}
      </span>
    </MotionComponent>
  );
}

export default HyperText;
