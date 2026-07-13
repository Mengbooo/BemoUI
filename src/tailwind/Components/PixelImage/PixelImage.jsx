import { useEffect, useMemo, useState } from 'react';

const DEFAULT_GRIDS = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
};

const MIN_GRID = 1;
const MAX_GRID = 16;

function isValidGrid(grid) {
  if (!grid) return false;
  const { rows, cols } = grid;
  return (
    Number.isInteger(rows) &&
    Number.isInteger(cols) &&
    rows >= MIN_GRID &&
    cols >= MIN_GRID &&
    rows <= MAX_GRID &&
    cols <= MAX_GRID
  );
}

export default function PixelImage({
  src,
  alt = '',
  grid = '6x4',
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  className = '',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { rows, cols } = useMemo(() => {
    if (isValidGrid(customGrid)) return customGrid;
    return DEFAULT_GRIDS[grid] || DEFAULT_GRIDS['6x4'];
  }, [customGrid, grid]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(Boolean(mq.matches));
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      setShowColor(true);
      return undefined;
    }
    setIsVisible(true);
    const colorTimeout = window.setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => window.clearTimeout(colorTimeout);
  }, [colorRevealDelay, reduceMotion]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const clipPath = `polygon(${col * (100 / cols)}% ${row * (100 / rows)}%, ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%, ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%, ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%)`;
      const delay = reduceMotion ? 0 : Math.random() * maxAnimationDelay;
      return { clipPath, delay };
    });
  }, [rows, cols, maxAnimationDelay, reduceMotion]);

  return (
    <div
      className={`relative h-72 w-72 select-none rounded-[2.5rem] outline-none shadow-[0_0_0_1px_color-mix(in_srgb,#1620E4_18%,transparent),0_12px_32px_color-mix(in_srgb,#1620E4_12%,transparent)] focus-visible:shadow-[0_0_0_3px_#ffffff,0_0_0_6px_#1620E4,0_0_0_8px_color-mix(in_srgb,#7BE9C6_70%,transparent)] md:h-96 md:w-96 ${className}`}
      role="img"
      aria-label={alt || undefined}
      {...props}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={`absolute inset-0 ease-out transition-opacity motion-reduce:opacity-100 motion-reduce:transition-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: reduceMotion ? '0ms' : `${pixelFadeInDuration}ms`,
          }}
          aria-hidden="true"
        >
          <img
            src={src}
            alt=""
            className={`z-[1] block h-full w-full rounded-[2.5rem] object-cover pointer-events-none motion-reduce:grayscale-0 ${grayscaleAnimation && !reduceMotion ? (showColor ? 'grayscale-0' : 'grayscale') : ''}`}
            style={
              grayscaleAnimation && !reduceMotion
                ? {
                    transition: `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  }
                : undefined
            }
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

// Required global keyframes (add to your global CSS if not already present):
// (none — PixelImage uses CSS transitions only; prefers-reduced-motion is handled via motion-reduce utilities and JS.)
