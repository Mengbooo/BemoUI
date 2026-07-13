import React, {
  useMemo,
  useState,
  useId,
  useCallback,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type KeyboardEvent,
  type HTMLAttributes,
} from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import './TwentyFirstCultDirectionAwareTabs.css';

export type DirectionAwareTab = {
  id: number | string;
  label: string;
  content: ReactNode;
};

export interface TwentyFirstCultDirectionAwareTabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: DirectionAwareTab[];
  className?: string;
  /** Outer container radius (e.g. `rounded-lg` or CSS value) */
  rounded?: string;
  /** Inner tab/bubble radius — typically outer radius minus padding */
  roundedInner?: string;
  defaultActiveId?: number | string;
  activeId?: number | string;
  onChange?: (id: number | string) => void;
  accentColor?: string;
  accentColorAlt?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

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
}: TwentyFirstCultDirectionAwareTabsProps) {
  const reactId = useId();
  const baseId = `bemo-21st-cult-direction-aware-tabs-${reactId.replace(/:/g, '')}`;
  const prefersReducedMotion = useReducedMotion();

  const initialId = controlledActiveId ?? defaultActiveId ?? (tabs[0]?.id ?? 0);
  const [internalActiveId, setInternalActiveId] = useState<number | string>(initialId);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const isControlled = controlledActiveId !== undefined;
  const activeTab = isControlled ? controlledActiveId! : internalActiveId;

  const [bounds, setBounds] = useState({ height: 0 });
  const [contentNode, setContentNode] = useState<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
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
    (newTabId: number | string) => {
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
    (e: KeyboardEvent<HTMLDivElement>) => {
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
    initial: (dir: number) => ({
      x: slideDistance * dir,
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'none' : 'blur(4px)',
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: -slideDistance * dir,
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'none' : 'blur(4px)',
    }),
  };

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, bounce: 0.19, duration: 0.4 };

  const contentTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, type: 'spring' as const, bounce: 0.2 };

  const styleVars: CSSProperties = {
    ...(accentColor ? ({ ['--bemo-21st-cult-tabs-accent' as string]: accentColor } as CSSProperties) : {}),
    ...(accentColorAlt
      ? ({ ['--bemo-21st-cult-tabs-accent-alt' as string]: accentColorAlt } as CSSProperties)
      : {}),
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
              key={String(tab.id)}
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
