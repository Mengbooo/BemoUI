import React, {
  Children,
  cloneElement,
  useEffect,
  useState,
  useId,
  useCallback,
  type ReactElement,
  type ReactNode,
  type TransitionEvent,
} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion';
import './TwentyFirstAnimatedBackground.css';

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export type TwentyFirstAnimatedBackgroundProps = {
  children:
    | ReactElement<{ 'data-id': string; className?: string; children?: ReactNode; [key: string]: unknown }>
    | ReactElement<{ 'data-id': string; className?: string; children?: ReactNode; [key: string]: unknown }>[];
  defaultValue?: string;
  value?: string | null;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
  disabled?: boolean;
};

export function TwentyFirstAnimatedBackground({
  children,
  defaultValue,
  value,
  onValueChange,
  className = '',
  transition,
  enableHover = false,
  disabled = false,
}: TwentyFirstAnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(value ?? defaultValue ?? null);
  const uniqueId = useId();
  const shouldReduceMotion = useReducedMotion();

  const handleSetActiveId = useCallback(
    (id: string | null) => {
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

  const defaultTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : transition || { type: 'spring', stiffness: 300, damping: 30 };

  return Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const id = (child.props as { 'data-id'?: string })['data-id'];
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
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSetActiveId(id);
            }
          },
        };

    const childClassName = cn(
      'bemo-21st-animated-background-item',
      isActive && 'bemo-21st-animated-background-item--active',
      disabled && 'bemo-21st-animated-background-item--disabled',
      (child.props as { className?: string }).className
    );

    return cloneElement(
      child as ReactElement,
      {
        key: child.key ?? index,
        className: childClassName,
        'data-checked': isActive ? 'true' : 'false',
        'aria-pressed': !enableHover ? isActive : undefined,
        role: !enableHover ? 'button' : (child.props as { role?: string }).role,
        tabIndex: disabled ? -1 : (child.props as { tabIndex?: number }).tabIndex ?? 0,
        ...interactionProps,
        disabled: disabled || (child.props as { disabled?: boolean }).disabled,
      },
      <>
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              layoutId={`bemo-21st-bg-${uniqueId}`}
              className={cn('bemo-21st-animated-background-bg', className)}
              transition={defaultTransition}
              initial={{ opacity: defaultValue || value ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        <div className="bemo-21st-animated-background-content">
          {(child.props as { children?: ReactNode }).children}
        </div>
      </>
    );
  });
}

export default TwentyFirstAnimatedBackground;
