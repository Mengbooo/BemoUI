import React, { useMemo } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
  type Variant,
  type Variants,
} from 'framer-motion';

export type PresetType = 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide';

export type PerType = 'word' | 'char' | 'line';

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(12px)' },
    },
  },
  'fade-in-blur': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: 20, filter: 'blur(12px)' },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: PerType;
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre"
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className="inline-block whitespace-pre">
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

function splitText(text: string, per: PerType): string[] {
  if (per === 'line') return text.split('\n');
  return text.split(/(\s+)/);
}

function hasTransition(
  variant?: Variant
): variant is TargetAndTransition & { transition?: Transition } {
  if (!variant) return false;
  return typeof variant === 'object' && 'transition' in variant;
}

function createVariantsWithTransition(
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition }
): Variants {
  if (!transition) return baseVariants;

  const { exit: _, ...mainTransition } = transition;

  return {
    ...baseVariants,
    visible: {
      ...(baseVariants.visible as object),
      transition: {
        ...(hasTransition(baseVariants.visible)
          ? (baseVariants.visible as TargetAndTransition).transition
          : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...(baseVariants.exit as object),
      transition: {
        ...(hasTransition(baseVariants.exit)
          ? (baseVariants.exit as TargetAndTransition).transition
          : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  };
}

export function TwentyFirstTextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset = 'fade',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
  disabled = false,
}: TextEffectProps) {
  const prefersReducedMotion = useReducedMotion();
  const segments = useMemo(
    () => splitText(String(children ?? ''), per),
    [children, per]
  );

  const MotionTag = (motion as any)[as] || motion.p;

  const baseVariants = preset
    ? presetVariants[preset] || {
        container: defaultContainerVariants,
        item: defaultItemVariants,
      }
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const stagger = defaultStaggerTimes[per] / Math.max(speedReveal, 0.01);
  const baseDuration = 0.3 / Math.max(speedSegment, 0.01);

  const customStagger = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition
        ?.staggerChildren
    : undefined;

  const customDelay = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition
        ?.delayChildren
    : undefined;

  const computedVariants = useMemo(() => {
    if (prefersReducedMotion || disabled) {
      return {
        container: {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
          exit: { opacity: 1 },
        },
        item: {
          hidden: { opacity: 1, filter: 'none', y: 0, scale: 1 },
          visible: { opacity: 1, filter: 'none', y: 0, scale: 1 },
          exit: { opacity: 1 },
        },
      };
    }

    return {
      container: createVariantsWithTransition(
        variants?.container || baseVariants.container,
        {
          staggerChildren: customStagger ?? stagger,
          delayChildren: customDelay ?? delay,
          ...containerTransition,
          exit: {
            staggerChildren: customStagger ?? stagger,
            staggerDirection: -1,
          },
        }
      ),
      item: createVariantsWithTransition(variants?.item || baseVariants.item, {
        duration: baseDuration,
        ...segmentTransition,
      }),
    };
  }, [
    prefersReducedMotion,
    disabled,
    variants,
    baseVariants,
    customStagger,
    customDelay,
    stagger,
    delay,
    containerTransition,
    baseDuration,
    segmentTransition,
  ]);

  const rootClass = cn(
    'text-neutral-950 dark:text-white font-sans leading-relaxed m-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] rounded-sm',
    disabled && 'opacity-55 pointer-events-none cursor-not-allowed',
    className
  );

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={computedVariants.container}
          className={rootClass}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
          aria-disabled={disabled || undefined}
        >
          {per !== 'line' ? (
            <span className="sr-only">{children}</span>
          ) : null}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}

export default TwentyFirstTextEffect;

/* Tailwind v4 keyframes / utilities note:
   No custom @keyframes required; animations are driven by framer-motion.
   Optional utilities: sr-only, focus-visible outline with accent #1620E4.
   Compose accents with text-[#1620E4] or text-[#7BE9C6].
*/
