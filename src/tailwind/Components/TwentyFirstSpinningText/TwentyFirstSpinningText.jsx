import { motion } from 'framer-motion';

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: 'linear',
};

const BASE_ITEM_VARIANTS = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
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
        className={cn(
          'relative inline-flex items-center justify-center min-h-10 px-4 py-2 rounded-full',
          'bg-gradient-to-br from-[#1620E4]/10 to-[#7BE9C6]/15',
          'border border-[#1620E4]/20 text-[#1620E4] font-semibold',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-4',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        style={style}
        role="text"
        aria-label={text}
        {...props}
      >
        <span className="text-base tracking-wide">{text}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'relative inline-block text-neutral-900 dark:text-neutral-100 font-semibold leading-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-4 rounded',
        className
      )}
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
          className="absolute left-1/2 top-1/2 inline-block will-change-transform"
          style={{
            '--index': index,
            '--total': totalLetters,
            '--font-size': fontSize,
            '--radius': radius,
            fontSize: `calc(var(--font-size, 1) * 1rem)`,
            transform: `
              translate(-50%, -50%)
              rotate(calc(360deg / var(--total) * var(--index)))
              translateY(calc(var(--radius, 5) * -1ch))
            `,
            transformOrigin: 'center',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.div>
  );
}

export default TwentyFirstSpinningText;

/*
@keyframes spin-linear {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .animate-spin-linear { animation: none !important; }
}
*/
