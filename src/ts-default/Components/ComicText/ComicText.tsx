import type { CSSProperties } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import './ComicText.css';

export type ComicTextProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: number;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'style'>;

const ComicText = ({
  children,
  className = '',
  style,
  fontSize = 5,
  ...props
}: ComicTextProps) => {
  const prefersReducedMotion = useReducedMotion();
  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return null;
  }

  const cssVars = {
    '--bemo-comic-text-font-size': `${fontSize}rem`,
    '--bemo-comic-text-stroke': `${fontSize * 0.35}px`,
  } as CSSProperties;

  return (
    <motion.div
      className={['bemo-comic-text', className].filter(Boolean).join(' ')}
      style={{ ...cssVars, ...style }}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, scale: 0.8, rotate: -2, skewX: -10 }
      }
      animate={{ opacity: 1, scale: 1, rotate: 0, skewX: -10 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.6,
              ease: [0.175, 0.885, 0.32, 1.275],
              type: 'spring',
            }
      }
      {...props}
    >
      {text}
    </motion.div>
  );
};

export default ComicText;
