import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useInView } from 'framer-motion';
import './Terminal.css';

const SequenceContext = createContext(null);
const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext(null);
const useItemIndex = () => useContext(ItemIndexContext);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

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

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}) {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted || hasStarted) return;
    if (sequence.activeIndex === itemIndex) setHasStarted(true);
  }, [sequence, hasStarted, itemIndex]);

  const shouldAnimate = prefersReducedMotion
    ? true
    : sequence
      ? hasStarted
      : startOnView
        ? isInView
        : true;

  return (
    <motion.div
      ref={elementRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: sequence || prefersReducedMotion ? 0 : delay / 1000,
      }}
      className={cx('bemo-terminal__animated-span', className)}
      onAnimationComplete={() => {
        if (!sequence || itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function TypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = 'span',
  startOnView = true,
  ...props
}) {
  if (typeof children !== 'string') {
    throw new Error('TypingAnimation: children must be a string.');
  }

  const MotionComponent = motionElements[Component] || motion.span;
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;
  const sequenceCompleteItemRef = useRef(null);
  const sequenceItemIndexRef = useRef(null);

  useEffect(() => {
    sequenceCompleteItemRef.current = sequence?.completeItem ?? null;
    sequenceItemIndexRef.current = itemIndex;
  }, [sequence?.completeItem, itemIndex]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStarted(true);
      return undefined;
    }

    let startTimeout = null;

    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay);
    }

    return () => {
      if (startTimeout !== null) clearTimeout(startTimeout);
    };
  }, [
    delay,
    startOnView,
    isInView,
    started,
    hasSequence,
    sequenceActiveIndex,
    sequenceStarted,
    itemIndex,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (!started) return undefined;

    if (prefersReducedMotion) {
      setDisplayedText(children);
      const completeItem = sequenceCompleteItemRef.current;
      const currentItemIndex = sequenceItemIndexRef.current;
      if (completeItem && currentItemIndex !== null) {
        completeItem(currentItemIndex);
      }
      return undefined;
    }

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i += 1;
      } else {
        clearInterval(typingEffect);
        const completeItem = sequenceCompleteItemRef.current;
        const currentItemIndex = sequenceItemIndexRef.current;
        if (completeItem && currentItemIndex !== null) {
          completeItem(currentItemIndex);
        }
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [children, duration, started, prefersReducedMotion]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cx('bemo-terminal__typing', className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}

export function Terminal({
  children,
  className,
  sequence = true,
  startOnView = true,
  ...props
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo(() => {
    if (!sequence) return null;
    return {
      completeItem: (index) => {
        setActiveIndex((current) => (index === current ? current + 1 : current));
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted]);

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={cx('bemo-terminal', className)}
      role="region"
      aria-label="Terminal"
      {...props}
    >
      <div className="bemo-terminal__chrome" aria-hidden="true">
        <div className="bemo-terminal__dots">
          <span className="bemo-terminal__dot bemo-terminal__dot--close" />
          <span className="bemo-terminal__dot bemo-terminal__dot--minimize" />
          <span className="bemo-terminal__dot bemo-terminal__dot--maximize" />
        </div>
      </div>
      <pre className="bemo-terminal__body">
        <code className="bemo-terminal__code">{wrappedChildren}</code>
      </pre>
    </div>
  );

  if (!sequence) return content;

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  );
}

export default Terminal;
