import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function usePreventScroll({ isDisabled = false } = {}) {
  useEffect(() => {
    if (isDisabled) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isDisabled]);
}

const DialogContext = createContext(null);

const defaultVariants = {
  initial: { opacity: 0, scale: 0.92, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 4 },
};

const defaultTransition = {
  ease: [0.22, 1, 0.36, 1],
  duration: 0.22,
};

function TwentyFirstDialog({
  children,
  variants = defaultVariants,
  transition = defaultTransition,
  defaultOpen = false,
  onOpenChange,
  open,
  className,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const dialogRef = useRef(null);
  const isOpen = open !== undefined ? open : uncontrolledOpen;

  usePreventScroll({ isDisabled: !isOpen });

  const setIsOpen = useCallback(
    (value) => {
      setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (e) => {
      e.preventDefault();
      if (isOpen) setIsOpen(false);
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  const handleTrigger = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onAnimationComplete = useCallback(
    (definition) => {
      if ((definition === 'exit' || definition === 'initial') && !isOpen) {
        dialogRef.current?.close();
      }
    },
    [isOpen]
  );

  const baseId = useId();
  const ids = {
    dialog: `bemo-21st-dialog-${baseId}`,
    title: `bemo-21st-dialog-title-${baseId}`,
    description: `bemo-21st-dialog-description-${baseId}`,
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        setIsOpen,
        dialogRef,
        variants,
        transition,
        ids,
        onAnimationComplete,
        handleTrigger,
        className,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, className, asChild = false, ...props }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTrigger must be used within TwentyFirstDialog');

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        context.handleTrigger();
      },
      className: cn(children.props.className, className),
      ...props,
    });
  }

  return (
    <button
      type="button"
      onClick={context.handleTrigger}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-[#1620E4] px-4 py-2.5 text-sm font-medium text-white transition-[background-color,box-shadow,opacity] duration-150 hover:bg-[#1219c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6] disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogPortal({ children, container }) {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setMounted(true);
    setPortalContainer(container || document.body);
    return () => setMounted(false);
  }, [container]);

  if (!mounted || !portalContainer) return null;
  return createPortal(children, portalContainer);
}

function DialogContent({ children, className, container, showClose = true }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogContent must be used within TwentyFirstDialog');

  const {
    isOpen,
    setIsOpen,
    dialogRef,
    variants,
    transition,
    ids,
    onAnimationComplete,
  } = context;

  const content = (
    <AnimatePresence mode="wait" onExitComplete={() => dialogRef.current?.close()}>
      {isOpen && (
        <motion.dialog
          key={ids.dialog}
          ref={dialogRef}
          id={ids.dialog}
          aria-labelledby={ids.title}
          aria-describedby={ids.description}
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === dialogRef.current) setIsOpen(false);
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          onAnimationComplete={onAnimationComplete}
          className={cn(
            'fixed top-1/2 left-1/2 z-50 m-0 flex max-h-[min(90vh,40rem)] w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-0 text-neutral-950 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:flex-col focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] max-sm:w-[calc(100vw-1.25rem)] max-sm:max-h-[85vh] max-sm:rounded-lg',
            className
          )}
        >
          <div className="relative flex max-h-inherit w-full flex-col overflow-auto p-6 max-sm:p-5">
            {children}
          </div>
          {showClose && (
            <DialogClose className="absolute top-4 right-4 z-10" />
          )}
        </motion.dialog>
      )}
    </AnimatePresence>
  );

  return <DialogPortal container={container}>{content}</DialogPortal>;
}

function DialogHeader({ children, className }) {
  return (
    <div className={cn('mb-4 flex flex-col gap-1.5 pr-7', className)}>{children}</div>
  );
}

function DialogTitle({ children, className }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTitle must be used within TwentyFirstDialog');

  return (
    <h2
      id={context.ids.title}
      className={cn('m-0 text-lg font-semibold leading-snug tracking-tight text-neutral-950', className)}
    >
      {children}
    </h2>
  );
}

function DialogDescription({ children, className }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogDescription must be used within TwentyFirstDialog');

  return (
    <p
      id={context.ids.description}
      className={cn('m-0 text-sm leading-relaxed text-gray-500', className)}
    >
      {children}
    </p>
  );
}

function DialogClose({ className, children, disabled, ...props }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogClose must be used within TwentyFirstDialog');

  return (
    <button
      type="button"
      onClick={() => context.setIsOpen(false)}
      aria-label="Close dialog"
      disabled={disabled}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md border-0 bg-transparent text-gray-500 opacity-80 transition-[opacity,background-color,color] duration-150 hover:bg-gray-100 hover:text-neutral-950 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] disabled:pointer-events-none disabled:opacity-40',
        className
      )}
      {...props}
    >
      {children || <X size={16} strokeWidth={2} aria-hidden="true" />}
      <span className="sr-only absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
        Close
      </span>
    </button>
  );
}

function DialogFooter({ children, className }) {
  return (
    <div
      className={cn(
        'mt-5 flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 pt-4 max-sm:flex-col-reverse max-sm:items-stretch',
        className
      )}
    >
      {children}
    </div>
  );
}

TwentyFirstDialog.Trigger = DialogTrigger;
TwentyFirstDialog.Content = DialogContent;
TwentyFirstDialog.Header = DialogHeader;
TwentyFirstDialog.Title = DialogTitle;
TwentyFirstDialog.Description = DialogDescription;
TwentyFirstDialog.Close = DialogClose;
TwentyFirstDialog.Footer = DialogFooter;
TwentyFirstDialog.Portal = DialogPortal;

export {
  TwentyFirstDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogPortal,
};

export default TwentyFirstDialog;

/* Tailwind v4 note: dialog ::backdrop styles are applied via native backdrop: utilities above.
   prefers-reduced-motion is honored by Framer Motion when reducedMotion is set on MotionConfig,
   or by system settings when Motion respects reduce. No custom keyframes required for this dialog. */
