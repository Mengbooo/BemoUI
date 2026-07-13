import { useState, useCallback, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import './TwentyFirstCultFamilyButton.css';

const DEFAULT_SIZE = 64;
const EXPANDED_SIZE = 200;
const EXPANDED_HEIGHT_EXTRA = 50;

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * TwentyFirstCultFamilyButton
 * Expandable "family" action button (Cult UI FamilyButton, MIT).
 * Collapsed: circular + control. Expanded: larger panel revealing children.
 */
export function TwentyFirstCultFamilyButton({
  children,
  className,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  disabled = false,
  label = 'Toggle family actions',
  collapsedSize = DEFAULT_SIZE,
  expandedSize = EXPANDED_SIZE,
  expandedHeightExtra = EXPANDED_HEIGHT_EXTRA,
  accent = '#1620E4',
  accentSoft = '#7BE9C6',
  ...rest
}) {
  const isControlled = controlledExpanded !== undefined;
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = isControlled ? controlledExpanded : uncontrolledExpanded;
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();

  const setExpanded = useCallback(
    (next) => {
      if (disabled) return;
      if (!isControlled) setUncontrolledExpanded(next);
      onExpandedChange?.(next);
    },
    [disabled, isControlled, onExpandedChange]
  );

  const toggleExpand = useCallback(() => {
    setExpanded(!isExpanded);
  }, [isExpanded, setExpanded]);

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleExpand();
      } else if (e.key === 'Escape' && isExpanded) {
        e.preventDefault();
        setExpanded(false);
      }
    },
    [disabled, isExpanded, toggleExpand, setExpanded]
  );

  const spring = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring', damping: 25, stiffness: 400 };

  const tween = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'tween', ease: 'easeOut', duration: 0.3 };

  const rootStyle = {
    '--bemo-21st-cult-family-button-accent': accent,
    '--bemo-21st-cult-family-button-accent-soft': accentSoft,
  };

  return (
    <div
      className={cn(
        'bemo-21st-cult-family-button',
        isExpanded && 'bemo-21st-cult-family-button--expanded',
        disabled && 'bemo-21st-cult-family-button--disabled',
        className
      )}
      style={rootStyle}
      data-expanded={isExpanded ? 'true' : 'false'}
      {...rest}
    >
      <div className="bemo-21st-cult-family-button__outer">
        <div className="bemo-21st-cult-family-button__mid">
          <div className="bemo-21st-cult-family-button__inner">
            <motion.div
              className={cn(
                'bemo-21st-cult-family-button__panel',
                !isExpanded && 'bemo-21st-cult-family-button__panel--collapsed'
              )}
              layoutRoot
              layout={!prefersReducedMotion}
              initial={false}
              animate={{
                borderRadius: isExpanded ? 20 : 21,
                width: isExpanded ? expandedSize : collapsedSize,
                height: isExpanded
                  ? expandedSize + expandedHeightExtra
                  : collapsedSize,
              }}
              transition={{
                ...spring,
                when: 'beforeChildren',
              }}
              role="group"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              id={panelId}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="content"
                    className="bemo-21st-cult-family-button__content"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: 0.25, duration: 0.35, ease: 'easeOut' },
                    }}
                    exit={{
                      opacity: 0,
                      transition: prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.15 },
                    }}
                  >
                    {children}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <motion.div
                className="bemo-21st-cult-family-button__toggle-wrap"
                initial={false}
                animate={{
                  x: isExpanded ? '0%' : '-50%',
                }}
                transition={tween}
                style={{
                  left: isExpanded ? undefined : '50%',
                  bottom: 6,
                }}
              >
                <button
                  type="button"
                  className={cn(
                    'bemo-21st-cult-family-button__toggle',
                    isExpanded
                      ? 'bemo-21st-cult-family-button__toggle--close'
                      : 'bemo-21st-cult-family-button__toggle--open'
                  )}
                  onClick={toggleExpand}
                  onKeyDown={handleKeyDown}
                  disabled={disabled}
                  aria-label={label}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                >
                  <motion.span
                    className="bemo-21st-cult-family-button__toggle-icon"
                    layoutId={prefersReducedMotion ? undefined : 'bemo-21st-cult-family-button-toggle'}
                    initial={false}
                    animate={{
                      rotate: isExpanded ? -360 : -180,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.4,
                    }}
                  >
                    {isExpanded ? (
                      <X className="bemo-21st-cult-family-button__icon" aria-hidden="true" />
                    ) : (
                      <Plus className="bemo-21st-cult-family-button__icon" aria-hidden="true" />
                    )}
                  </motion.span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwentyFirstCultFamilyButton;
