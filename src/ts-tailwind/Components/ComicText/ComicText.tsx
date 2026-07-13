import type { CSSProperties } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

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

  return (
    <motion.div
      className={[
        'inline-block text-center select-none uppercase font-black',
        'bg-clip-text text-transparent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        fontSize: `${fontSize}rem`,
        fontFamily:
          "'Comic Sans MS', 'Impact', 'Arial Black', system-ui, sans-serif",
        WebkitTextStroke: `${fontSize * 0.35}px #000000`,
        backgroundColor: '#7BE9C6',
        backgroundImage:
          'radial-gradient(circle at 1px 1px, #1620E4 1px, transparent 0)',
        backgroundSize: '8px 8px',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter:
          'drop-shadow(5px 5px 0px #000000) drop-shadow(3px 3px 0px #1620E4)',
        ...style,
      }}
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

/* Required global keyframes (optional CSS alternative to framer-motion entrance):
@keyframes bemo-comic-text-pop {
  from {
    opacity: 0;
    transform: skewX(-10deg) scale(0.8) rotate(-2deg);
  }
  to {
    opacity: 1;
    transform: skewX(-10deg) scale(1) rotate(0deg);
  }
}
.bemo-comic-text-animate {
  animation: bemo-comic-text-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
@media (prefers-reduced-motion: reduce) {
  .bemo-comic-text-animate {
    animation: none;
  }
}
*/
