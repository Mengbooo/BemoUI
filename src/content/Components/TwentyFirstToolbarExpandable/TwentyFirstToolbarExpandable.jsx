/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, useId } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { Folder, MessageCircle, User, WalletCards } from 'lucide-react';
import './TwentyFirstToolbarExpandable.css';

const DEFAULT_TRANSITION = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

const DEFAULT_ITEMS = [
  {
    id: 1,
    label: 'User',
    icon: User,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-user">
          <div className="bemo-21st-toolbar-expandable-avatar" aria-hidden="true" />
          <span>Ibelick</span>
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          Edit Profile
        </button>
      </div>
    ),
  },
  {
    id: 2,
    label: 'Messages',
    icon: MessageCircle,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-text">You have 3 new messages.</div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          View more
        </button>
      </div>
    ),
  },
  {
    id: 3,
    label: 'Documents',
    icon: Folder,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-list">
          <div>Project_Proposal.pdf</div>
          <div>Meeting_Notes.docx</div>
          <div>Financial_Report.xls</div>
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          Manage documents
        </button>
      </div>
    ),
  },
  {
    id: 4,
    label: 'Wallet',
    icon: WalletCards,
    content: (
      <div className="bemo-21st-toolbar-expandable-panel-inner">
        <div className="bemo-21st-toolbar-expandable-balance">
          <span>Current Balance</span>
          <span className="bemo-21st-toolbar-expandable-amount">$1,250.32</span>
        </div>
        <button type="button" className="bemo-21st-toolbar-expandable-action">
          View Transactions
        </button>
      </div>
    ),
  },
];

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function useMeasure() {
  const [node, setNode] = useState(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const observerRef = useRef(null);

  useEffect(() => {
    if (!node) return undefined;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    measure();

    if (typeof ResizeObserver !== 'undefined') {
      observerRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          const { width, height } = entry.contentRect;
          setBounds({ width, height });
        }
      });
      observerRef.current.observe(node);
    } else {
      window.addEventListener('resize', measure);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      } else {
        window.removeEventListener('resize', measure);
      }
    };
  }, [node]);

  return [setNode, bounds];
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TwentyFirstToolbarExpandable({
  items = DEFAULT_ITEMS,
  defaultActive = null,
  defaultOpen = false,
  onActiveChange,
  onOpenChange,
  className = '',
  accentColor = '#1620E4',
  secondaryColor = '#7BE9C6',
  disabled = false,
  ...rest
}) {
  const [active, setActive] = useState(defaultActive);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const containerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();
  const panelId = `${baseId}-panel`;

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : DEFAULT_TRANSITION;

  useClickOutside(containerRef, () => {
    if (disabled) return;
    setIsOpen(false);
    setActive(null);
    onOpenChange?.(false);
    onActiveChange?.(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !disabled) {
        setIsOpen(false);
        setActive(null);
        onOpenChange?.(false);
        onActiveChange?.(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, disabled, onOpenChange, onActiveChange]);

  const handleItemClick = (itemId) => {
    if (disabled) return;
    if (!isOpen) {
      setIsOpen(true);
      onOpenChange?.(true);
    }
    if (active === itemId) {
      setIsOpen(false);
      setActive(null);
      onOpenChange?.(false);
      onActiveChange?.(null);
      return;
    }
    setActive(itemId);
    onActiveChange?.(itemId);
  };

  const styleVars = {
    '--bemo-21st-accent': accentColor,
    '--bemo-21st-secondary': secondaryColor,
  };

  return (
    <MotionConfig transition={transition}>
      <div
        className={cn('bemo-21st-toolbar-expandable', className)}
        ref={containerRef}
        style={styleVars}
        data-open={isOpen ? 'true' : 'false'}
        data-disabled={disabled ? 'true' : 'false'}
        {...rest}
      >
        <div className="bemo-21st-toolbar-expandable-shell">
          <div className="bemo-21st-toolbar-expandable-overflow">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-live="polite"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{ width: maxWidth || '100%' }}
                  className="bemo-21st-toolbar-expandable-content-wrap"
                >
                  <div ref={contentRef} className="bemo-21st-toolbar-expandable-content">
                    {items.map((item) => {
                      const isSelected = active === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                          style={{ display: isSelected ? 'block' : 'none' }}
                          aria-hidden={!isSelected}
                        >
                          <div className="bemo-21st-toolbar-expandable-panel">
                            {item.content}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div
            className="bemo-21st-toolbar-expandable-menu"
            ref={menuRef}
            role="toolbar"
            aria-label="Expandable toolbar"
          >
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              const btnId = `${baseId}-tab-${item.id}`;
              return (
                <button
                  key={item.id}
                  id={btnId}
                  type="button"
                  aria-label={item.label}
                  aria-expanded={isOpen && isActive}
                  aria-controls={isOpen && isActive ? panelId : undefined}
                  aria-pressed={isActive}
                  disabled={disabled}
                  className={cn(
                    'bemo-21st-toolbar-expandable-btn',
                    isActive && 'bemo-21st-toolbar-expandable-btn--active'
                  )}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.title ? (
                    item.title
                  ) : Icon ? (
                    <Icon className="bemo-21st-toolbar-expandable-icon" aria-hidden="true" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export { DEFAULT_ITEMS };
