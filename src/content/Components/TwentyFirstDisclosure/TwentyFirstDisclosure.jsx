/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useId, useEffect, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './TwentyFirstDisclosure.css';

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

  const value = {
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

function DisclosureTrigger({ children, className = '', asChild = false }) {
  const { toggle, open } = useDisclosure();
  const contentId = useId();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

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
      className: [className, childProps.className].filter(Boolean).join(' '),
      'data-state': open ? 'open' : 'closed',
    });
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

function DisclosureContent({ children, className = '' }) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const BASE_VARIANTS = {
    expanded: {
      height: 'auto',
      opacity: 1,
    },
    collapsed: {
      height: 0,
      opacity: 0,
    },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...(variants && variants.expanded) },
    collapsed: { ...BASE_VARIANTS.collapsed, ...(variants && variants.collapsed) },
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
  useDisclosure,
};

export default TwentyFirstDisclosure;
