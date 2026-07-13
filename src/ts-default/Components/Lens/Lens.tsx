import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useMotionTemplate, useReducedMotion } from 'framer-motion';
import './Lens.css';

export interface Position {
  x: number;
  y: number;
}

export interface LensProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: Position;
  defaultPosition?: Position;
  isStatic?: boolean;
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

function clampZoom(value: number): number {
  if (!Number.isFinite(value) || value < 1) return 1.01;
  return value;
}

function clampSize(value: number): number {
  if (!Number.isFinite(value) || value < 1) return 1;
  return value;
}

export function Lens({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = '#1620E4',
  ariaLabel = 'Zoom Area',
  className = '',
  disabled = false,
  ...props
}: LensProps) {
  const safeZoom = clampZoom(zoomFactor);
  const safeSize = clampSize(lensSize);
  const prefersReducedMotion = useReducedMotion();
  const animDuration = prefersReducedMotion || disabled ? 0 : Math.max(0, Number(duration) || 0);

  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>(position);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = !disabled && (isHovering || isFocused);

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !active) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, active, mousePosition]);

  const handlePointerMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [disabled],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'Escape') {
        setIsHovering(false);
        setIsFocused(false);
        e.currentTarget.blur();
        return;
      }
      const step = 12;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePosition((prev) => {
        let x = prev.x;
        let y = prev.y;
        if (e.key === 'ArrowLeft') x = Math.max(0, prev.x - step);
        else if (e.key === 'ArrowRight') x = Math.min(rect.width, prev.x + step);
        else if (e.key === 'ArrowUp') y = Math.max(0, prev.y - step);
        else if (e.key === 'ArrowDown') y = Math.min(rect.height, prev.y + step);
        else return prev;
        e.preventDefault();
        return { x, y };
      });
    },
    [disabled],
  );

  useEffect(() => {
    if (disabled) {
      setIsHovering(false);
      setIsFocused(false);
    }
  }, [disabled]);

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    safeSize / 2
  }px at ${currentPosition.x}px ${
    currentPosition.y
  }px, ${lensColor} 99%, transparent 100%)`;

  const LensContent = useMemo(() => {
    const { x, y } = currentPosition;
    const overlayStyle = {
      maskImage,
      WebkitMaskImage: maskImage,
      transformOrigin: `${x}px ${y}px`,
    } as unknown as CSSProperties;

    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
        transition={{ duration: animDuration }}
        className="bemo-lens__overlay"
        style={overlayStyle}
        aria-hidden="true"
      >
        <div
          className="bemo-lens__zoom"
          style={{
            transform: `scale(${safeZoom})`,
            transformOrigin: `${x}px ${y}px`,
          }}
        >
          {children}
        </div>
      </motion.div>
    );
  }, [currentPosition, maskImage, safeZoom, children, animDuration, prefersReducedMotion]);

  const showLens = isStatic || Boolean(defaultPosition) || active;

  return (
    <div
      ref={containerRef}
      className={["bemo-lens", disabled ? 'bemo-lens--disabled' : '', className].filter(Boolean).join(' ')}
      onMouseEnter={() => !disabled && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handlePointerMove}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      <div className="bemo-lens__base">{children}</div>
      {isStatic || defaultPosition ? (
        showLens ? LensContent : null
      ) : (
        <AnimatePresence mode="popLayout">{active ? LensContent : null}</AnimatePresence>
      )}
    </div>
  );
}

export default Lens;
