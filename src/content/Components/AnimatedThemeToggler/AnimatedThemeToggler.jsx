import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './AnimatedThemeToggler.css';

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function polygonCollapsed(cx, cy, vertexCount) {
  const pairs = Array.from({ length: vertexCount }, () => `${cx}px ${cy}px`).join(', ');
  return `polygon(${pairs})`;
}

function getThemeTransitionClipPaths(variant, cx, cy, maxRadius, viewportWidth, viewportHeight) {
  switch (variant) {
    case 'circle':
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`];
    case 'square': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        `${cx - halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy + halfSide}px`,
        `${cx - halfSide}px ${cy + halfSide}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case 'triangle': {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        `${cx}px ${cy - scale}px`,
        `${cx + dx}px ${cy + 0.5 * scale}px`,
        `${cx - dx}px ${cy + 0.5 * scale}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 3), `polygon(${verts})`];
    }
    case 'diamond': {
      const R = maxRadius * Math.SQRT2;
      const end = [
        `${cx}px ${cy - R}px`,
        `${cx + R}px ${cy}px`,
        `${cx}px ${cy + R}px`,
        `${cx - R}px ${cy}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case 'hexagon': {
      const R = maxRadius * Math.SQRT2;
      const verts = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(`${cx + R * Math.cos(a)}px ${cy + R * Math.sin(a)}px`);
      }
      return [polygonCollapsed(cx, cy, 6), `polygon(${verts.join(', ')})`];
    }
    case 'rectangle': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        `${cx - halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy + halfH}px`,
        `${cx - halfW}px ${cy + halfH}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case 'star': {
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius) => {
        const verts = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(`${cx + radius * Math.cos(outerA)}px ${cy + radius * Math.sin(outerA)}px`);
          const innerA = outerA + Math.PI / 5;
          verts.push(
            `${cx + radius * innerRatio * Math.cos(innerA)}px ${cy + radius * innerRatio * Math.sin(innerA)}px`
          );
        }
        return `polygon(${verts.join(', ')})`;
      };
      const startR = Math.max(2, R * 0.025);
      return [starPolygon(startR), starPolygon(R)];
    }
    default:
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`];
  }
}

function MoonIcon() {
  return (
    <svg className="bemo-animated-theme-toggler__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3c0-.3 0-.6.05-.9A9.5 9.5 0 1 0 21.9 14.45c-.3.03-.6.05-.9.05Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="bemo-animated-theme-toggler__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        fill="currentColor"
        d="M12 2.5a1 1 0 0 1 1 1V5a1 1 0 1 1-2 0V3.5a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1Zm9.5-5.5a1 1 0 0 1-1 1H19a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1ZM6 12a1 1 0 0 1-1 1H3.5a1 1 0 1 1 0-2H5a1 1 0 0 1 1 1Zm11.66-6.66a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0ZM8.81 15.19a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 0 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0Zm8.48 2.47-1.06-1.06a1 1 0 0 1 1.41-1.41l1.06 1.06a1 1 0 1 1-1.41 1.41ZM7.75 7.75 6.69 6.69A1 1 0 0 1 8.1 5.28l1.06 1.06A1 1 0 0 1 7.75 7.75Z"
      />
    </svg>
  );
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  variant,
  fromCenter = false,
  theme,
  onThemeChange,
  disabled,
  ...props
}) => {
  const shape = variant ?? 'circle';
  const isControlled = theme !== undefined;
  const [internalIsDark, setInternalIsDark] = useState(false);
  const isDark = isControlled ? theme === 'dark' : internalIsDark;
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isControlled) return undefined;

    const updateTheme = () => {
      setInternalIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [isControlled]);

  const toggleTheme = useCallback(() => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyTheme = () => {
      const nextIsDark = !isDark;
      document.documentElement.classList.toggle('dark', nextIsDark);
      if (isControlled) {
        onThemeChange?.(nextIsDark ? 'dark' : 'light');
      } else {
        setInternalIsDark(nextIsDark);
        try {
          localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        } catch {
          /* ignore storage failures */
        }
      }
    };

    if (
      reduceMotion ||
      typeof document.startViewTransition !== 'function'
    ) {
      applyTheme();
      return;
    }

    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

    let x;
    let y;
    if (fromCenter) {
      x = viewportWidth / 2;
      y = viewportHeight / 2;
    } else {
      const { top, left, width, height } = button.getBoundingClientRect();
      x = left + width / 2;
      y = top + height / 2;
    }

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    );

    const clipPath = getThemeTransitionClipPaths(
      shape,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight
    );

    const root = document.documentElement;
    const safeDuration = Math.max(0, Number(duration) || 400);
    root.dataset.bemoThemeVt = 'active';
    root.style.setProperty('--bemo-theme-toggle-vt-duration', `${safeDuration}ms`);
    root.style.setProperty('--bemo-theme-vt-clip-from', clipPath[0]);

    const cleanup = () => {
      delete root.dataset.bemoThemeVt;
      root.style.removeProperty('--bemo-theme-toggle-vt-duration');
      root.style.removeProperty('--bemo-theme-vt-clip-from');
    };

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    if (typeof transition?.finished?.finally === 'function') {
      transition.finished.finally(cleanup);
    } else {
      cleanup();
    }

    const ready = transition?.ready;
    if (ready && typeof ready.then === 'function') {
      ready.then(() => {
        document.documentElement.animate(
          { clipPath },
          {
            duration: safeDuration,
            easing: shape === 'star' ? 'linear' : 'ease-in-out',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }).catch(() => {
        /* transition aborted */
      });
    }
  }, [shape, fromCenter, duration, isDark, isControlled, onThemeChange, disabled]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cx('bemo-animated-theme-toggler', className)}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      disabled={disabled}
      {...props}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="bemo-animated-theme-toggler__sr-only">Toggle theme</span>
    </button>
  );
};

export default AnimatedThemeToggler;
