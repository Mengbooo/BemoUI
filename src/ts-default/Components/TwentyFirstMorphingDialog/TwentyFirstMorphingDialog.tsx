import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  createContext,
  type CSSProperties,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
  type Dispatch,
  type SetStateAction,
  type RefObject,
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
  type Variant,
} from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './TwentyFirstMorphingDialog.css';

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
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

export type TwentyFirstMorphingDialogContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: RefObject<HTMLButtonElement>;
};

const MorphingDialogContext =
  createContext<TwentyFirstMorphingDialogContextType | null>(null);

function useMorphingDialog(): TwentyFirstMorphingDialogContextType {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error(
      'useMorphingDialog must be used within a MorphingDialog'
    );
  }
  return context;
}

export type TwentyFirstMorphingDialogProviderProps = {
  children: ReactNode;
  transition?: Transition;
};

function MorphingDialogProvider({
  children,
  transition,
}: TwentyFirstMorphingDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
    }),
    [isOpen, uniqueId]
  );

  return (
    <MorphingDialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

export type TwentyFirstMorphingDialogProps = {
  children: ReactNode;
  transition?: Transition;
};

function MorphingDialog({
  children,
  transition,
}: TwentyFirstMorphingDialogProps) {
  return (
    <MorphingDialogProvider transition={transition}>
      {children}
    </MorphingDialogProvider>
  );
}

export type TwentyFirstMorphingDialogTriggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function MorphingDialogTrigger({
  children,
  className,
  style,
}: TwentyFirstMorphingDialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.button
      ref={triggerRef}
      type="button"
      layoutId={`dialog-${uniqueId}`}
      className={cn('bemo-21st-morphing-dialog-trigger', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`bemo-21st-morphing-dialog-content-${uniqueId}`}
    >
      {children}
    </motion.button>
  );
}

export type TwentyFirstMorphingDialogContentProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function MorphingDialogContent({
  children,
  className,
  style,
}: TwentyFirstMorphingDialogContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'Tab') {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('bemo-21st-morphing-dialog-overflow-hidden');
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        const first = focusableElements[0] as HTMLElement;
        const last = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;
        setFirstFocusableElement(first);
        setLastFocusableElement(last);
        first.focus();
      }
    } else {
      document.body.classList.remove(
        'bemo-21st-morphing-dialog-overflow-hidden'
      );
      triggerRef.current?.focus();
    }

    return () => {
      document.body.classList.remove(
        'bemo-21st-morphing-dialog-overflow-hidden'
      );
    };
  }, [isOpen, triggerRef]);

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('bemo-21st-morphing-dialog-content', className)}
      style={style}
      role="dialog"
      aria-modal="true"
      id={`bemo-21st-morphing-dialog-content-${uniqueId}`}
      aria-labelledby={`bemo-21st-morphing-dialog-title-${uniqueId}`}
      aria-describedby={`bemo-21st-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type TwentyFirstMorphingDialogContainerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function MorphingDialogContainer({
  children,
  className,
  style,
}: TwentyFirstMorphingDialogContainerProps) {
  const { isOpen, uniqueId } = useMorphingDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="bemo-21st-morphing-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <div
            className={cn('bemo-21st-morphing-dialog-container', className)}
            style={style}
          >
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export type TwentyFirstMorphingDialogTitleProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function MorphingDialogTitle({
  children,
  className,
  style,
}: TwentyFirstMorphingDialogTitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-title-container-${uniqueId}`}
      className={cn('bemo-21st-morphing-dialog-title', className)}
      style={style}
      layout
      id={`bemo-21st-morphing-dialog-title-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type TwentyFirstMorphingDialogSubtitleProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function MorphingDialogSubtitle({
  children,
  className,
  style,
}: TwentyFirstMorphingDialogSubtitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={cn('bemo-21st-morphing-dialog-subtitle', className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export type TwentyFirstMorphingDialogDescriptionProps = {
  children: ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingDialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: TwentyFirstMorphingDialogDescriptionProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={cn('bemo-21st-morphing-dialog-description', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`bemo-21st-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type TwentyFirstMorphingDialogImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

function MorphingDialogImage({
  src,
  alt,
  className,
  style,
}: TwentyFirstMorphingDialogImageProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn('bemo-21st-morphing-dialog-image', className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

export type TwentyFirstMorphingDialogCloseProps = {
  children?: ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingDialogClose({
  children,
  className,
  variants,
}: TwentyFirstMorphingDialogCloseProps) {
  const { setIsOpen, uniqueId } = useMorphingDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn('bemo-21st-morphing-dialog-close', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <X size={24} aria-hidden="true" />}
    </motion.button>
  );
}

export {
  MorphingDialog as TwentyFirstMorphingDialog,
  MorphingDialogTrigger as TwentyFirstMorphingDialogTrigger,
  MorphingDialogContainer as TwentyFirstMorphingDialogContainer,
  MorphingDialogContent as TwentyFirstMorphingDialogContent,
  MorphingDialogClose as TwentyFirstMorphingDialogClose,
  MorphingDialogTitle as TwentyFirstMorphingDialogTitle,
  MorphingDialogSubtitle as TwentyFirstMorphingDialogSubtitle,
  MorphingDialogDescription as TwentyFirstMorphingDialogDescription,
  MorphingDialogImage as TwentyFirstMorphingDialogImage,
  useMorphingDialog as useTwentyFirstMorphingDialog,
};

export default MorphingDialog;
