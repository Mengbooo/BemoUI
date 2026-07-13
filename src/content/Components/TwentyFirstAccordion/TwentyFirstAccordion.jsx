import React, {
  createContext,
  useContext,
  useState,
  useId,
} from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './TwentyFirstAccordion.css';

const AccordionContext = createContext(undefined);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion');
  }
  return context;
}

function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
  type = 'single',
  collapsible = true,
}) {
  const [internalExpandedValue, setInternalExpandedValue] = useState(null);

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue;

  const toggleItem = (value) => {
    let newValue;
    if (type === 'multiple') {
      // For multiple, treat as array - keep simple single for core
      newValue = expandedValue === value ? null : value;
    } else {
      newValue =
        expandedValue === value ? (collapsible ? null : value) : value;
    }
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
}) {
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

function TwentyFirstAccordionItem({ value, children, className = '', disabled = false, ...props }) {
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
          return React.cloneElement(child, {
            ...child.props,
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

function TwentyFirstAccordionTrigger({
  children,
  className = '',
  ...props
}) {
  const { toggleItem, expandedValue } = useAccordion();
  const value = props.value;
  const isExpanded = value === expandedValue;
  const disabled = props.disabled;
  const itemId = props.itemId;
  const triggerId = `${itemId}-trigger`;
  const contentId = `${itemId}-content`;
  const buttonProps = { ...props };
  delete buttonProps.value;
  delete buttonProps.expanded;
  delete buttonProps.itemId;

  const handleClick = () => {
    if (!disabled && value !== undefined) {
      toggleItem(value);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

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

function TwentyFirstAccordionContent({
  children,
  className = '',
  ...props
}) {
  const { expandedValue, variants } = useAccordion();
  const value = props.value;
  const isExpanded = value === expandedValue;
  const itemId = props.itemId;
  const contentId = `${itemId}-content`;
  const triggerId = `${itemId}-trigger`;

  const BASE_VARIANTS = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...(variants?.expanded || {}) },
    collapsed: { ...BASE_VARIANTS.collapsed, ...(variants?.collapsed || {}) },
  };

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
