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

export type DirectionAwareTab = {
  id: number | string;
  label: string;
  content: ReactNode;
};

export interface TwentyFirstCultDirectionAwareTabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: DirectionAwareTab[];
  className?: string;
  rounded?: string;
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
  rounded = 'rounded-full',
  roundedInner = 'rounded-full',
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  accentColor = '#1620E4',
  accentColorAlt = '#7BE9C6',
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
      if (entry) setBounds({ height: entry.contentRect.height });
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
      if (!isControlled) setInternalActiveId(newTabId);
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
      } else return;
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
    active: { x: 0, opacity: 1, filter: 'blur(0px)' },
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

  const styleVars = {
    '--bemo-21st-cult-tabs-accent': accentColor,
    '--bemo-21st-cult-tabs-accent-alt': accentColorAlt,
  } as CSSProperties;

  return (
    <div
      className={`flex flex-col items-center w-full text-neutral-200 ${className}`.trim()}
      style={styleVars}
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`flex flex-wrap gap-1 border-none cursor-pointer bg-neutral-600 px-[3px] py-[3.2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] max-w-full ${rounded} ${disabled ? 'opacity-60 pointer-events-none' : ''}`.trim()}
        onKeyDown={handleKeyDown}
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
              className={`relative inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] disabled:cursor-not-allowed disabled:opacity-50 z-0 whitespace-nowrap ${roundedInner} ${
                selected
                  ? 'text-white'
                  : 'text-neutral-200/80 hover:text-neutral-300/60'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-bubble`}
                  className={`absolute inset-0 z-[1] bg-neutral-700 mix-blend-difference shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] border border-white/10 pointer-events-none ${roundedInner}`}
                  transition={springTransition}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-[2]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <MotionConfig transition={contentTransition}>
        <motion.div
          className="relative mx-auto w-full h-full overflow-hidden"
          initial={false}
          animate={{ height: bounds.height || 'auto' }}
          transition={prefersReducedMotion ? { duration: 0 } : contentTransition}
        >
          <div className="p-1" ref={setRef}>
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
                className="w-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]"
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

/* Tailwind v4 keyframes (if needed in global CSS):
   No custom keyframes required — animations use framer-motion springs.
*/
