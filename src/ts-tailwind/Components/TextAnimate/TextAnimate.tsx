import { memo, useMemo, type ElementType, type ComponentPropsWithoutRef } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
  type Variants,
} from 'framer-motion';

type AnimationType = 'text' | 'word' | 'character' | 'line';
type AnimationVariant =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'scaleDown';

type MotionTag =
  | 'article'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'li'
  | 'p'
  | 'section'
  | 'span';

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
} as const;

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants: Variants = {
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

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
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

export interface TextAnimateProps extends Omit<MotionProps, 'children'> {
  children: string;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: MotionTag;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
  accessible?: boolean;
}

function cx(...parts: Array<string | false | null | undefined>): string {
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
}: TextAnimateProps) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = (motionElements[Component] || motion.p) as ElementType;
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
        } as Variants,
        item: {
          hidden: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
          show: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
        } as Variants,
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
        } as Variants,
        item: variants,
      };
    }

    const preset = defaultItemAnimationVariants[animation];
    if (preset) {
      return {
        container: {
          ...preset.container,
          show: {
            ...(preset.container.show as object),
            transition: {
              delayChildren: delay,
              staggerChildren: stagger,
            },
          },
          exit: {
            ...(preset.container.exit as object),
            transition: {
              staggerChildren: stagger,
              staggerDirection: -1,
            },
          },
        } as Variants,
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
        className={cx('m-0 whitespace-pre-wrap text-inherit', className)}
        viewport={{ once }}
        aria-label={accessible ? text : undefined}
        {...(props as ComponentPropsWithoutRef<'p'>)}
      >
        {accessible ? <span className="sr-only">{text}</span> : null}
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            custom={i * (staggerTimings[by] || 0.05)}
            className={cx(
              by === 'line' ? 'block' : 'inline-block whitespace-pre',
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
export type { AnimationType, AnimationVariant, MotionTag };

/*
 * Required global keyframes / theme tokens (Tailwind v4):
 * Animations are driven by framer-motion; no CSS keyframes are required.
 * Optional accent utilities for decorative use:
 *
 * @theme {
 *   --color-bemo-blue: #1620E4;
 *   --color-bemo-green: #7BE9C6;
 * }
 *
 * Accent class examples: text-[#1620E4], text-[#7BE9C6], decoration-[#7BE9C6]
 */
