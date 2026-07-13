import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const AnimatedSubscribeButton = React.forwardRef(function AnimatedSubscribeButton(
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
  const [isSubscribed, setIsSubscribed] = useState(subscribeStatus ?? false);
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

  const handleClick = (event) => {
    if (disabled) return;
    if (!isControlled) {
      setIsSubscribed((prev) => !prev);
    }
    onClick?.(event);
  };

  const baseClasses =
    'relative inline-flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg border-none px-6 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-55';
  const stateClasses = isSubscribed
    ? 'bg-[#7BE9C6] text-black focus-visible:outline-[#7BE9C6]'
    : 'cursor-pointer bg-[#1620E4] text-white focus-visible:outline-[#1620E4]';
  const mergedClassName = `${baseClasses} ${stateClasses} ${className}`.trim();

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
            className="relative flex h-full w-full items-center justify-center font-semibold"
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
            className="relative flex items-center justify-center font-semibold"
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

// Required global keyframes (Tailwind v4 / CSS entry):
// Animations are driven by framer-motion; no custom @keyframes are required.
// Optional reduced-motion guard if you add CSS fallbacks:
// @media (prefers-reduced-motion: reduce) {
//   .bemo-asb-motion { animation: none !important; transition: none !important; }
// }
