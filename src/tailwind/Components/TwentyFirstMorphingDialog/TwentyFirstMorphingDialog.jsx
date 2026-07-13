/* eslint-disable react-refresh/only-export-components */
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  createContext,
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
} from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

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

const MorphingDialogContext = createContext(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error(
      'useMorphingDialog must be used within a MorphingDialog'
    );
  }
  return context;
}

function MorphingDialogProvider({ children, transition }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef(null);

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

function MorphingDialog({ children, transition }) {
  return (
    <MorphingDialogProvider transition={transition}>
      {children}
    </MorphingDialogProvider>
  );
}

function MorphingDialogTrigger({ children, className, style }) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event) => {
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
      className={cn(
        'relative cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit text-left appearance-none focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
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

function MorphingDialogContent({ children, className, style }) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();
  const containerRef = useRef(null);
  const [firstFocusableElement, setFirstFocusableElement] = useState(null);
  const [lastFocusableElement, setLastFocusableElement] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
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
      document.body.classList.add('overflow-hidden');
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        setFirstFocusableElement(first);
        setLastFocusableElement(last);
        first.focus();
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      triggerRef.current?.focus();
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
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
      className={cn(
        'relative overflow-hidden flex flex-col w-full max-w-md max-h-[min(90vh,40rem)] rounded-2xl bg-white text-neutral-950 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_40px_-12px_rgba(0,0,0,0.2)] dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_40px_-12px_rgba(0,0,0,0.5)]',
        className
      )}
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

function MorphingDialogContainer({ children, className, style }) {
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
            className="fixed inset-0 z-40 h-full w-full bg-white/40 backdrop-blur-sm dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <div
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none [&>*]:pointer-events-auto',
              className
            )}
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

function MorphingDialogTitle({ children, className, style }) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-title-container-${uniqueId}`}
      className={cn('font-semibold text-lg leading-snug tracking-tight', className)}
      style={style}
      layout
      id={`bemo-21st-morphing-dialog-title-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

function MorphingDialogSubtitle({ children, className, style }) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={cn('text-sm leading-snug text-neutral-500 dark:text-neutral-400', className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function MorphingDialogDescription({
  children,
  className,
  disableLayoutAnimation,
  variants,
}) {
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
      className={cn('text-[0.9375rem] leading-relaxed text-neutral-700 dark:text-neutral-300', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`bemo-21st-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

function MorphingDialogImage({ src, alt, className, style }) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn('block w-full h-auto object-cover', className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

function MorphingDialogClose({ children, className, variants }) {
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
      className={cn(
        'absolute top-4 right-4 z-10 inline-flex items-center justify-center size-9 p-0 border-0 rounded-full bg-black/5 text-neutral-950 cursor-pointer transition-[background-color,color,transform] duration-150 hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-neutral-50 dark:hover:bg-white/16',
        className
      )}
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

/* Tailwind v4 keyframes (optional reduced-motion helpers)
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
*/
