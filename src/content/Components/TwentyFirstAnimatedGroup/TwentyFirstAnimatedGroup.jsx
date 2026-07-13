import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './TwentyFirstAnimatedGroup.css';

const defaultContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
};

const addDefaultVariants = (variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

const reducedMotionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0,
      },
    },
  },
  item: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
};

function TwentyFirstAnimatedGroup({
  children,
  className = '',
  variants,
  preset = 'fade',
  as = 'div',
  asChild = 'div',
  stagger = 0.1,
  once = false,
  ...props
}) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const selectedVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return reducedMotionVariants;
    }
    const baseContainer = {
      ...defaultContainerVariants,
      visible: {
        ...defaultContainerVariants.visible,
        transition: {
          ...defaultContainerVariants.visible.transition,
          staggerChildren: stagger,
        },
      },
    };
    return {
      item: addDefaultVariants(preset ? presetVariants[preset] || {} : {}),
      container: addDefaultVariants(baseContainer),
    };
  }, [preset, stagger, prefersReducedMotion]);

  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  const MotionComponent = useMemo(() => motion(as), [as]);
  const MotionChild = useMemo(() => motion(asChild), [asChild]);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
      className={`bemo-21st-animated-group ${className}`.trim()}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <MotionChild
            key={child.key ?? index}
            variants={itemVariants}
            className="bemo-21st-animated-group__item"
          >
            {child}
          </MotionChild>
        );
      })}
    </MotionComponent>
  );
}

export default TwentyFirstAnimatedGroup;
export { TwentyFirstAnimatedGroup };
