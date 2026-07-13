/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
  Children
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring
} from 'framer-motion';
import './TwentyFirstCultExpandable.css';

const springConfig = { stiffness: 200, damping: 20 };

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

function useMeasure() {
  const ref = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, bounds];
}

const ExpandableContext = createContext({
  isExpanded: false,
  toggleExpand: () => {},
  expandDirection: 'vertical',
  expandBehavior: 'replace',
  transitionDuration: 0.3,
  easeType: 'easeInOut',
  initialDelay: 0,
  onExpandEnd: undefined,
  onCollapseEnd: undefined
});

const useExpandable = () => useContext(ExpandableContext);

const ANIMATION_PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  'slide-down': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  'slide-left': {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  'slide-right': {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -10 }
  },
  'blur-sm': {
    initial: { opacity: 0, filter: 'blur(4px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(4px)' }
  },
  'blur-md': {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' }
  },
  'blur-lg': {
    initial: { opacity: 0, filter: 'blur(16px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(16px)' }
  }
};

const getAnimationProps = (preset, animateIn, animateOut) => {
  const defaultAnimation = { initial: {}, animate: {}, exit: {} };
  const presetAnimation = preset && ANIMATION_PRESETS[preset] ? ANIMATION_PRESETS[preset] : defaultAnimation;
  return {
    initial: animateIn?.initial ?? presetAnimation.initial,
    animate: animateIn?.animate ?? presetAnimation.animate,
    exit: animateOut?.exit ?? presetAnimation.exit
  };
};

const TwentyFirstCultExpandable = forwardRef(function TwentyFirstCultExpandable(
  {
    children,
    expanded,
    onToggle,
    transitionDuration = 0.3,
    easeType = 'easeInOut',
    expandDirection = 'vertical',
    expandBehavior = 'replace',
    initialDelay = 0,
    onExpandStart,
    onExpandEnd,
    onCollapseStart,
    onCollapseEnd,
    className,
    ...props
  },
  ref
) {
  const [isExpandedInternal, setIsExpandedInternal] = useState(false);
  const isExpanded = expanded !== undefined ? expanded : isExpandedInternal;
  const toggleExpand = onToggle || (() => setIsExpandedInternal((prev) => !prev));

  useEffect(() => {
    if (isExpanded) {
      onExpandStart?.();
    } else {
      onCollapseStart?.();
    }
  }, [isExpanded, onExpandStart, onCollapseStart]);

  const contextValue = {
    isExpanded,
    toggleExpand,
    expandDirection,
    expandBehavior,
    transitionDuration,
    easeType,
    initialDelay,
    onExpandEnd,
    onCollapseEnd
  };

  return (
    <ExpandableContext.Provider value={contextValue}>
      <motion.div
        ref={ref}
        initial={false}
        transition={{
          duration: transitionDuration,
          ease: easeType,
          delay: initialDelay
        }}
        className={cn('bemo-21st-cult-expandable-root', className)}
        {...props}
      >
        {typeof children === 'function' ? children({ isExpanded }) : children}
      </motion.div>
    </ExpandableContext.Provider>
  );
});

const ExpandableContent = forwardRef(function ExpandableContent(
  {
    children,
    preset,
    animateIn,
    animateOut,
    stagger = false,
    staggerChildren = 0.1,
    keepMounted = false,
    className,
    ...props
  },
  ref
) {
  const { isExpanded, transitionDuration, easeType, onExpandEnd, onCollapseEnd } = useExpandable();
  const [measureRef, { height: measuredHeight }] = useMeasure();
  const animatedHeight = useMotionValue(0);
  const smoothHeight = useSpring(animatedHeight, springConfig);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      animatedHeight.set(isExpanded ? measuredHeight : 0);
      return;
    }
    if (isExpanded) {
      animatedHeight.set(measuredHeight);
    } else {
      animatedHeight.set(0);
    }
  }, [isExpanded, measuredHeight, animatedHeight, prefersReducedMotion]);

  const animationProps = getAnimationProps(preset, animateIn, animateOut);

  const handleAnimationComplete = () => {
    if (isExpanded) {
      onExpandEnd?.();
    } else {
      onCollapseEnd?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        height: prefersReducedMotion ? (isExpanded ? 'auto' : 0) : smoothHeight,
        overflow: 'hidden'
      }}
      transition={{ duration: prefersReducedMotion ? 0 : transitionDuration, ease: easeType }}
      className={cn('bemo-21st-cult-expandable-content', className)}
      onAnimationComplete={handleAnimationComplete}
      {...props}
    >
      <AnimatePresence initial={false}>
        {(isExpanded || keepMounted) && (
          <motion.div
            ref={measureRef}
            initial={prefersReducedMotion ? false : animationProps.initial}
            animate={animationProps.animate}
            exit={prefersReducedMotion ? undefined : animationProps.exit}
            transition={{ duration: prefersReducedMotion ? 0 : transitionDuration, ease: easeType }}
            className="bemo-21st-cult-expandable-content-inner"
            style={{ visibility: keepMounted && !isExpanded ? 'hidden' : 'visible' }}
          >
            {stagger ? (
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : staggerChildren
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {Children.map(children, (child, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              children
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const ExpandableCard = forwardRef(function ExpandableCard(
  {
    children,
    className = '',
    collapsedSize = { width: 320, height: 211 },
    expandedSize = { width: 480, height: undefined },
    hoverToExpand = false,
    expandDelay = 0,
    collapseDelay = 0,
    ...props
  },
  ref
) {
  const { isExpanded, toggleExpand, expandDirection } = useExpandable();
  const [measureRef, { width, height }] = useMeasure();
  const animatedWidth = useMotionValue(collapsedSize.width || 0);
  const animatedHeight = useMotionValue(collapsedSize.height || 0);
  const smoothWidth = useSpring(animatedWidth, springConfig);
  const smoothHeight = useSpring(animatedHeight, springConfig);
  const hoverTimeoutRef = useRef(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isExpanded) {
      animatedWidth.set(expandedSize.width || width || collapsedSize.width || 0);
      animatedHeight.set(expandedSize.height || height || collapsedSize.height || 0);
    } else {
      animatedWidth.set(collapsedSize.width || width || 0);
      animatedHeight.set(collapsedSize.height || height || 0);
    }
  }, [
    isExpanded,
    collapsedSize.width,
    collapsedSize.height,
    expandedSize.width,
    expandedSize.height,
    width,
    height,
    animatedWidth,
    animatedHeight
  ]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleHover = useCallback(() => {
    if (hoverToExpand && !isExpanded) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(toggleExpand, expandDelay);
    }
  }, [hoverToExpand, isExpanded, toggleExpand, expandDelay]);

  const handleHoverEnd = useCallback(() => {
    if (hoverToExpand && isExpanded) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(toggleExpand, collapseDelay);
    }
  }, [hoverToExpand, isExpanded, toggleExpand, collapseDelay]);

  const widthStyle =
    expandDirection === 'vertical'
      ? collapsedSize.width
      : prefersReducedMotion
        ? isExpanded
          ? expandedSize.width || width
          : collapsedSize.width
        : smoothWidth;
  const heightStyle =
    expandDirection === 'horizontal'
      ? collapsedSize.height
      : prefersReducedMotion
        ? isExpanded
          ? expandedSize.height || height
          : collapsedSize.height
        : smoothHeight;

  return (
    <motion.div
      ref={ref}
      className={cn('bemo-21st-cult-expandable-card', className)}
      style={{
        width: widthStyle,
        height: heightStyle
      }}
      transition={prefersReducedMotion ? { duration: 0 } : springConfig}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      {...props}
    >
      <div className="bemo-21st-cult-expandable-card-outer">
        <div className="bemo-21st-cult-expandable-card-mid">
          <div className="bemo-21st-cult-expandable-card-inner">
            <div className="bemo-21st-cult-expandable-card-content-wrap">
              <div ref={measureRef} className="bemo-21st-cult-expandable-card-measure">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ExpandableTrigger = forwardRef(function ExpandableTrigger(
  { children, className, ...props },
  ref
) {
  const { toggleExpand, isExpanded } = useExpandable();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <div
      ref={ref}
      onClick={toggleExpand}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      className={cn('bemo-21st-cult-expandable-trigger', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const ExpandableCardHeader = forwardRef(function ExpandableCardHeader(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('bemo-21st-cult-expandable-card-header', className)}
      {...props}
    >
      <motion.div layout className="bemo-21st-cult-expandable-card-header-inner">
        {children}
      </motion.div>
    </div>
  );
});

const ExpandableCardContent = forwardRef(function ExpandableCardContent(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('bemo-21st-cult-expandable-card-body', className)}
      {...props}
    >
      <motion.div layout>{children}</motion.div>
    </div>
  );
});

const ExpandableCardFooter = forwardRef(function ExpandableCardFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('bemo-21st-cult-expandable-card-footer', className)}
      {...props}
    />
  );
});

TwentyFirstCultExpandable.displayName = 'TwentyFirstCultExpandable';
ExpandableContent.displayName = 'ExpandableContent';
ExpandableCard.displayName = 'ExpandableCard';
ExpandableTrigger.displayName = 'ExpandableTrigger';
ExpandableCardHeader.displayName = 'ExpandableCardHeader';
ExpandableCardContent.displayName = 'ExpandableCardContent';
ExpandableCardFooter.displayName = 'ExpandableCardFooter';

TwentyFirstCultExpandable.Content = ExpandableContent;
TwentyFirstCultExpandable.Card = ExpandableCard;
TwentyFirstCultExpandable.Trigger = ExpandableTrigger;
TwentyFirstCultExpandable.CardHeader = ExpandableCardHeader;
TwentyFirstCultExpandable.CardContent = ExpandableCardContent;
TwentyFirstCultExpandable.CardFooter = ExpandableCardFooter;
TwentyFirstCultExpandable.useExpandable = useExpandable;

export {
  TwentyFirstCultExpandable,
  useExpandable,
  ExpandableContent,
  ExpandableCard,
  ExpandableTrigger,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter
};

export default TwentyFirstCultExpandable;
