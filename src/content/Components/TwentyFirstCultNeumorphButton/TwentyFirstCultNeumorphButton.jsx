import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import './TwentyFirstCultNeumorphButton.css';

const intentStyles = {
  default: 'bemo-21st-cult-neumorph-button--default',
  primary: 'bemo-21st-cult-neumorph-button--primary',
  secondary: 'bemo-21st-cult-neumorph-button--secondary',
  danger: 'bemo-21st-cult-neumorph-button--danger',
};

const sizeStyles = {
  small: 'bemo-21st-cult-neumorph-button--small',
  medium: 'bemo-21st-cult-neumorph-button--medium',
  large: 'bemo-21st-cult-neumorph-button--large',
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
  const classes = [
    'bemo-21st-cult-neumorph-button',
    intentStyles[intent] || intentStyles.default,
    sizeStyles[size] || sizeStyles.medium,
    fullWidth ? 'bemo-21st-cult-neumorph-button--full-width' : '',
    loading ? 'bemo-21st-cult-neumorph-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          className="bemo-21st-cult-neumorph-button__spinner"
          aria-hidden="true"
        />
      ) : null}
      <motion.span
        className="bemo-21st-cult-neumorph-button__label"
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
