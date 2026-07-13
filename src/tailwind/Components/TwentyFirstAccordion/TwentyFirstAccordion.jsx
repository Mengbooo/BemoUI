import React, {
  createContext,
  useContext,
  useState,
  useId,
} from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
    const newValue =
      type === 'multiple'
        ? expandedValue === value ? null : value
        : expandedValue === value ? (collapsible ? null : value) : value;
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
        className={`relative w-full flex flex-col ${className}`.trim()}
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
      className={`overflow-hidden border-b border-neutral-200 last:border-b-0 transition-colors ${isExpanded ? 'border-b-[#1620E4]/20' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`.trim()}
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
    <h3 className="m-0 p-0 text-inherit font-inherit">
      <button
        id={triggerId}
        type="button"
        className={`group flex w-full items-center justify-between gap-4 py-4 px-1 bg-transparent border-none cursor-pointer text-left font-inherit text-base font-medium leading-snug text-neutral-950 outline-none rounded-md transition-colors hover:text-[#1620E4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2 focus-visible:bg-[#1620E4]/[0.04] disabled:cursor-not-allowed disabled:opacity-60 ${isExpanded ? 'text-[#1620E4]' : ''} ${className}`.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        data-state={isExpanded ? 'open' : 'closed'}
        {...buttonProps}
      >
        <span className="flex-1 min-w-0">{children}</span>
        <span
          className={`inline-flex items-center justify-center shrink-0 w-5 h-5 text-neutral-500 transition-transform duration-250 ease-out group-hover:text-[#1620E4] ${isExpanded ? 'rotate-180 text-[#1620E4]' : ''}`}
          aria-hidden="true"
        >
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
          className={`overflow-hidden ${className}`.trim()}
          data-state="open"
        >
          <div className="px-1 pb-4 text-[0.9375rem] leading-relaxed text-neutral-600 [&>p]:m-0 [&>p]:mb-3 [&>p:last-child]:mb-0">
            {children}
          </div>
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

/* Tailwind v4 keyframes (if needed for custom animations):
@keyframes bemo-accordion-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}
@media (prefers-reduced-motion: reduce) {
  .group [class*="rotate-"] { transition: none !important; }
}
*/
