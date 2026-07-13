import React, { useState, useCallback, useRef, useEffect, type ReactNode, type CSSProperties, type HTMLAttributes } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps, type MotionProps } from 'framer-motion';

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export interface TwentyFirstCultShiftCardProps
  extends Omit<MotionProps, 'onAnimationStart' | 'onAnimationComplete' | 'children'>,
    Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps | 'onAnimationStart' | 'onAnimationComplete'> {
  className?: string;
  topContent?: ReactNode;
  middleContent?: ReactNode;
  topAnimateContent?: ReactNode;
  bottomContent?: ReactNode;
  disabled?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  style?: CSSProperties;
}

const ShiftCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full', className)} {...props}>
    {children}
  </div>
));
ShiftCardHeader.displayName = 'ShiftCardHeader';

interface ShiftCardContentProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode;
  isHovered: boolean;
  reducedMotion?: boolean;
}

const ShiftCardContent = React.forwardRef<HTMLDivElement, ShiftCardContentProps>(
  ({ isHovered, children, className, reducedMotion = false, ...divProps }, ref) => {
    const motionProps: MotionProps = {
      initial: { opacity: 0, height: 0 },
      animate: isHovered
        ? { opacity: 1, height: reducedMotion ? 'auto' : 194 }
        : { opacity: 1, height: 38 },
      transition: reducedMotion
        ? { duration: 0 }
        : { duration: 0.3, delay: 0.1, ease: 'easeIn' },
    };

    return (
      <motion.div
        key="shift-card-content"
        ref={ref}
        {...motionProps}
        className={cn(
          'absolute -bottom-1.5 left-0 right-0 flex flex-col gap-4 rounded-xl overflow-hidden',
          className
        )}
        {...divProps}
      >
        {children}
      </motion.div>
    );
  }
);
ShiftCardContent.displayName = 'ShiftCardContent';

const TwentyFirstCultShiftCard = React.forwardRef<HTMLDivElement, TwentyFirstCultShiftCardProps>(
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
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const setHoverState = useCallback(
      (value: boolean) => {
        if (disabled) return;
        setHovered(value);
        onHoverChange?.(value);
      },
      [disabled, onHoverChange]
    );

    const handleMouseEnter = useCallback(() => setHoverState(true), [setHoverState]);
    const handleMouseLeave = useCallback(() => setHoverState(false), [setHoverState]);
    const handleFocus = useCallback(() => setHoverState(true), [setHoverState]);
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHoverState(false);
        }
      },
      [setHoverState]
    );
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      (node: HTMLDivElement | null) => {
        cardRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    return (
      <motion.div
        ref={combinedRef}
        className={cn(
          'group relative flex min-h-[300px] w-[280px] max-w-full flex-col items-center justify-between overflow-hidden rounded-xl p-3 text-sm',
          'md:w-[300px]',
          'bg-white text-neutral-950',
          'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
          'dark:bg-neutral-900 dark:text-neutral-50',
          'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
          'cursor-pointer outline-none transition-shadow',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1620E4]',
          'focus-visible:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0_0_0_4px_rgba(22,32,228,0.25)]',
          isHovered &&
            'shadow-[0_4px_12px_rgba(22,32,228,0.12),0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset]',
          disabled && 'pointer-events-none cursor-not-allowed opacity-55',
          className
        )}
        style={style}
        initial={reducedMotion ? false : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
        <ShiftCardHeader className="relative flex h-[46px] w-full flex-col">
          <div className="w-full">
            {topContent}
            <AnimatePresence>
              {isHovered && topAnimateContent ? (
                <motion.div
                  key="top-animate"
                  initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                  className="mt-1"
                >
                  {topAnimateContent}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </ShiftCardHeader>

        <div className="flex w-full flex-1 items-center justify-center pb-12">
          <AnimatePresence>
            {!isHovered && middleContent ? (
              <motion.div
                key="middle"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                className="w-full"
              >
                {middleContent}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <ShiftCardContent
          isHovered={isHovered}
          reducedMotion={reducedMotion}
          className="border-t border-[#1620E4]/12 bg-gradient-to-b from-[#7BE9C6]/15 to-white p-3 dark:border-[#7BE9C6]/20 dark:from-[#1620E4]/20 dark:to-neutral-900"
        >
          <div className="flex w-full flex-col gap-1">{bottomContent}</div>
        </ShiftCardContent>
      </motion.div>
    );
  }
);

TwentyFirstCultShiftCard.displayName = 'TwentyFirstCultShiftCard';

export { TwentyFirstCultShiftCard, ShiftCardHeader, ShiftCardContent };
export default TwentyFirstCultShiftCard;

/* Tailwind v4 keyframes (if needed in @theme or global CSS):
@keyframes bemo-shift-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
*/
