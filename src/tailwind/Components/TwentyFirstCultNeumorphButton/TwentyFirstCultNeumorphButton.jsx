import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const intentClasses = {
  default:
    'bg-[#36322F] text-white hover:enabled:bg-[#4a4542] disabled:bg-[#8c8885] shadow-[inset_0px_-2.108433723449707px_0px_0px_#171310,0px_1.2048193216323853px_6.325301647186279px_0px_rgba(58,33,8,0.58)] hover:enabled:shadow-[inset_0px_-2.53012px_0px_0px_#171310,0px_1.44578px_7.59036px_0px_rgba(58,33,8,0.64)] active:enabled:bg-[#2A2724] active:enabled:shadow-[inset_0px_-1.5px_0px_0px_#171310,0px_0.5px_2px_0px_rgba(58,33,8,0.7)] disabled:shadow-none',
  primary:
    'bg-[#1620E4] text-white hover:enabled:bg-[#2a34f0] disabled:bg-[#8a90f0] shadow-[inset_0px_-2.108433723449707px_0px_0px_#0f169e,0px_1.2048193216323853px_6.325301647186279px_0px_rgba(22,32,228,0.58)] hover:enabled:shadow-[inset_0px_-2.53012px_0px_0px_#1620E4,0px_1.44578px_7.59036px_0px_rgba(22,32,228,0.64)] active:enabled:bg-[#0f169e] active:enabled:shadow-[inset_0px_-1.5px_0px_0px_#0b1170,0px_0.5px_2px_0px_rgba(22,32,228,0.7)] disabled:shadow-none',
  secondary:
    'bg-white text-[#36322F] border border-[#E0E0E0] hover:enabled:bg-[#F8F8F8] disabled:bg-[#F0F0F0] shadow-[inset_0px_-2.108433723449707px_0px_0px_#E0E0E0,0px_1.2048193216323853px_6.325301647186279px_0px_rgba(0,0,0,0.1)] hover:enabled:shadow-[inset_0px_-2.53012px_0px_0px_#E8E8E8,0px_1.44578px_7.59036px_0px_rgba(0,0,0,0.12)] active:enabled:bg-[#F0F0F0] active:enabled:shadow-[inset_0px_-1.5px_0px_0px_#D8D8D8,0px_0.5px_2px_0px_rgba(0,0,0,0.15)] disabled:shadow-none',
  danger:
    'bg-[#E6492D] text-white hover:enabled:bg-[#F05B41] disabled:bg-[#F5A799] shadow-[inset_0px_-2.108433723449707px_0px_0px_#D63A1F,0px_1.2048193216323853px_6.325301647186279px_0px_rgba(214,58,31,0.58)] hover:enabled:shadow-[inset_0px_-2.53012px_0px_0px_#E6492D,0px_1.44578px_7.59036px_0px_rgba(214,58,31,0.64)] active:enabled:bg-[#D63A1F] active:enabled:shadow-[inset_0px_-1.5px_0px_0px_#B22E17,0px_0.5px_2px_0px_rgba(214,58,31,0.7)] disabled:shadow-none',
};

const sizeClasses = {
  small: 'text-xs py-1 px-2 h-9 rounded-[8px]',
  medium: 'text-base py-2 px-4 h-11 rounded-[9px] uppercase',
  large: 'text-lg py-3 px-6 h-14 rounded-[11px] max-sm:text-base max-sm:h-12 max-sm:py-2.5 max-sm:px-5',
};

export function TwentyFirstCultNeumorphButton({
  children,
  intent = 'default',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const isDisabled = disabled || loading;
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const classes = [
    'inline-flex justify-center items-center gap-2 font-medium transition-[box-shadow,background-color,opacity] disabled:cursor-not-allowed disabled:opacity-50 active:transition-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1620E4] focus-visible:outline-offset-2',
    intentClasses[intent] || intentClasses.default,
    sizeClasses[size] || sizeClasses.medium,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      whileTap={reducedMotion || isDisabled ? undefined : { scale: 0.98 }}
      whileHover={reducedMotion || isDisabled ? undefined : { scale: 1.02 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2
          className="mr-0 h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none"
          aria-hidden="true"
        />
      ) : null}
      <motion.span
        className="inline-flex items-center"
        initial={false}
        animate={{ opacity: loading ? 0.7 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

export default TwentyFirstCultNeumorphButton;

/*
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
Tailwind v4 animate-spin covers the loader. Prefer prefers-reduced-motion via motion-reduce:animate-none.
*/
