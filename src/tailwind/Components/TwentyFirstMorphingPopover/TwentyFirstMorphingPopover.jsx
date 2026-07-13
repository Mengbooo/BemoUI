import {
  useState,
  useId,
  useRef,
  useEffect,
  createContext,
  useContext,
  isValidElement,
  cloneElement,
} from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from 'framer-motion';

const TRANSITION = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.4,
};

const MorphingPopoverContext = createContext(null);

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
} = {}) {
  const uniqueId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const open = () => {
    if (controlledOpen === undefined) setUncontrolledOpen(true);
    onOpenChange?.(true);
  };

  const close = () => {
    if (controlledOpen === undefined) setUncontrolledOpen(false);
    onOpenChange?.(false);
  };

  return { isOpen, open, close, uniqueId };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function TwentyFirstMorphingPopover({
  children,
  transition = TRANSITION,
  defaultOpen = false,
  open,
  onOpenChange,
  variants,
  className = '',
  ...props
}) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange });
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveTransition = prefersReducedMotion
    ? { type: 'tween', duration: 0 }
    : transition;

  return (
    <MorphingPopoverContext.Provider value={{ ...popoverLogic, variants }}>
      <MotionConfig transition={effectiveTransition}>
        <div
          className={`relative flex items-center justify-center ${className}`.trim()}
          key={popoverLogic.uniqueId}
          {...props}
        >
          {children}
        </div>
      </MotionConfig>
    </MorphingPopoverContext.Provider>
  );
}

function TwentyFirstMorphingPopoverTrigger({
  children,
  className = '',
  asChild = false,
  disabled = false,
  ...props
}) {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error(
      'TwentyFirstMorphingPopoverTrigger must be used within TwentyFirstMorphingPopover'
    );
  }

  const handleClick = (e) => {
    if (disabled) return;
    props.onClick?.(e);
    context.open();
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      context.open();
    }
    props.onKeyDown?.(e);
  };

  if (asChild && isValidElement(children)) {
    const child = children;
    const childProps = child.props || {};
    return (
      <motion.div
        layoutId={`popover-trigger-${context.uniqueId}`}
        className="inline-flex"
      >
        {cloneElement(child, {
          ...childProps,
          onClick: (e) => {
            childProps.onClick?.(e);
            if (!disabled) context.open();
          },
          'aria-expanded': context.isOpen,
          'aria-controls': `popover-content-${context.uniqueId}`,
          'aria-haspopup': 'dialog',
          disabled: disabled || childProps.disabled,
          className: [childProps.className, className].filter(Boolean).join(' '),
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={context.uniqueId}
      layoutId={`popover-trigger-${context.uniqueId}`}
      className="inline-flex"
    >
      <motion.button
        type="button"
        {...props}
        layoutId={`popover-label-${context.uniqueId}`}
        key={`label-${context.uniqueId}`}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-[#1620E4] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1219c0] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100 ${className}`.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
        aria-haspopup="dialog"
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

function TwentyFirstMorphingPopoverContent({
  children,
  className = '',
  ...props
}) {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error(
      'TwentyFirstMorphingPopoverContent must be used within TwentyFirstMorphingPopover'
    );
  }

  const ref = useRef(null);
  const closeRef = useRef(context.close);
  closeRef.current = context.close;

  useClickOutside(ref, () => {
    if (context.isOpen) closeRef.current();
  });

  useEffect(() => {
    if (!context.isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.isOpen]);

  useEffect(() => {
    if (!context.isOpen || !ref.current) return;
    const previouslyFocused = document.activeElement;
    const focusable = ref.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
    else ref.current.focus();
    return () => {
      if (previouslyFocused?.focus) previouslyFocused.focus();
    };
  }, [context.isOpen]);

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          {...props}
          ref={ref}
          layoutId={`popover-trigger-${context.uniqueId}`}
          key={context.uniqueId}
          id={`popover-content-${context.uniqueId}`}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={`absolute z-50 min-w-[12rem] max-w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-black/10 bg-white p-3 text-neutral-950 shadow-md focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50 sm:min-w-[12rem] ${className}`.trim()}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={context.variants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export {
  TwentyFirstMorphingPopover,
  TwentyFirstMorphingPopoverTrigger,
  TwentyFirstMorphingPopoverContent,
};

export default TwentyFirstMorphingPopover;

/* Tailwind v4 note: accent colors use arbitrary values #1620E4 and #7BE9C6.
   No custom keyframes required — morphing uses framer-motion layoutId springs. */
