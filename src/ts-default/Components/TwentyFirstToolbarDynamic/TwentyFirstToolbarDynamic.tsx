import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { motion, MotionConfig, AnimatePresence, type Transition } from 'framer-motion';
import { ArrowLeft, Search, User } from 'lucide-react';
import './TwentyFirstToolbarDynamic.css';

const defaultTransition: Transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.2,
};

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
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

interface ToolbarButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

function ToolbarButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  className = '',
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={`bemo-21st-toolbar-dynamic-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export interface TwentyFirstToolbarDynamicProps {
  className?: string;
  style?: CSSProperties;
  closedWidth?: number;
  openWidth?: number;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onOpenChange?: (open: boolean) => void;
  initialOpen?: boolean;
  disabled?: boolean;
  showUserButton?: boolean;
  userAriaLabel?: string;
  searchAriaLabel?: string;
  backAriaLabel?: string;
  transition?: Transition;
  accentColor?: string;
  accentSecondary?: string;
}

export function TwentyFirstToolbarDynamic({
  className = '',
  style,
  closedWidth = 98,
  openWidth = 300,
  placeholder = 'Search notes',
  onSearch,
  onOpenChange,
  initialOpen = false,
  disabled = false,
  showUserButton = true,
  userAriaLabel = 'User profile',
  searchAriaLabel = 'Search notes',
  backAriaLabel = 'Back',
  transition = defaultTransition,
  accentColor = '#1620E4',
  accentSecondary = '#7BE9C6',
}: TwentyFirstToolbarDynamicProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    onOpenChange?.(true);
  }, [disabled, onOpenChange]);

  useClickOutside(containerRef, () => {
    if (isOpen) handleClose();
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const id = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const motionTransition: Transition = reducedMotion
    ? { duration: 0 }
    : transition;

  return (
    <MotionConfig transition={motionTransition}>
      <div
        className={`bemo-21st-toolbar-dynamic-root ${className}`}
        style={{
          ['--bemo-accent' as string]: accentColor,
          ['--bemo-accent-secondary' as string]: accentSecondary,
          ...style,
        }}
        ref={containerRef}
        role="toolbar"
        aria-label="Dynamic toolbar"
      >
        <div className="bemo-21st-toolbar-dynamic-shell">
          <motion.div
            className="bemo-21st-toolbar-dynamic-inner"
            animate={{
              width: isOpen ? openWidth : closedWidth,
            }}
            initial={false}
            transition={motionTransition}
          >
            <div className="bemo-21st-toolbar-dynamic-content">
              <AnimatePresence mode="wait" initial={false}>
                {!isOpen ? (
                  <motion.div
                    key="closed"
                    className="bemo-21st-toolbar-dynamic-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.12 }}
                  >
                    {showUserButton && (
                      <ToolbarButton disabled ariaLabel={userAriaLabel}>
                        <User
                          className="bemo-21st-toolbar-dynamic-icon"
                          size={20}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </ToolbarButton>
                    )}
                    <ToolbarButton
                      onClick={handleOpen}
                      disabled={disabled}
                      ariaLabel={searchAriaLabel}
                    >
                      <Search
                        className="bemo-21st-toolbar-dynamic-icon"
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </ToolbarButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    className="bemo-21st-toolbar-dynamic-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.12 }}
                  >
                    <ToolbarButton onClick={handleClose} ariaLabel={backAriaLabel}>
                      <ArrowLeft
                        className="bemo-21st-toolbar-dynamic-icon"
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </ToolbarButton>
                    <form
                      className="bemo-21st-toolbar-dynamic-form"
                      onSubmit={handleSubmit}
                      role="search"
                    >
                      <label
                        htmlFor="bemo-21st-toolbar-dynamic-input"
                        className="bemo-21st-toolbar-dynamic-sr-only"
                      >
                        {placeholder}
                      </label>
                      <input
                        id="bemo-21st-toolbar-dynamic-input"
                        ref={inputRef}
                        className="bemo-21st-toolbar-dynamic-input"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        autoComplete="off"
                        aria-label={placeholder}
                        disabled={disabled}
                      />
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default TwentyFirstToolbarDynamic;
