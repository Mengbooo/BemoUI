import React, {
  createContext,
  useContext,
  useState,
  useId,
  ReactNode,
  Key,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type HTMLMotionProps,
  Transition,
  Variants,
  Variant,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './TwentyFirstAccordion.css';

export type AccordionContextType = {
  expandedValue: Key | null;
  toggleItem: (value: Key) => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordion(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion');
  }
  return context;
}

export type AccordionProviderProps = {
  children: ReactNode;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: Key | null;
  onValueChange?: (value: Key | null) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
};

function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
  type = 'single',
  collapsible = true,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] =
    useState<Key | null>(null);

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue;

  const toggleItem = (value: Key) => {
    const newValue =
      expandedValue === value ? (collapsible ? null : value) : value;
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalExpandedValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedValue, toggleItem, variants }}>
      {children}
    </AccordionContext.Provider>
  );
}

export type TwentyFirstAccordionProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: Key | null;
  onValueChange?: (value: Key | null) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function TwentyFirstAccordion({
  children,
  className = '',
  transition = { type: 'spring', stiffness: 300, damping: 30 },
  variants,
  expandedValue,
  onValueChange,
  type = 'single',
  collapsible = true,
  ...props
}: TwentyFirstAccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div
        className={`bemo-21st-accordion ${className}`.trim()}
        aria-orientation="vertical"
        {...props}
      >
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          onValueChange={onValueChange}
          type={type}
          collapsible={collapsible}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

export type TwentyFirstAccordionItemProps = {
  value: Key;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function TwentyFirstAccordionItem({
  value,
  children,
  className = '',
  disabled = false,
  ...props
}: TwentyFirstAccordionItemProps) {
  const { expandedValue } = useAccordion();
  const isExpanded = value === expandedValue;
  const itemId = useId();

  return (
    <div
      className={`bemo-21st-accordion-item ${isExpanded ? 'bemo-21st-accordion-item--expanded' : 'bemo-21st-accordion-item--collapsed'} ${disabled ? 'bemo-21st-accordion-item--disabled' : ''} ${className}`.trim()}
      data-state={isExpanded ? 'open' : 'closed'}
      data-disabled={disabled || undefined}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            ...(child.props as object),
            value,
            expanded: isExpanded,
            disabled,
            itemId,
          });
        }
        return child;
      })}
    </div>
  );
}

export type TwentyFirstAccordionTriggerProps = {
  children: ReactNode;
  className?: string;
  value?: Key;
  expanded?: boolean;
  disabled?: boolean;
  itemId?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function TwentyFirstAccordionTrigger({
  children,
  className = '',
  ...props
}: TwentyFirstAccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion();
  const value = props.value;
  const isExpanded = value === expandedValue;
  const disabled = props.disabled;
  const itemId = props.itemId;
  const triggerId = `${itemId}-trigger`;
  const contentId = `${itemId}-content`;

  const handleClick = () => {
    if (!disabled && value !== undefined) {
      toggleItem(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Strip internal props before spreading to DOM
  const {
    value: _v,
    expanded: _e,
    itemId: _i,
    ...buttonProps
  } = props;

  return (
    <h3 className="bemo-21st-accordion-heading">
      <button
        id={triggerId}
        type="button"
        className={`bemo-21st-accordion-trigger ${isExpanded ? 'bemo-21st-accordion-trigger--expanded' : ''} ${disabled ? 'bemo-21st-accordion-trigger--disabled' : ''} ${className}`.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        data-state={isExpanded ? 'open' : 'closed'}
        {...buttonProps}
      >
        <span className="bemo-21st-accordion-trigger-content">{children}</span>
        <span className="bemo-21st-accordion-icon" aria-hidden="true">
          <ChevronDown size={18} strokeWidth={2} />
        </span>
      </button>
    </h3>
  );
}

export type TwentyFirstAccordionContentProps = {
  children: ReactNode;
  className?: string;
  value?: Key;
  expanded?: boolean;
  itemId?: string;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

function TwentyFirstAccordionContent({
  children,
  className = '',
  ...props
}: TwentyFirstAccordionContentProps) {
  const { expandedValue, variants } = useAccordion();
  const value = props.value;
  const isExpanded = value === expandedValue;
  const itemId = props.itemId;
  const contentId = `${itemId}-content`;
  const triggerId = `${itemId}-trigger`;

  const BASE_VARIANTS: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...(variants?.expanded || {}) },
    collapsed: { ...BASE_VARIANTS.collapsed, ...(variants?.collapsed || {}) },
  };

  const {
    value: _v,
    expanded: _e,
    itemId: _i,
    ...divProps
  } = props;

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={combinedVariants}
          className={`bemo-21st-accordion-content ${className}`.trim()}
          data-state="open"
          {...divProps}
        >
          <div className="bemo-21st-accordion-content-inner">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

TwentyFirstAccordion.Item = TwentyFirstAccordionItem;
TwentyFirstAccordion.Trigger = TwentyFirstAccordionTrigger;
TwentyFirstAccordion.Content = TwentyFirstAccordionContent;

export {
  TwentyFirstAccordion,
  TwentyFirstAccordionItem,
  TwentyFirstAccordionTrigger,
  TwentyFirstAccordionContent,
};
export default TwentyFirstAccordion;
