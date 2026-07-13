import React, {
  useEffect,
  useRef,
  useState,
  useId,
  type ReactNode,
  type ComponentType,
  type SVGProps,
  type HTMLAttributes,
} from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { Folder, MessageCircle, User, WalletCards } from 'lucide-react';

const DEFAULT_TRANSITION = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.25,
};

export type ToolbarExpandableItem = {
  id: number | string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title?: ReactNode;
  content: ReactNode;
};

export type TwentyFirstToolbarExpandableProps = HTMLAttributes<HTMLDivElement> & {
  items?: ToolbarExpandableItem[];
  defaultActive?: number | string | null;
  defaultOpen?: boolean;
  onActiveChange?: (id: number | string | null) => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  accentColor?: string;
  secondaryColor?: string;
  disabled?: boolean;
};

const DEFAULT_ITEMS: ToolbarExpandableItem[] = [
  {
    id: 1,
    label: 'User',
    icon: User,
    content: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-zinc-800">
          <div
            className="h-8 w-8 rounded-full bg-linear-to-br from-[#1620E4] to-[#7BE9C6]"
            aria-hidden="true"
          />
          <span>Ibelick</span>
        </div>
        <button
          type="button"
          className="relative flex h-8 w-full select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
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
      <div className="flex flex-col gap-4">
        <div className="text-zinc-800">You have 3 new messages.</div>
        <button
          type="button"
          className="relative flex h-8 w-full select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-zinc-800">
          <div>Project_Proposal.pdf</div>
          <div>Meeting_Notes.docx</div>
          <div>Financial_Report.xls</div>
        </div>
        <button
          type="button"
          className="relative flex h-8 w-full select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col text-zinc-800">
          <span>Current Balance</span>
          <span className="font-semibold text-[#1620E4]">$1,250.32</span>
        </div>
        <button
          type="button"
          className="relative flex h-8 w-full select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          View Transactions
        </button>
      </div>
    ),
  },
];

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
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

function useMeasure(): [
  (node: HTMLElement | null) => void,
  { width: number; height: number }
] {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

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

function cn(...classes: Array<string | false | null | undefined>): string {
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
}: TwentyFirstToolbarExpandableProps) {
  const [active, setActive] = useState<number | string | null>(defaultActive);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();
  const panelId = `${baseId}-panel`;

  const transition = prefersReducedMotion ? { duration: 0 } : DEFAULT_TRANSITION;

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
    const onKeyDown = (e: KeyboardEvent) => {
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

  const handleItemClick = (itemId: number | string) => {
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

  return (
    <MotionConfig transition={transition}>
      <div
        className={cn('relative inline-flex font-sans text-zinc-600', className)}
        ref={containerRef}
        style={
          {
            '--bemo-21st-accent': accentColor,
            '--bemo-21st-secondary': secondaryColor,
          } as React.CSSProperties
        }
        data-open={isOpen ? 'true' : 'false'}
        data-disabled={disabled ? 'true' : 'false'}
        {...rest}
      >
        <div
          className={cn(
            'h-full w-full overflow-hidden rounded-xl border border-zinc-950/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]',
            disabled && 'pointer-events-none opacity-60'
          )}
        >
          <div className="overflow-hidden">
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
                  className="overflow-hidden"
                >
                  <div ref={contentRef} className="p-2">
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
                          <div className="px-2 pt-2 text-sm">{item.content}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div
            className="flex gap-2 p-2 max-sm:gap-1 max-sm:p-1.5"
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
                    'relative flex h-9 w-9 shrink-0 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1620E4] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 max-sm:h-8 max-sm:w-8 motion-reduce:transition-none motion-reduce:active:scale-100',
                    isActive && 'bg-zinc-100 text-zinc-800'
                  )}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.title ? (
                    item.title
                  ) : Icon ? (
                    <Icon className="h-5 w-5 max-sm:h-[1.125rem] max-sm:w-[1.125rem]" aria-hidden="true" />
                  ) : null}
                  {isActive ? (
                    <span
                      className="absolute bottom-[0.2rem] left-1/2 h-[0.35rem] w-[0.35rem] -translate-x-1/2 rounded-full"
                      aria-hidden="true"
                      style={{ backgroundColor: accentColor }}
                    />
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

/* Tailwind v4 keyframes (none required beyond framer-motion; reduced-motion handled via motion-reduce utilities and useReducedMotion) */
