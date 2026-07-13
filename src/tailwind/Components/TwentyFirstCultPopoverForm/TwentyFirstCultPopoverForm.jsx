import { useEffect, useRef, useCallback, useId } from 'react';
import { ChevronUp, Loader } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

function useClickOutside(ref, handleOnClickOutside) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handleOnClickOutside(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleOnClickOutside]);
}

function PopoverFormCutOutTopIcon({ width = 44, height = 30 }) {
  const aspectRatio = 6 / 12;
  const calculatedHeight = width * aspectRatio;
  const calculatedWidth = height / aspectRatio;
  const finalWidth = Math.min(width, calculatedWidth);
  const finalHeight = Math.min(height, calculatedHeight);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 6 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rotate-90 mt-px"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g clipPath="url(#bemo-tw-clip-cutout-top)">
        <path
          d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
          className="fill-zinc-100 dark:fill-zinc-800"
        />
        <path
          d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
          className="stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="bemo-tw-clip-cutout-top">
          <rect width={finalWidth} height={finalHeight} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TwentyFirstCultPopoverFormSuccess({
  title = 'Success',
  description = 'Thank you for your submission',
}) {
  return (
    <div className="flex flex-col items-center text-center p-3">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-mt-1"
        aria-hidden="true"
      >
        <path
          d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          fill="#1620E4"
          fillOpacity="0.16"
        />
        <path
          d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          stroke="#1620E4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mb-1 mt-2 text-sm font-medium text-[#1620E4]">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs text-pretty mx-auto text-center m-0">
        {description}
      </p>
    </div>
  );
}

export function TwentyFirstCultPopoverFormButton({
  loading = false,
  text = 'Submit',
  disabled = false,
  type = 'submit',
  className = '',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`ml-auto flex h-6 min-w-26 items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-[#2a33e8] to-[#1620E4] px-3 text-xs font-semibold text-white shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1620E4] outline-none transition-[filter,opacity] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-[#7BE9C6] focus-visible:outline-offset-2 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer border-0 ${className}`.trim()}
      aria-busy={loading}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={String(loading)}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 25 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="flex w-full items-center justify-center"
        >
          {loading ? (
            <Loader className="size-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          ) : (
            <span>{text}</span>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function TwentyFirstCultPopoverFormSeparator({
  width = 352,
  height = 2,
  className = '',
}) {
  return (
    <svg
      className={`absolute left-0 right-0 top-[-1px] ${className}`.trim()}
      width={width}
      height={height}
      viewBox="0 0 352 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 1H352" className="stroke-zinc-200 dark:stroke-zinc-700" strokeDasharray="4 4" />
    </svg>
  );
}

export function TwentyFirstCultPopoverForm({
  open,
  setOpen,
  openChild,
  successChild,
  showSuccess = false,
  width = '364px',
  height = '192px',
  showCloseButton = false,
  title = 'Feedback',
  className = '',
  triggerClassName = '',
  contentClassName = '',
  disabled = false,
  onOpenChange,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const layoutIdBase = useId();
  const titleId = `${layoutIdBase}-title`;
  const dialogId = `${layoutIdBase}-dialog`;

  const handleClose = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [setOpen, onOpenChange]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    onOpenChange?.(true);
  }, [disabled, setOpen, onOpenChange]);

  useClickOutside(ref, () => {
    if (open) handleClose();
  });

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, handleClose]);

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', duration: 0.4, bounce: 0 };

  return (
    <div
      className={`relative flex min-h-[300px] w-full items-center justify-center max-sm:min-h-[260px] ${className}`.trim()}
      data-open={open ? 'true' : 'false'}
    >
      <motion.button
        type="button"
        layoutId={`${layoutIdBase}-wrapper`}
        onClick={handleOpen}
        disabled={disabled}
        className={`flex h-9 items-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#121212] px-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 outline-none cursor-pointer rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${triggerClassName}`.trim()}
        style={{ borderRadius: 8 }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={dialogId}
      >
        <motion.span layoutId={`${layoutIdBase}-title`}>{title}</motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId={`${layoutIdBase}-wrapper`}
            className={`absolute z-50 p-1 overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08)] outline-none max-w-[calc(100vw-32px)] focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 ${contentClassName}`.trim()}
            ref={ref}
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            style={{ borderRadius: 10, width, height }}
            tabIndex={-1}
          >
            <motion.span
              id={titleId}
              aria-hidden={showSuccess}
              className="absolute left-4 top-[17px] text-sm text-zinc-500 dark:text-zinc-400 pointer-events-none z-[1] data-[success=true]:text-transparent data-[success=true]:opacity-0"
              layoutId={`${layoutIdBase}-title`}
              data-success={showSuccess ? 'true' : 'false'}
            >
              {title}
            </motion.span>

            {showCloseButton && (
              <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-3 h-[26px] flex items-center justify-center z-20">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute z-10 -mt-1 flex items-center justify-center w-5 h-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 rounded-full border-0 bg-transparent cursor-pointer p-0"
                  aria-label="Close"
                >
                  <ChevronUp className="text-current opacity-80" size={14} aria-hidden="true" />
                </button>
                <PopoverFormCutOutTopIcon />
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={prefersReducedMotion ? false : { y: -32, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={springTransition}
                  className="flex h-full flex-col items-center justify-center"
                >
                  {successChild || <TwentyFirstCultPopoverFormSuccess />}
                </motion.div>
              ) : (
                <motion.div
                  key="open-child"
                  exit={prefersReducedMotion ? undefined : { y: 8, opacity: 0, filter: 'blur(4px)' }}
                  transition={springTransition}
                  style={{ borderRadius: 10 }}
                  className="h-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#121212] z-20 relative overflow-auto"
                >
                  {openChild}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TwentyFirstCultPopoverForm;

/*
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
*/
