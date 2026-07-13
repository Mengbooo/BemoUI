import { forwardRef, useState, useEffect, useCallback, useRef, useId } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import './TwentyFirstCultSidePanel.css';

function useMeasure() {
  const ref = useRef(null);
  const [bounds, setBounds] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ height: rect.height, width: rect.width });
    };

    update();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }

    window.addEventListener('resize', update);
    return () => {
      if (ro) ro.disconnect();
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
      ease: [0.42, 0, 0.58, 1],
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  closed: {
    transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] },
  },
};

const sharedTransition = { duration: 0.6, ease: [0.42, 0, 0.58, 1] };

const ResizablePanel = forwardRef(function ResizablePanel({ children, className = '' }, ref) {
  const transition = {
    type: 'tween',
    ease: [0.42, 0, 0.58, 1],
    duration: 0.4,
  };

  return (
    <MotionConfig transition={transition}>
      <div className={`bemo-21st-cult-side-panel-resizable-root ${className}`.trim()}>
        <div className="bemo-21st-cult-side-panel-resizable-inner">
          <div
            ref={ref}
            className={`bemo-21st-cult-side-panel-resizable-panel ${children ? 'bemo-21st-cult-side-panel-has-children' : ''}`}
          >
            {children}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
});

ResizablePanel.displayName = 'ResizablePanel';

const TwentyFirstCultSidePanel = forwardRef(function TwentyFirstCultSidePanel(
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
  const panelOpen = isControlled ? controlledOpen : internalOpen;
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();
  const [measureRef, bounds] = useMeasure();
  const videoRef = useRef(null);

  const setOpen = useCallback(
    (next) => {
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
    const onKey = (e) => {
      if (e.key === 'Escape' && panelOpen && !disabled) {
        setOpen(false);
      }
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

  const defaultButton = (toggle) => (
    <button
      type="button"
      className="bemo-21st-cult-side-panel-toggle"
      onClick={toggle}
      aria-expanded={panelOpen}
      aria-controls={panelId}
      disabled={disabled}
      style={{ '--bemo-accent': accentColor, '--bemo-accent-sec': accentSecondary }}
    >
      <span className="bemo-21st-cult-side-panel-toggle-icon" aria-hidden="true">
        {panelOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
      </span>
      <span className="bemo-21st-cult-side-panel-toggle-label">
        {panelOpen ? 'Close' : 'Open'}
      </span>
    </button>
  );

  const variants = prefersReducedMotion
    ? {
        open: { width: `${openWidthPercent}%`, transition: { duration: 0 } },
        closed: { transition: { duration: 0 } },
      }
    : {
        ...sectionVariants,
        open: {
          ...sectionVariants.open,
          width: `${openWidthPercent}%`,
        },
      };

  return (
    <ResizablePanel ref={ref}>
      <motion.div
        className={`bemo-21st-cult-side-panel-root ${className}`.trim()}
        animate={panelOpen ? 'open' : 'closed'}
        variants={variants}
        initial={false}
        style={{
          '--bemo-accent': accentColor,
          '--bemo-accent-sec': accentSecondary,
          '--bemo-closed-width': typeof closedWidth === 'number' ? `${closedWidth}px` : closedWidth,
        }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
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
          className="bemo-21st-cult-side-panel-height-wrap"
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: 'spring', bounce: 0.02, duration: 0.65 }
          }
        >
          <div ref={measureRef} className="bemo-21st-cult-side-panel-measure">
            <AnimatePresence mode="popLayout">
              <motion.div
                exit={{ opacity: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        ...sharedTransition,
                        duration: sharedTransition.duration / 2,
                      }
                }
                key="form"
                className="bemo-21st-cult-side-panel-content-outer"
              >
                <div
                  className={`bemo-21st-cult-side-panel-header ${panelOpen ? 'bemo-21st-cult-side-panel-header-open' : ''}`}
                >
                  {renderButton ? renderButton(handlePanelOpen) : defaultButton(handlePanelOpen)}
                </div>

                {panelOpen && (
                  <motion.div
                    id={panelId}
                    className="bemo-21st-cult-side-panel-body"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : sharedTransition}
                  >
                    {videoUrl ? (
                      <div className="bemo-21st-cult-side-panel-video-wrap">
                        <video
                          ref={videoRef}
                          className="bemo-21st-cult-side-panel-video"
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
});

TwentyFirstCultSidePanel.displayName = 'TwentyFirstCultSidePanel';

export default TwentyFirstCultSidePanel;
export { TwentyFirstCultSidePanel };
