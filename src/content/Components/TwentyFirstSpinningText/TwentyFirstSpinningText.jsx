import { motion } from 'framer-motion';
import './TwentyFirstSpinningText.css';

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: 'linear',
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function TwentyFirstSpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  fontSize = 1,
  radius = 5,
  transition,
  variants,
  disabled = false,
  ...props
}) {
  const text = typeof children === 'string' ? children : String(children ?? '');
  const letters = text.split('');
  const totalLetters = letters.length || 1;

  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition && transition.duration) ?? duration,
  };

  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...(variants && variants.container),
  };

  const itemVariants = {
    ...BASE_ITEM_VARIANTS,
    ...(variants && variants.item),
  };

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (disabled || prefersReduced) {
    return (
      <div
        className={cn('bemo-21st-spinning-text', 'bemo-21st-spinning-text--static', className)}
        style={style}
        role="text"
        aria-label={text}
        {...props}
      >
        <span className="bemo-21st-spinning-text__static-text">{text}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={cn('bemo-21st-spinning-text', className)}
      style={style}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
      role="img"
      aria-label={text}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="bemo-21st-spinning-text__letter"
          style={{
            '--index': index,
            '--total': totalLetters,
            '--font-size': fontSize,
            '--radius': radius,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
      <span className="bemo-21st-spinning-text__sr-only">{text}</span>
    </motion.div>
  );
}

export default TwentyFirstSpinningText;
