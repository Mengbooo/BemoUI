import { memo, useMemo } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import './TextAnimate.css';

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
};

const staggerTimings = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const defaultItemAnimationVariants = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.3 },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: -20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        y: -20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: { type: 'spring', damping: 15, stiffness: 300 },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: { type: 'spring', damping: 15, stiffness: 300 },
        },
      },
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function TextAnimateBase({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = 'p',
  startOnView = true,
  once = false,
  by = 'word',
  animation = 'fadeIn',
  accessible = true,
  ...props
}) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = motionElements[Component] || motion.p;
  const text = children == null ? '' : String(children);

  const segments = useMemo(() => {
    switch (by) {
      case 'word':
        return text.split(/(\s+)/);
      case 'character':
        return text.split('');
      case 'line':
        return text.split('\n');
      case 'text':
      default:
        return [text];
    }
  }, [text, by]);

  const finalVariants = useMemo(() => {
    if (reducedMotion) {
      return {
        container: {
          hidden: { opacity: 1 },
          show: { opacity: 1 },
          exit: { opacity: 1 },
        },
        item: {
          hidden: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
          show: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
        },
      };
    }

    const stagger = duration / Math.max(segments.length, 1);

    if (variants) {
      return {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              opacity: { duration: 0.01, delay },
              delayChildren: delay,
              staggerChildren: stagger,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: stagger,
              staggerDirection: -1,
            },
          },
        },
        item: variants,
      };
    }

    const preset = defaultItemAnimationVariants[animation];
    if (preset) {
      return {
        container: {
          ...preset.container,
          show: {
            ...preset.container.show,
            transition: {
              delayChildren: delay,
              staggerChildren: stagger,
            },
          },
          exit: {
            ...preset.container.exit,
            transition: {
              staggerChildren: stagger,
              staggerDirection: -1,
            },
          },
        },
        item: preset.item,
      };
    }

    return {
      container: defaultContainerVariants,
      item: defaultItemVariants,
    };
  }, [reducedMotion, variants, animation, delay, duration, segments.length]);

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? 'show' : undefined}
        animate={startOnView ? undefined : 'show'}
        exit="exit"
        className={cx('bemo-text-animate', className)}
        viewport={{ once }}
        aria-label={accessible ? text : undefined}
        {...props}
      >
        {accessible ? (
          <span className="bemo-text-animate__sr-only">{text}</span>
        ) : null}
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            custom={i * (staggerTimings[by] || 0.05)}
            className={cx(
              'bemo-text-animate__segment',
              by === 'line' && 'bemo-text-animate__segment--line',
              by === 'character' && 'bemo-text-animate__segment--character',
              segmentClassName
            )}
            aria-hidden={accessible ? true : undefined}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
}

const TextAnimate = memo(TextAnimateBase);

export default TextAnimate;
