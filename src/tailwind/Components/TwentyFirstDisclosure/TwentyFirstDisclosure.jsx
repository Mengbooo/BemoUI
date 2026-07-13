/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useId, useEffect, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DisclosureContext = createContext(undefined);

function useDisclosure() {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a TwentyFirstDisclosure');
  }
  return context;
}

function DisclosureProvider({ children, open: openProp, onOpenChange, variants }) {
  const [internalOpen, setInternalOpen] = useState(Boolean(openProp));

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

  return (
    <DisclosureContext.Provider value={{ open: internalOpen, toggle, variants }}>
      {children}
    </DisclosureContext.Provider>
  );
}

function DisclosureTrigger({ children, className = '', asChild = false }) {
  const { toggle, open } = useDisclosure();
  const contentId = useId();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const baseTrigger =
    'flex w-full items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left text-[0.9375rem] sm:text-base font-semibold leading-snug text-neutral-900 bg-transparent border-0 cursor-pointer appearance-none transition-colors hover:bg-[#1620E4]/[0.04] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:-outline-offset-2 focus-visible:bg-[#1620E4]/[0.06] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  if (asChild && React.isValidElement(children)) {
    const child = children;
    const childProps = child.props || {};
    return React.cloneElement(child, {
      ...childProps,
      onClick: (e) => {
        if (typeof childProps.onClick === 'function') childProps.onClick(e);
        toggle();
      },
      onKeyDown: (e) => {
        if (typeof childProps.onKeyDown === 'function') childProps.onKeyDown(e);
        handleKeyDown(e);
      },
      role: childProps.role || 'button',
      'aria-expanded': open,
      'aria-controls': contentId,
      tabIndex: childProps.tabIndex !== undefined ? childProps.tabIndex : 0,
      className: [baseTrigger, className, childProps.className].filter(Boolean).join(' '),
      'data-state': open ? 'open' : 'closed',
    });
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

function DisclosureContent({ children, className = '' }) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const BASE_VARIANTS = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...(variants && variants.expanded) },
    collapsed: { ...BASE_VARIANTS.collapsed, ...(variants && variants.collapsed) },
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

function TwentyFirstDisclosure({
  open: openProp = false,
  onOpenChange,
  children,
  className = '',
  variants,
  transition = { type: 'spring', stiffness: 300, damping: 30 },
  ...rest
}) {
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray[1];

  return (
    <MotionConfig transition={transition}>
      <div
        className={
          `w-full max-w-full overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] font-sans ` +
          (openProp
            ? 'border-[#1620E4]/30 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(22,32,228,0.08),inset_3px_0_0_0_#7BE9C6] '
            : '') +
          className
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
  useDisclosure,
};

export default TwentyFirstDisclosure;

/* Tailwind v4 keyframes / utilities note:
   Chevron rotation uses transform + duration-250.
   Framer Motion handles height/opacity expand/collapse.
   prefers-reduced-motion: motion-reduce:transition-none is applied to chevron.
   Accent colors: #1620E4 (primary), #7BE9C6 (soft inset).
*/
