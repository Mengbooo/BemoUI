import React, {
  createContext,
  useContext,
  useState,
  useId,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  type TransitionEvent,
} from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
  type Variant,
  type Variants,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './TwentyFirstDisclosure.css';

export type DisclosureVariants = {
  expanded?: Variant;
  collapsed?: Variant;
};

export type DisclosureContextType = {
  open: boolean;
  toggle: () => void;
  variants?: DisclosureVariants;
};

const DisclosureContext = createContext<DisclosureContextType | undefined>(undefined);

export function useDisclosure(): DisclosureContextType {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a TwentyFirstDisclosure');
  }
  return context;
}

export type DisclosureProviderProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: DisclosureVariants;
};

function DisclosureProvider({
  children,
  open: openProp,
  onOpenChange,
  variants,
}: DisclosureProviderProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(Boolean(openProp));

  useEffect(() => {
    setInternalOpen(Boolean(openProp));
  }, [openProp]);

  const toggle = useCallback(() => {
    setInternalOpen((prev) => {
      const next = !prev;
      if (typeof onOpenChange === 'function') {
        onOpenChange(next);
      }
      return next;
    });
  }, [onOpenChange]);

  const value: DisclosureContextType = {
    open: internalOpen,
    toggle,
    variants,
  };

  return (
    <DisclosureContext.Provider value={value}>
      {children}
    </DisclosureContext.Provider>
  );
}

export type DisclosureTriggerProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

function DisclosureTrigger({ children, className = '', asChild = false }: DisclosureTriggerProps) {
  const { toggle, open } = useDisclosure();
  const contentId = useId();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = (child.props || {}) as Record<string, unknown>;
    return React.cloneElement(child, {
      ...childProps,
      onClick: (e: React.MouseEvent) => {
        if (typeof childProps.onClick === 'function') {
          (childProps.onClick as (ev: React.MouseEvent) => void)(e);
        }
        toggle();
      },
      onKeyDown: (e: KeyboardEvent) => {
        if (typeof childProps.onKeyDown === 'function') {
          (childProps.onKeyDown as (ev: KeyboardEvent) => void)(e);
        }
        handleKeyDown(e);
      },
      role: (childProps.role as string) || 'button',
      'aria-expanded': open,
      'aria-controls': contentId,
      tabIndex: childProps.tabIndex !== undefined ? (childProps.tabIndex as number) : 0,
      className: [className, childProps.className as string | undefined].filter(Boolean).join(' '),
      'data-state': open ? 'open' : 'closed',
    } as Partial<unknown>);
  }

  return (
    <button
      type="button"
      className={`bemo-21st-disclosure-trigger ${className}`.trim()}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      aria-expanded={open}
      aria-controls={contentId}
      data-state={open ? 'open' : 'closed'}
    >
      <span className="bemo-21st-disclosure-trigger-content">{children}</span>
      <ChevronDown
        className="bemo-21st-disclosure-chevron"
        aria-hidden="true"
        size={18}
        strokeWidth={2}
      />
    </button>
  );
}

export type DisclosureContentProps = {
  children: ReactNode;
  className?: string;
};

function DisclosureContent({ children, className = '' }: DisclosureContentProps) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const BASE_VARIANTS: Variants = {
    expanded: {
      height: 'auto',
      opacity: 1,
    },
    collapsed: {
      height: 0,
      opacity: 0,
    },
  };

  const combinedVariants: Variants = {
    expanded: { ...BASE_VARIANTS.expanded, ...(variants?.expanded as object) },
    collapsed: { ...BASE_VARIANTS.collapsed, ...(variants?.collapsed as object) },
  };

  return (
    <div className={`bemo-21st-disclosure-content-wrapper ${className}`.trim()}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={uniqueId}
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={combinedVariants}
            className="bemo-21st-disclosure-content-inner"
          >
            <div className="bemo-21st-disclosure-content-body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type TwentyFirstDisclosureProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  variants?: DisclosureVariants;
  transition?: Transition;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

function TwentyFirstDisclosure({
  open: openProp = false,
  onOpenChange,
  children,
  className = '',
  variants,
  transition = { type: 'spring', stiffness: 300, damping: 30 },
  ...rest
}: TwentyFirstDisclosureProps) {
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray[1];

  return (
    <MotionConfig transition={transition}>
      <div
        className={`bemo-21st-disclosure ${className}`.trim()}
        data-state={openProp ? 'open' : 'closed'}
        {...rest}
      >
        <DisclosureProvider
          open={openProp}
          onOpenChange={onOpenChange}
          variants={variants}
        >
          {trigger}
          {content}
        </DisclosureProvider>
      </div>
    </MotionConfig>
  );
}

TwentyFirstDisclosure.Trigger = DisclosureTrigger;
TwentyFirstDisclosure.Content = DisclosureContent;
TwentyFirstDisclosure.Provider = DisclosureProvider;
TwentyFirstDisclosure.useDisclosure = useDisclosure;

export {
  TwentyFirstDisclosure,
  DisclosureProvider,
  DisclosureTrigger,
  DisclosureContent,
};

export default TwentyFirstDisclosure;
