import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';
import { X } from 'lucide-react';
import './TwentyFirstDialog.css';

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function usePreventScroll({ isDisabled = false }: { isDisabled?: boolean } = {}) {
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

interface DialogContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
  variants: Variants;
  transition?: Transition;
  ids: {
    dialog: string;
    title: string;
    description: string;
  };
  onAnimationComplete: (definition: string) => void;
  handleTrigger: () => void;
  className?: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

const defaultVariants: Variants = {
  initial: { opacity: 0, scale: 0.92, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 4 },
};

const defaultTransition: Transition = {
  ease: [0.22, 1, 0.36, 1],
  duration: 0.22,
};

export interface TwentyFirstDialogProps {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  className?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

function TwentyFirstDialog({
  children,
  variants = defaultVariants,
  transition = defaultTransition,
  defaultOpen = false,
  onOpenChange,
  open,
  className,
}: TwentyFirstDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const isOpen = open !== undefined ? open : uncontrolledOpen;

  usePreventScroll({ isDisabled: !isOpen });

  const setIsOpen = useCallback(
    (value: boolean) => {
      setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (e: Event) => {
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
    (definition: string) => {
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

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

function DialogTrigger({ children, className, asChild = false, ...props }: DialogTriggerProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTrigger must be used within TwentyFirstDialog');

  if (asChild && React.isValidElement<{ onClick?: React.MouseEventHandler<Element>; className?: string }>(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent<Element>) => {
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

export interface DialogPortalProps {
  children: ReactNode;
  container?: HTMLElement | null;
}

function DialogPortal({ children, container }: DialogPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setPortalContainer(container || document.body);
    return () => setMounted(false);
  }, [container]);

  if (!mounted || !portalContainer) return null;
  return createPortal(children, portalContainer);
}

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
  container?: HTMLElement | null;
  showClose?: boolean;
}

function DialogContent({ children, className, container, showClose = true }: DialogContentProps) {
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
          ref={dialogRef as React.RefObject<HTMLDialogElement>}
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

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <div className={cn('bemo-21st-dialog-header', className)} {...props}>
      {children}
    </div>
  );
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

function DialogTitle({ children, className, ...props }: DialogTitleProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTitle must be used within TwentyFirstDialog');

  return (
    <h2 id={context.ids.title} className={cn('bemo-21st-dialog-title', className)} {...props}>
      {children}
    </h2>
  );
}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogDescription must be used within TwentyFirstDialog');

  return (
    <p
      id={context.ids.description}
      className={cn('bemo-21st-dialog-description', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

function DialogClose({ className, children, disabled, ...props }: DialogCloseProps) {
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

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function DialogFooter({ children, className, ...props }: DialogFooterProps) {
  return (
    <div className={cn('bemo-21st-dialog-footer', className)} {...props}>
      {children}
    </div>
  );
}

interface TwentyFirstDialogComponent extends React.FC<TwentyFirstDialogProps> {
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Close: typeof DialogClose;
  Footer: typeof DialogFooter;
  Portal: typeof DialogPortal;
}

const TwentyFirstDialogWithSub = TwentyFirstDialog as TwentyFirstDialogComponent;
TwentyFirstDialogWithSub.Trigger = DialogTrigger;
TwentyFirstDialogWithSub.Content = DialogContent;
TwentyFirstDialogWithSub.Header = DialogHeader;
TwentyFirstDialogWithSub.Title = DialogTitle;
TwentyFirstDialogWithSub.Description = DialogDescription;
TwentyFirstDialogWithSub.Close = DialogClose;
TwentyFirstDialogWithSub.Footer = DialogFooter;
TwentyFirstDialogWithSub.Portal = DialogPortal;

export {
  TwentyFirstDialogWithSub as TwentyFirstDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogPortal,
};

export default TwentyFirstDialogWithSub;
