import {
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export interface TextRevealProps extends ComponentPropsWithoutRef<'div'> {
  /** Plain text revealed word-by-word as the section scrolls into view. */
  children: string;
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, reduceMotion }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span
        className="absolute inset-0 select-none text-[#1620E4] opacity-30 dark:text-[#7BE9C6]"
        aria-hidden="true"
      >
        {children}
      </span>
      <motion.span
        className="relative text-[#1620E4] dark:text-[#7BE9C6]"
        style={{ opacity: reduceMotion ? 1 : opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const TextReveal: FC<TextRevealProps> = ({
  children = '',
  className = '',
  ...props
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef });

  const text = typeof children === 'string' ? children : String(children ?? '');
  const words = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean),
    [text]
  );

  return (
    <div
      ref={sectionRef}
      className={["relative z-0 h-[200vh] motion-reduce:h-auto motion-reduce:min-h-[40vh]", className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20 motion-reduce:relative motion-reduce:h-auto">
        <p
          className="m-0 flex flex-wrap p-5 text-2xl font-bold leading-snug text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20"
          aria-label={text}
        >
          {words.map((word, i) => {
            const start = words.length ? i / words.length : 0;
            const end = words.length ? start + 1 / words.length : 1;
            return (
              <Word
                key={`${i}-${word}`}
                progress={scrollYProgress}
                range={[start, end]}
                reduceMotion={!!reduceMotion}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default TextReveal;

/* Global keyframes: none required. Scroll-linked word opacity is driven by framer-motion useScroll/useTransform; prefers-reduced-motion is handled via useReducedMotion and motion-reduce utilities. */
