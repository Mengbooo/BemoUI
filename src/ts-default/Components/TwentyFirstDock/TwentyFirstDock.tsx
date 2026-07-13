import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
  type SpringOptions,
  type HTMLMotionProps,
} from 'framer-motion';
import './TwentyFirstDock.css';

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;
const DEFAULT_SPRING: SpringOptions = { mass: 0.1, stiffness: 150, damping: 12 };

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export type DockProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

export type DockItemProps = {
  className?: string;
  children: ReactNode;
  onClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
  disabled?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'onClick'>;

export type DockLabelProps = {
  className?: string;
  children: ReactNode;
  isHovered?: MotionValue<number>;
  width?: MotionValue<number>;
};

export type DockIconProps = {
  className?: string;
  children: ReactNode;
  width?: MotionValue<number>;
  isHovered?: MotionValue<number>;
};

type DocContextType = {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  magnification: number;
  distance: number;
  prefersReducedMotion: React.MutableRefObject<boolean>;
};

type DockProviderProps = {
  children: ReactNode;
  value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock(): DocContextType {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
}

function TwentyFirstDock({
  children,
  className,
  spring = DEFAULT_SPRING,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
  ...rest
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4);
  }, [magnification]);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(
    heightRow,
    prefersReducedMotion.current ? { duration: 0 } : spring
  );

  return (
    <motion.div
      style={{
        height,
        scrollbarWidth: 'none',
      }}
      className={cn('bemo-21st-dock', className)}
      {...rest}
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          if (prefersReducedMotion.current) return;
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className="bemo-21st-dock__panel"
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider
          value={{ mouseX, spring, distance, magnification, prefersReducedMotion }}
        >
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, className, onClick, disabled = false, ...rest }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { distance, magnification, mouseX, spring, prefersReducedMotion } = useDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(
    widthTransform,
    prefersReducedMotion.current ? { duration: 0 } : spring
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => !disabled && isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => !disabled && isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        'bemo-21st-dock__item',
        disabled && 'bemo-21st-dock__item--disabled',
        className
      )}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-haspopup="true"
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement<DockLabelProps | DockIconProps>, {
          width,
          isHovered,
        })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const isHovered = rest.isHovered;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return undefined;
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn('bemo-21st-dock__label', className)}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const width = rest.width as MotionValue<number>;
  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('bemo-21st-dock__icon', className)}
    >
      {children}
    </motion.div>
  );
}

TwentyFirstDock.Item = DockItem;
TwentyFirstDock.Label = DockLabel;
TwentyFirstDock.Icon = DockIcon;

export { TwentyFirstDock, DockItem, DockLabel, DockIcon };
export default TwentyFirstDock;
