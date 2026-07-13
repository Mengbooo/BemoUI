import React, {
  useState,
  useCallback,
  useId,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const DEFAULT_SIZE = 64;
const EXPANDED_SIZE = 200;
const EXPANDED_HEIGHT_EXTRA = 50;

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export interface TwentyFirstCultFamilyButtonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
  label?: string;
  collapsedSize?: number;
  expandedSize?: number;
  expandedHeightExtra?: number;
  accent?: string;
  accentSoft?: string;
  className?: string;
}

/**
 * TwentyFirstCultFamilyButton (Tailwind v4 self-contained TSX)
 * Expandable family action button — Cult UI FamilyButton, MIT.
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
}: TwentyFirstCultFamilyButtonProps) {
  const isControlled = controlledExpanded !== undefined;
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState(defaultExpanded);
  const isExpanded = isControlled ? controlledExpanded : uncontrolledExpanded;
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();

  const setExpanded = useCallback(
    (next: boolean) => {
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
    (e: KeyboardEvent<HTMLButtonElement>) => {
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
    : { type: 'spring' as const, damping: 25, stiffness: 400 };

  const tween = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.3 };

  return (
    <div
      className={cn(
        'inline-flex relative rounded-[24px] border border-black/10 shadow-sm',
        'bg-gradient-to-b from-neutral-900 to-black text-white',
        isExpanded && 'bg-gradient-to-b from-stone-900 to-neutral-900/90',
        disabled && 'opacity-55 pointer-events-none cursor-not-allowed',
        className
      )}
      style={
        {
          ['--tw-cult-accent' as string]: accent,
          ['--tw-cult-accent-soft' as string]: accentSoft,
        } as React.CSSProperties
      }
      data-expanded={isExpanded ? 'true' : 'false'}
      {...rest}
    >
      <div className="rounded-[23px] border border-black/10 overflow-hidden">
        <div className="rounded-[22px] border border-white/50 overflow-hidden">
          <div className="rounded-[21px] border border-neutral-950/20 flex items-center justify-center">
            <motion.div
              className={cn(
                'relative z-10 flex flex-col items-center gap-1 border border-white/10 shadow-lg text-white overflow-hidden',
                !isExpanded &&
                  'bg-gradient-to-b from-neutral-900 to-stone-900 cursor-pointer'
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
                    className="w-full h-full flex flex-col items-stretch justify-start overflow-auto p-3 pb-13"
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
                className="absolute z-20 flex items-center justify-center"
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
                    'appearance-none m-0 p-2.5 inline-flex items-center justify-center rounded-full border shadow-2xl transition-colors duration-200 outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    isExpanded
                      ? 'bg-neutral-800/55 border-[color-mix(in_srgb,var(--tw-cult-accent-soft)_35%,transparent)] text-[color-mix(in_srgb,var(--tw-cult-accent-soft)_45%,#fafafa)] hover:border-neutral-200 hover:text-neutral-100 hover:bg-neutral-900/75 focus-visible:outline-[var(--tw-cult-accent-soft)]'
                      : 'bg-neutral-200 border-[color-mix(in_srgb,var(--tw-cult-accent-soft)_15%,transparent)] text-neutral-950 hover:bg-neutral-100 hover:border-[var(--tw-cult-accent-soft)] focus-visible:outline-[var(--tw-cult-accent)]'
                  )}
                  onClick={toggleExpand}
                  onKeyDown={handleKeyDown}
                  disabled={disabled}
                  aria-label={label}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                >
                  <motion.span
                    className="inline-flex items-center justify-center leading-none"
                    layoutId={
                      prefersReducedMotion
                        ? undefined
                        : 'bemo-21st-cult-family-button-toggle-tw'
                    }
                    initial={false}
                    animate={{
                      rotate: isExpanded ? -360 : -180,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.4,
                    }}
                  >
                    {isExpanded ? (
                      <X className="size-7 shrink-0" aria-hidden="true" />
                    ) : (
                      <Plus
                        className="size-7 shrink-0 text-black"
                        aria-hidden="true"
                      />
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

/* Tailwind v4 keyframes (optional — framer-motion handles motion):
@keyframes bemo-cult-family-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
*/
