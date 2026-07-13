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

  const baseTrigger =
    'flex w-full items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left text-[0.9375rem] sm:text-base font-semibold leading-snug text-neutral-900 bg-transparent border-0 cursor-pointer appearance-none transition-colors hover:bg-[#1620E4]/[0.04] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:-outline-offset-2 focus-visible:bg-[#1620E4]/[0.06] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

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
      className: [baseTrigger, className, childProps.className as string | undefined]
        .filter(Boolean)
        .join(' '),
      'data-state': open ? 'open' : 'closed',
    } as Partial<unknown>);
  }

  return (
    <button
      type="button"
      className={[baseTrigger, className].filter(Boolean).join(' ')}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      aria-expanded={open}
      aria-controls={contentId}
      data-state={open ? 'open' : 'closed'}
    >
      <span className="min-w-0 flex-1">{children}</span>
      <ChevronDown
        className={`size-[18px] shrink-0 text-neutral-500 transition-transform duration-250 ease-out motion-reduce:transition-none ${open ? 'rotate-180 text-[#1620E4]' : ''}`}
        aria-hidden="true"
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
    <div className={`overflow-hidden ${className}`.trim()}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={uniqueId}
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={combinedVariants}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm sm:text-[0.9375rem] leading-relaxed text-neutral-500">
              {children}
            </div>
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

  const openStyles = openProp
    ? 'border-[#1620E4]/30 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(22,32,228,0.08),inset_3px_0_0_0_#7BE9C6] '
    : '';

  return (
    <MotionConfig transition={transition}>
      <div
        className={
          `w-full max-w-full overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] font-sans ${openStyles}${className}`
        }
        data-state={openProp ? 'open' : 'closed'}
        {...rest}
      >
        <DisclosureProvider open={openProp} onOpenChange={onOpenChange} variants={variants}>
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

/* Tailwind v4 keyframes / utilities note:
   Chevron rotation uses transform + duration-250.
   Framer Motion handles height/opacity expand/collapse.
   prefers-reduced-motion: motion-reduce:transition-none on chevron.
   Accents: #1620E4 primary, #7BE9C6 soft inset.
*/
