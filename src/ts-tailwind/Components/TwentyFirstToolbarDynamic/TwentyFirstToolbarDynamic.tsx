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
      className={`relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100 ${className}`}
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
        className={`relative inline-flex font-sans ${className}`}
        style={{
          ['--bemo-accent' as string]: accentColor,
          ['--bemo-accent-secondary' as string]: accentSecondary,
          ...style,
        }}
        ref={containerRef}
        role="toolbar"
        aria-label="Dynamic toolbar"
      >
        <div className="h-full w-full overflow-hidden rounded-xl border border-zinc-950/10 bg-white shadow-sm">
          <motion.div
            className="overflow-hidden"
            animate={{ width: isOpen ? openWidth : closedWidth }}
            initial={false}
            transition={motionTransition}
          >
            <div className="overflow-hidden p-2">
              <AnimatePresence mode="wait" initial={false}>
                {!isOpen ? (
                  <motion.div
                    key="closed"
                    className="flex w-full items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.12 }}
                  >
                    {showUserButton && (
                      <ToolbarButton disabled ariaLabel={userAriaLabel}>
                        <User className="h-5 w-5" size={20} strokeWidth={2} aria-hidden="true" />
                      </ToolbarButton>
                    )}
                    <ToolbarButton
                      onClick={handleOpen}
                      disabled={disabled}
                      ariaLabel={searchAriaLabel}
                    >
                      <Search className="h-5 w-5" size={20} strokeWidth={2} aria-hidden="true" />
                    </ToolbarButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    className="flex w-full items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.12 }}
                  >
                    <ToolbarButton onClick={handleClose} ariaLabel={backAriaLabel}>
                      <ArrowLeft className="h-5 w-5" size={20} strokeWidth={2} aria-hidden="true" />
                    </ToolbarButton>
                    <form
                      className="relative flex w-full min-w-0 flex-1 items-center"
                      onSubmit={handleSubmit}
                      role="search"
                    >
                      <label htmlFor="bemo-21st-toolbar-dynamic-tw-input" className="sr-only">
                        {placeholder}
                      </label>
                      <input
                        id="bemo-21st-toolbar-dynamic-tw-input"
                        ref={inputRef}
                        className="h-9 w-full rounded-lg border border-zinc-950/10 bg-transparent px-3 py-2 text-sm text-zinc-900 caret-[#1620E4] placeholder-zinc-500 transition-[border-color,box-shadow] focus:border-[#1620E4] focus:outline-none focus:ring-[3px] focus:ring-[#1620E4]/22 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
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

/* Tailwind v4 keyframes (optional):
@keyframes bemo-toolbar-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
*/
