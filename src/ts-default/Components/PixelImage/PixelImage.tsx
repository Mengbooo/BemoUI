import { useEffect, useMemo, useState, type CSSProperties, type HTMLAttributes } from 'react';
import './PixelImage.css';

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
} as const;

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

const MIN_GRID = 1;
const MAX_GRID = 16;

function isValidGrid(grid?: Grid): grid is Grid {
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

export interface PixelImageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src: string;
  alt?: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number;
  maxAnimationDelay?: number;
  colorRevealDelay?: number;
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
}: PixelImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { rows, cols } = useMemo(() => {
    if (isValidGrid(customGrid)) return customGrid;
    return DEFAULT_GRIDS[grid] ?? DEFAULT_GRIDS['6x4'];
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

  const rootClassName = ['bemo-pixel-image', className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClassName}
      role="img"
      aria-label={alt || undefined}
      {...props}
    >
      {pieces.map((piece, index) => {
        const pieceClassName = [
          'bemo-pixel-image__piece',
          isVisible ? 'bemo-pixel-image__piece--visible' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const imgClassName = [
          'bemo-pixel-image__img',
          grayscaleAnimation && !reduceMotion
            ? showColor
              ? 'bemo-pixel-image__img--color'
              : 'bemo-pixel-image__img--grayscale'
            : '',
        ]
          .filter(Boolean)
          .join(' ');

        const pieceStyle: CSSProperties = {
          clipPath: piece.clipPath,
          transitionDelay: `${piece.delay}ms`,
          transitionDuration: reduceMotion ? '0ms' : `${pixelFadeInDuration}ms`,
        };

        const imgStyle: CSSProperties | undefined =
          grayscaleAnimation && !reduceMotion
            ? {
                transition: `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }
            : undefined;

        return (
          <div
            key={index}
            className={pieceClassName}
            style={pieceStyle}
            aria-hidden="true"
          >
            <img
              src={src}
              alt=""
              className={imgClassName}
              style={imgStyle}
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
