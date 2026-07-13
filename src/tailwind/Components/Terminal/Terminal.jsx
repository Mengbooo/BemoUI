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
      className={cx('grid text-sm font-normal tracking-tight text-neutral-100', className)}
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
      className={cx('text-sm font-normal tracking-tight text-neutral-100', className)}
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
      className={cx(
        'z-0 flex h-full max-h-100 w-full max-w-lg flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]',
        className
      )}
      role="region"
      aria-label="Terminal"
      {...props}
    >
      <div className="flex flex-col gap-y-2 border-b border-neutral-800 p-4" aria-hidden="true">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-neutral-600" />
          <div className="h-2 w-2 rounded-full bg-[#1620E4]" />
          <div className="h-2 w-2 rounded-full bg-[#7BE9C6]" />
        </div>
      </div>
      <pre className="overflow-auto p-4 font-mono">
        <code className="grid gap-y-1 overflow-auto whitespace-pre-wrap break-words">{wrappedChildren}</code>
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

/*
 * Required global keyframes (Tailwind v4):
 * None required — enter/typing animations are handled by framer-motion.
 * If you replace motion with pure CSS, add:
 * @keyframes bemo-terminal-fade-in {
 *   from { opacity: 0; transform: translateY(-5px); }
 *   to { opacity: 1; transform: translateY(0); }
 * }
 */
