import { useMemo, useState, useId, useCallback, useEffect } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import './TwentyFirstCultDirectionAwareTabs.css';

/**
 * @typedef {Object} Tab
 * @property {number|string} id
 * @property {string} label
 * @property {React.ReactNode} content
 */

/**
 * Direction-aware tabs with animated bubble indicator and sliding content.
 * Adapted from Cult UI (MIT) DirectionAwareTabs.
 *
 * @param {Object} props
 * @param {Tab[]} props.tabs
 * @param {string} [props.className]
 * @param {string} [props.rounded] - Outer container border-radius class or value
 * @param {string} [props.roundedInner] - Inner tab bubble radius
 * @param {number|string} [props.defaultActiveId]
 * @param {number|string} [props.activeId] - Controlled active tab id
 * @param {(id: number|string) => void} [props.onChange]
 * @param {string} [props.accentColor]
 * @param {string} [props.accentColorAlt]
 * @param {boolean} [props.disabled]
 * @param {string} [props.ariaLabel]
 */
function TwentyFirstCultDirectionAwareTabs({
  tabs = [],
  className = '',
  rounded,
  roundedInner,
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  accentColor,
  accentColorAlt,
  disabled = false,
  ariaLabel = 'Direction aware tabs',
  ...rest
}) {
  const reactId = useId();
  const baseId = `bemo-21st-cult-direction-aware-tabs-${reactId.replace(/:/g, '')}`;
  const prefersReducedMotion = useReducedMotion();

  const initialId = controlledActiveId ?? defaultActiveId ?? (tabs[0]?.id ?? 0);
  const [internalActiveId, setInternalActiveId] = useState(initialId);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const isControlled = controlledActiveId !== undefined;
  const activeTab = isControlled ? controlledActiveId : internalActiveId;

  // Fallback measure without react-use-measure (not installed). Use ResizeObserver.
  const [bounds, setBounds] = useState({ height: 0 });
  const [contentNode, setContentNode] = useState(null);

  const setRef = useCallback((node) => {
    setContentNode(node);
  }, []);

  useEffect(() => {
    if (!contentNode) return undefined;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setBounds({ height: entry.contentRect.height });
      }
    });
    ro.observe(contentNode);
    setBounds({ height: contentNode.getBoundingClientRect().height });
    return () => ro.disconnect();
  }, [contentNode, activeTab]);

  const content = useMemo(() => {
    const active = tabs.find((tab) => tab.id === activeTab);
    return active?.content ?? null;
  }, [activeTab, tabs]);

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => t.id === activeTab),
    [tabs, activeTab]
  );

  const handleTabSelect = useCallback(
    (newTabId) => {
      if (disabled || isAnimating || newTabId === activeTab) return;
      const newIndex = tabs.findIndex((t) => t.id === newTabId);
      const newDirection = newIndex > activeIndex ? 1 : -1;
      setDirection(newDirection);
      if (!isControlled) {
        setInternalActiveId(newTabId);
      }
      onChange?.(newTabId);
    },
    [disabled, isAnimating, activeTab, tabs, activeIndex, isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled || !tabs.length) return;
      let nextIndex = activeIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (activeIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      } else {
        return;
      }
      handleTabSelect(tabs[nextIndex].id);
    },
    [disabled, tabs, activeIndex, handleTabSelect]
  );

  const slideDistance = prefersReducedMotion ? 0 : 280;

  const variants = {
    initial: (dir) => ({
      x: slideDistance * dir,
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'none' : 'blur(4px)',
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir) => ({
      x: -slideDistance * dir,
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'none' : 'blur(4px)',
    }),
  };

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', bounce: 0.19, duration: 0.4 };

  const contentTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, type: 'spring', bounce: 0.2 };

  const styleVars = {
    ...(accentColor ? { '--bemo-21st-cult-tabs-accent': accentColor } : {}),
    ...(accentColorAlt ? { '--bemo-21st-cult-tabs-accent-alt': accentColorAlt } : {}),
    ...(rounded && !rounded.startsWith('rounded') ? { borderRadius: rounded } : {}),
  };

  const outerRadiusClass = rounded && rounded.startsWith('rounded') ? rounded : '';
  const innerRadiusClass =
    roundedInner && roundedInner.startsWith('rounded')
      ? roundedInner
      : roundedInner
        ? ''
        : 'bemo-21st-cult-direction-aware-tabs-rounded-full';

  return (
    <div
      className={`bemo-21st-cult-direction-aware-tabs ${className}`.trim()}
      style={styleVars}
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`bemo-21st-cult-direction-aware-tabs-list ${outerRadiusClass}`.trim()}
        onKeyDown={handleKeyDown}
        style={
          rounded && !rounded.startsWith('rounded')
            ? { borderRadius: rounded }
            : undefined
        }
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              disabled={disabled}
              onClick={() => handleTabSelect(tab.id)}
              className={`bemo-21st-cult-direction-aware-tabs-trigger ${
                selected
                  ? 'bemo-21st-cult-direction-aware-tabs-trigger-active'
                  : ''
              } ${innerRadiusClass}`.trim()}
              style={
                roundedInner && !roundedInner.startsWith('rounded')
                  ? { borderRadius: roundedInner }
                  : undefined
              }
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-bubble`}
                  className={`bemo-21st-cult-direction-aware-tabs-bubble ${innerRadiusClass}`.trim()}
                  style={
                    roundedInner && !roundedInner.startsWith('rounded')
                      ? { borderRadius: roundedInner }
                      : undefined
                  }
                  transition={springTransition}
                  aria-hidden="true"
                />
              )}
              <span className="bemo-21st-cult-direction-aware-tabs-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <MotionConfig transition={contentTransition}>
        <motion.div
          className="bemo-21st-cult-direction-aware-tabs-content-wrapper"
          initial={false}
          animate={{
            height: bounds.height || 'auto',
          }}
          transition={prefersReducedMotion ? { duration: 0 } : contentTransition}
        >
          <div className="bemo-21st-cult-direction-aware-tabs-content-inner" ref={setRef}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={String(activeTab)}
                role="tabpanel"
                id={`${baseId}-panel-${activeTab}`}
                aria-labelledby={`${baseId}-tab-${activeTab}`}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
                className="bemo-21st-cult-direction-aware-tabs-panel"
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}

export default TwentyFirstCultDirectionAwareTabs;
export { TwentyFirstCultDirectionAwareTabs };
