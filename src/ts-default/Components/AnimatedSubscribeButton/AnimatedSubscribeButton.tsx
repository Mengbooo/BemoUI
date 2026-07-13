import React, { useEffect, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import './AnimatedSubscribeButton.css';

export interface AnimatedSubscribeButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  subscribeStatus?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(function AnimatedSubscribeButton(
  {
    subscribeStatus,
    onClick,
    className = '',
    children,
    disabled = false,
    ...props
  },
  ref
) {
  const isControlled = subscribeStatus !== undefined;
  const [isSubscribed, setIsSubscribed] = useState<boolean>(
    subscribeStatus ?? false
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isControlled) {
      setIsSubscribed(Boolean(subscribeStatus));
    }
  }, [subscribeStatus, isControlled]);

  const childrenArray = React.Children.toArray(children);
  const isValidChildren =
    childrenArray.length === 2 &&
    childrenArray.every(
      (child) => React.isValidElement(child) && child.type === 'span'
    );

  if (!isValidChildren) {
    throw new Error(
      'AnimatedSubscribeButton expects exactly two children, both of which must be <span> elements.'
    );
  }

  const initialChild = childrenArray[0];
  const changeChild = childrenArray[1];
  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.2 };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!isControlled) {
      setIsSubscribed((prev) => !prev);
    }
    onClick?.(event);
  };

  const baseClass = 'bemo-animated-subscribe-button';
  const stateClass = isSubscribed
    ? 'bemo-animated-subscribe-button--subscribed'
    : 'bemo-animated-subscribe-button--idle';
  const mergedClassName = `${baseClass} ${stateClass} ${className}`.trim();

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          key="subscribed"
          ref={ref}
          type="button"
          className={mergedClassName}
          onClick={handleClick}
          disabled={disabled}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={transition}
          aria-pressed={true}
          {...props}
        >
          <motion.span
            key="action"
            className="bemo-animated-subscribe-button__label"
            initial={shouldReduceMotion ? false : { y: -50 }}
            animate={{ y: 0 }}
            transition={transition}
          >
            {changeChild}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          key="idle"
          ref={ref}
          type="button"
          className={mergedClassName}
          onClick={handleClick}
          disabled={disabled}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={transition}
          aria-pressed={false}
          {...props}
        >
          <motion.span
            key="reaction"
            className="bemo-animated-subscribe-button__label"
            initial={shouldReduceMotion ? false : { x: 0 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { x: 50, transition: { duration: 0.1 } }
            }
          >
            {initialChild}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

AnimatedSubscribeButton.displayName = 'AnimatedSubscribeButton';

export default AnimatedSubscribeButton;
