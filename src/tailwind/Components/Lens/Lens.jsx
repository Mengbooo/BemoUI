import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useReducedMotion } from 'framer-motion';

function clampZoom(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1.01;
  return n;
}

function clampSize(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
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
}) {
  const safeZoom = clampZoom(zoomFactor);
  const safeSize = clampSize(lensSize);
  const prefersReducedMotion = useReducedMotion();
  const animDuration = prefersReducedMotion || disabled ? 0 : Math.max(0, Number(duration) || 0);

  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState(position);
  const containerRef = useRef(null);

  const active = !disabled && (isHovering || isFocused);

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !active) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, active, mousePosition]);

  const handlePointerMove = useCallback((e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [disabled]);

  const handleKeyDown = useCallback((e) => {
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
  }, [disabled]);

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
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
        transition={{ duration: animDuration }}
        className="absolute inset-0 z-50 overflow-hidden pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 will-change-transform"
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

  const showLens = isStatic || defaultPosition || active;

  return (
    <div
      ref={containerRef}
      className={
        [
          'relative z-20 overflow-hidden rounded-xl outline-none isolate',
          'focus-visible:ring-2 focus-visible:ring-[#1620E4] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          disabled ? 'cursor-not-allowed opacity-70 pointer-events-none' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')
      }
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
      <div className="relative z-0 block size-full">{children}</div>
      {isStatic || defaultPosition ? (
        showLens ? LensContent : null
      ) : (
        <AnimatePresence mode="popLayout">
          {active ? LensContent : null}
        </AnimatePresence>
      )}
    </div>
  );
}

export default Lens;

/*
Tailwind v4 global keyframes (add to your global CSS if you extend enter/exit animations):

@theme {
  --color-bemo-blue: #1620E4;
  --color-bemo-green: #7BE9C6;
}

/* No custom @keyframes required: enter/exit are driven by framer-motion.
   For CSS-only fallback fade, you may register:

@keyframes bemo-lens-in {
  from { opacity: 0; transform: scale(0.58); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes bemo-lens-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.8); }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
*/
