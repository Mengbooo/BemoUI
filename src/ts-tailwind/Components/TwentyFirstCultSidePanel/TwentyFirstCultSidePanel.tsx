import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
  useId,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { X, Menu } from 'lucide-react';

export type TwentyFirstCultSidePanelProps = {
  panelOpen?: boolean;
  defaultOpen?: boolean;
  onPanelOpenChange?: (open: boolean) => void;
  handlePanelOpen?: () => void;
  className?: string;
  videoUrl?: string;
  videoPoster?: string;
  videoTitle?: string;
  renderButton?: (handleToggle: () => void) => ReactNode;
  children?: ReactNode;
  accentColor?: string;
  accentSecondary?: string;
  closedWidth?: number | string;
  openWidthPercent?: number;
  ariaLabel?: string;
  disabled?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

function useMeasure(): [React.RefObject<HTMLDivElement>, { height: number; width: number }] {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ height: rect.height, width: rect.width });
    };
    update();
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return [ref, bounds];
}

const sectionVariants = {
  open: {
    width: '97%',
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1] as const,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  closed: {
    transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] as const },
  },
};

const sharedTransition = { duration: 0.6, ease: [0.42, 0, 0.58, 1] as const };

type ResizablePanelProps = {
  children?: ReactNode;
  className?: string;
};

const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  function ResizablePanel({ children, className = '' }, ref) {
    const transition = {
      type: 'tween' as const,
      ease: [0.42, 0, 0.58, 1] as const,
      duration: 0.4,
    };

    return (
      <MotionConfig transition={transition}>
        <div className={`flex w-full flex-col items-start ${className}`.trim()}>
          <div className="mx-auto w-full">
            <div
              ref={ref}
              className={`relative overflow-hidden ${children ? 'rounded-r-none' : 'rounded-sm'}`}
            >
              {children}
            </div>
          </div>
        </div>
      </MotionConfig>
    );
  }
);

ResizablePanel.displayName = 'ResizablePanel';

const TwentyFirstCultSidePanel = forwardRef<HTMLDivElement, TwentyFirstCultSidePanelProps>(
  function TwentyFirstCultSidePanel(
    {
      panelOpen: controlledOpen,
      defaultOpen = false,
      onPanelOpenChange,
      handlePanelOpen: externalHandle,
      className = '',
      videoUrl,
      videoPoster,
      videoTitle = 'Featured video',
      renderButton,
      children,
      accentColor = '#1620E4',
      accentSecondary = '#7BE9C6',
      closedWidth = 160,
      openWidthPercent = 97,
      ariaLabel = 'Side panel',
      disabled = false,
      ...rest
    },
    ref
  ) {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const panelOpen = isControlled ? Boolean(controlledOpen) : internalOpen;
    const prefersReducedMotion = useReducedMotion();
    const panelId = useId();
    const [measureRef, bounds] = useMeasure();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const setOpen = useCallback(
      (next: boolean) => {
        if (disabled) return;
        if (!isControlled) setInternalOpen(next);
        onPanelOpenChange?.(next);
      },
      [disabled, isControlled, onPanelOpenChange]
    );

    const handlePanelOpen = useCallback(() => {
      if (disabled) return;
      if (typeof externalHandle === 'function') {
        externalHandle();
        return;
      }
      setOpen(!panelOpen);
    }, [disabled, externalHandle, panelOpen, setOpen]);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && panelOpen && !disabled) setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [panelOpen, disabled, setOpen]);

    useEffect(() => {
      if (!panelOpen && videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {
          /* ignore */
        }
      }
    }, [panelOpen]);

    const defaultButton = (toggle: () => void) => (
      <button
        type="button"
        className="inline-flex items-center gap-2 min-h-11 min-w-11 px-3 py-2 rounded-full border border-transparent bg-transparent text-neutral-50 text-sm font-medium cursor-pointer transition-[background-color,color,border-color,box-shadow] duration-200 hover:bg-white/8 hover:border-[#7BE9C6]/35 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6] focus-visible:shadow-[0_0_0_4px_rgba(22,32,228,0.35)] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        onClick={toggle}
        aria-expanded={panelOpen}
        aria-controls={panelId}
        disabled={disabled}
        style={{ '--tw-accent': accentColor, '--tw-accent-sec': accentSecondary } as CSSProperties}
      >
        <span className="inline-flex" aria-hidden="true" style={{ color: accentSecondary }}>
          {panelOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </span>
        <span className="whitespace-nowrap max-sm:sr-only">{panelOpen ? 'Close' : 'Open'}</span>
      </button>
    );

    const variants = prefersReducedMotion
      ? {
          open: { width: `${openWidthPercent}%`, transition: { duration: 0 } },
          closed: { transition: { duration: 0 } },
        }
      : {
          ...sectionVariants,
          open: { ...sectionVariants.open, width: `${openWidthPercent}%` },
        };

    return (
      <ResizablePanel ref={ref}>
        <motion.div
          className={`bg-neutral-900 text-neutral-50 rounded-r-[44px] max-sm:rounded-r-[28px] w-[160px] md:w-[260px] max-w-full box-border overflow-hidden data-[disabled=true]:opacity-55 data-[disabled=true]:pointer-events-none motion-reduce:transition-none ${className}`.trim()}
          animate={panelOpen ? 'open' : 'closed'}
          variants={variants}
          initial={false}
          style={
            {
              '--bemo-accent': accentColor,
              '--bemo-accent-sec': accentSecondary,
              width: panelOpen
                ? undefined
                : typeof closedWidth === 'number'
                  ? `${closedWidth}px`
                  : closedWidth,
            } as CSSProperties
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.42, 0, 0.58, 1] as const }
          }
          role="region"
          aria-label={ariaLabel}
          data-open={panelOpen ? 'true' : 'false'}
          data-disabled={disabled ? 'true' : 'false'}
          {...rest}
        >
          <motion.div
            animate={{
              height: prefersReducedMotion
                ? 'auto'
                : bounds.height > 0
                  ? bounds.height
                  : 0.1,
            }}
            className="h-auto"
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', bounce: 0.02, duration: 0.65 }
            }
          >
            <div ref={measureRef} className="w-full">
              <AnimatePresence mode="popLayout">
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { ...sharedTransition, duration: sharedTransition.duration / 2 }
                  }
                  key="form"
                  className="w-full"
                >
                  <div
                    className={`flex items-center w-full justify-start pl-4 py-1 md:py-3 ${panelOpen ? 'pr-3' : ''}`}
                  >
                    {renderButton
                      ? renderButton(handlePanelOpen)
                      : defaultButton(handlePanelOpen)}
                  </div>

                  {panelOpen && (
                    <motion.div
                      id={panelId}
                      className="flex flex-col gap-4 px-4 pb-5 pt-2 box-border"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : sharedTransition}
                    >
                      {videoUrl ? (
                        <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-[#7BE9C6]/20 shadow-[0_0_0_1px_rgba(22,32,228,0.15)]">
                          <video
                            ref={videoRef}
                            className="block w-full h-auto max-h-[280px] object-cover bg-black"
                            src={videoUrl}
                            poster={videoPoster}
                            controls
                            playsInline
                            preload="metadata"
                            title={videoTitle}
                            aria-label={videoTitle}
                          >
                            <track kind="captions" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : null}
                      {children}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </ResizablePanel>
    );
  }
);

TwentyFirstCultSidePanel.displayName = 'TwentyFirstCultSidePanel';

export default TwentyFirstCultSidePanel;
export { TwentyFirstCultSidePanel };

/* Tailwind v4 keyframes (optional global):
@keyframes bemo-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
*/
