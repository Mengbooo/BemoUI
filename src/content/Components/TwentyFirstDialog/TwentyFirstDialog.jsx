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
import './TwentyFirstDialog.css';

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
    if (isOpen && dialogRef.current) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }
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
      className={cn('bemo-21st-dialog-trigger', className)}
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
            if (e.target === dialogRef.current) {
              setIsOpen(false);
            }
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          onAnimationComplete={onAnimationComplete}
          className={cn('bemo-21st-dialog-content', className)}
        >
          <div className="bemo-21st-dialog-inner">{children}</div>
          {showClose && (
            <DialogClose className="bemo-21st-dialog-close-absolute" />
          )}
        </motion.dialog>
      )}
    </AnimatePresence>
  );

  return <DialogPortal container={container}>{content}</DialogPortal>;
}

function DialogHeader({ children, className }) {
  return (
    <div className={cn('bemo-21st-dialog-header', className)}>{children}</div>
  );
}

function DialogTitle({ children, className }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTitle must be used within TwentyFirstDialog');

  return (
    <h2 id={context.ids.title} className={cn('bemo-21st-dialog-title', className)}>
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
      className={cn('bemo-21st-dialog-description', className)}
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
      className={cn('bemo-21st-dialog-close', className)}
      disabled={disabled}
      {...props}
    >
      {children || <X size={16} strokeWidth={2} aria-hidden="true" />}
      <span className="bemo-21st-dialog-sr-only">Close</span>
    </button>
  );
}

function DialogFooter({ children, className }) {
  return (
    <div className={cn('bemo-21st-dialog-footer', className)}>{children}</div>
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
