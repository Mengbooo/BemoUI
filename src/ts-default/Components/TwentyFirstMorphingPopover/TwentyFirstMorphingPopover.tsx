import React, {
  useState,
  useId,
  useRef,
  useEffect,
  createContext,
  useContext,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type HTMLAttributes,
} from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';
import './TwentyFirstMorphingPopover.css';

const TRANSITION: Transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.4,
};

type MorphingPopoverContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  uniqueId: string;
  variants?: Variants;
};

const MorphingPopoverContext =
  createContext<MorphingPopoverContextValue | null>(null);

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener as EventListener);
    document.addEventListener('touchstart', listener as EventListener);
    return () => {
      document.removeEventListener('mousedown', listener as EventListener);
      document.removeEventListener('touchstart', listener as EventListener);
    };
  }, [ref, handler]);
}

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const uniqueId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const open = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  };

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  return { isOpen, open, close, uniqueId };
}

function usePrefersReducedMotion(): boolean {
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

export type TwentyFirstMorphingPopoverProps = {
  children: ReactNode;
  transition?: Transition;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: Variants;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

function TwentyFirstMorphingPopover({
  children,
  transition = TRANSITION,
  defaultOpen = false,
  open,
  onOpenChange,
  variants,
  className = '',
  ...props
}: TwentyFirstMorphingPopoverProps) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange });
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveTransition: Transition = prefersReducedMotion
    ? { type: 'tween', duration: 0 }
    : transition;

  return (
    <MorphingPopoverContext.Provider value={{ ...popoverLogic, variants }}>
      <MotionConfig transition={effectiveTransition}>
        <div
          className={`bemo-21st-morphing-popover ${className}`.trim()}
          key={popoverLogic.uniqueId}
          {...props}
        >
          {children}
        </div>
      </MotionConfig>
    </MorphingPopoverContext.Provider>
  );
}

export type TwentyFirstMorphingPopoverTriggerProps = {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
} & Omit<ComponentProps<typeof motion.button>, 'children'>;

function TwentyFirstMorphingPopoverTrigger({
  children,
  className = '',
  asChild = false,
  disabled = false,
  ...props
}: TwentyFirstMorphingPopoverTriggerProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error(
      'TwentyFirstMorphingPopoverTrigger must be used within TwentyFirstMorphingPopover'
    );
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    props.onClick?.(e);
    context.open();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      context.open();
    }
    props.onKeyDown?.(e);
  };

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = (child.props || {}) as Record<string, unknown>;
    return (
      <motion.div
        layoutId={`popover-trigger-${context.uniqueId}`}
        className="bemo-21st-morphing-popover-trigger-wrap"
        style={{ display: 'inline-flex' }}
      >
        {cloneElement(child, {
          ...childProps,
          onClick: (e: MouseEvent) => {
            (childProps.onClick as ((ev: MouseEvent) => void) | undefined)?.(e);
            if (!disabled) context.open();
          },
          'aria-expanded': context.isOpen,
          'aria-controls': `popover-content-${context.uniqueId}`,
          'aria-haspopup': 'dialog',
          disabled: disabled || Boolean(childProps.disabled),
          className: [childProps.className, className].filter(Boolean).join(' '),
        } as Partial<unknown>)}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={context.uniqueId}
      layoutId={`popover-trigger-${context.uniqueId}`}
      className="bemo-21st-morphing-popover-trigger-wrap"
      style={{ display: 'inline-flex' }}
    >
      <motion.button
        type="button"
        {...props}
        layoutId={`popover-label-${context.uniqueId}`}
        key={`label-${context.uniqueId}`}
        className={`bemo-21st-morphing-popover-trigger ${className}`.trim()}
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

export type TwentyFirstMorphingPopoverContentProps = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof motion.div>, 'children'>;

function TwentyFirstMorphingPopoverContent({
  children,
  className = '',
  ...props
}: TwentyFirstMorphingPopoverContentProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error(
      'TwentyFirstMorphingPopoverContent must be used within TwentyFirstMorphingPopover'
    );
  }

  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(context.close);
  closeRef.current = context.close;

  useClickOutside(ref, () => {
    if (context.isOpen) closeRef.current();
  });

  useEffect(() => {
    if (!context.isOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeRef.current();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.isOpen]);

  useEffect(() => {
    if (!context.isOpen || !ref.current) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = ref.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    } else {
      ref.current.focus();
    }
    return () => {
      previouslyFocused?.focus?.();
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
          className={`bemo-21st-morphing-popover-content ${className}`.trim()}
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
