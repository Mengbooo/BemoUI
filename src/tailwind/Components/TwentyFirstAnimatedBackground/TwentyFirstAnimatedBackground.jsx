import React, {
  Children,
  cloneElement,
  useEffect,
  useState,
  useId,
  useCallback,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function TwentyFirstAnimatedBackground({
  children,
  defaultValue,
  value,
  onValueChange,
  className = '',
  transition,
  enableHover = false,
  disabled = false,
}) {
  const [activeId, setActiveId] = useState(value ?? defaultValue ?? null);
  const uniqueId = useId();
  const shouldReduceMotion = useReducedMotion();

  const handleSetActiveId = useCallback(
    (id) => {
      if (disabled) return;
      setActiveId(id);
      if (onValueChange) {
        onValueChange(id);
      }
    },
    [disabled, onValueChange]
  );

  useEffect(() => {
    if (value !== undefined) {
      setActiveId(value);
    }
  }, [value]);

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue, value]);

  const defaultTransition = shouldReduceMotion
    ? { duration: 0 }
    : transition || { type: 'spring', stiffness: 300, damping: 30 };

  return Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const id = child.props['data-id'];
    if (id == null) return child;

    const isActive = activeId === id;

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
          onFocus: () => handleSetActiveId(id),
          onBlur: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSetActiveId(id);
            }
          },
        };

    const childClassName = cn(
      'relative inline-flex items-center justify-center cursor-pointer outline-none border-none bg-transparent text-neutral-900 transition-colors duration-200',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 focus-visible:rounded-lg',
      isActive && 'text-neutral-950',
      disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
      child.props.className
    );

    return cloneElement(
      child,
      {
        key: child.key ?? index,
        className: childClassName,
        'data-checked': isActive ? 'true' : 'false',
        'aria-pressed': !enableHover ? isActive : undefined,
        role: !enableHover ? 'button' : child.props.role,
        tabIndex: disabled ? -1 : child.props.tabIndex ?? 0,
        ...interactionProps,
        disabled: disabled || child.props.disabled,
      },
      <>
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              layoutId={`bemo-21st-bg-${uniqueId}`}
              className={cn(
                'absolute inset-0 z-0 rounded-lg bg-[#1620E4] pointer-events-none',
                className
              )}
              transition={defaultTransition}
              initial={{ opacity: defaultValue || value ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        <div className="relative z-10 inline-flex items-center gap-2">{child.props.children}</div>
      </>
    );
  });
}

export default TwentyFirstAnimatedBackground;

/* Tailwind v4 keyframes (if needed for custom transitions):
@keyframes bemo-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
*/
