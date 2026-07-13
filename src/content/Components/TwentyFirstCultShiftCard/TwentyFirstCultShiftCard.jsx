import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TwentyFirstCultShiftCard.css';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const ShiftCardHeader = React.forwardRef(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn('bemo-21st-cult-shift-card-header', className)} {...props}>
    {children}
  </div>
));
ShiftCardHeader.displayName = 'ShiftCardHeader';

const ShiftCardContent = React.forwardRef(({ isHovered, children, className, reducedMotion, ...divProps }, ref) => {
  const motionProps = {
    initial: { opacity: 0, height: 0 },
    animate: isHovered
      ? { opacity: 1, height: reducedMotion ? 'auto' : 194 }
      : { opacity: 1, height: reducedMotion ? 38 : 38 },
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.3, delay: 0.1, ease: 'easeIn' },
  };

  return (
    <motion.div
      key="shift-card-content"
      ref={ref}
      {...motionProps}
      className={cn('bemo-21st-cult-shift-card-content', className)}
      {...divProps}
    >
      {children}
    </motion.div>
  );
});
ShiftCardContent.displayName = 'ShiftCardContent';

const TwentyFirstCultShiftCard = React.forwardRef(
  (
    {
      className,
      topContent,
      topAnimateContent,
      middleContent,
      bottomContent,
      disabled = false,
      onHoverChange,
      style,
      ...props
    },
    ref
  ) => {
    const [isHovered, setHovered] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const handler = (e) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const setHoverState = useCallback(
      (value) => {
        if (disabled) return;
        setHovered(value);
        onHoverChange?.(value);
      },
      [disabled, onHoverChange]
    );

    const handleMouseEnter = useCallback(() => setHoverState(true), [setHoverState]);
    const handleMouseLeave = useCallback(() => setHoverState(false), [setHoverState]);
    const handleFocus = useCallback(() => setHoverState(true), [setHoverState]);
    const handleBlur = useCallback((e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setHoverState(false);
      }
    }, [setHoverState]);
    const handleKeyDown = useCallback(
      (e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setHoverState(!isHovered);
        } else if (e.key === 'Escape' && isHovered) {
          setHoverState(false);
        }
      },
      [disabled, isHovered, setHoverState]
    );

    const combinedRef = useCallback(
      (node) => {
        cardRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <motion.div
        ref={combinedRef}
        className={cn(
          'bemo-21st-cult-shift-card',
          isHovered && 'bemo-21st-cult-shift-card--hovered',
          disabled && 'bemo-21st-cult-shift-card--disabled',
          className
        )}
        style={style}
        initial={reducedMotion ? false : { y: 20, opacity: 0 }}
        animate={reducedMotion ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        whileHover={disabled || reducedMotion ? undefined : { scale: 1.02 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="article"
        aria-disabled={disabled || undefined}
        aria-expanded={isHovered}
        data-state={isHovered ? 'expanded' : 'collapsed'}
        {...props}
      >
        <ShiftCardHeader className="bemo-21st-cult-shift-card-header-inner">
          <div className="bemo-21st-cult-shift-card-top">
            {topContent}
            <AnimatePresence>
              {isHovered && topAnimateContent ? (
                <motion.div
                  key="top-animate"
                  initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                  className="bemo-21st-cult-shift-card-top-animate"
                >
                  {topAnimateContent}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </ShiftCardHeader>

        <div className="bemo-21st-cult-shift-card-middle">
          <AnimatePresence>
            {!isHovered && middleContent ? (
              <motion.div
                key="middle"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                {middleContent}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <ShiftCardContent
          isHovered={isHovered}
          reducedMotion={reducedMotion}
          className="bemo-21st-cult-shift-card-bottom-wrap"
        >
          <div className="bemo-21st-cult-shift-card-bottom">{bottomContent}</div>
        </ShiftCardContent>
      </motion.div>
    );
  }
);

TwentyFirstCultShiftCard.displayName = 'TwentyFirstCultShiftCard';

export { TwentyFirstCultShiftCard, ShiftCardHeader, ShiftCardContent };
export default TwentyFirstCultShiftCard;
