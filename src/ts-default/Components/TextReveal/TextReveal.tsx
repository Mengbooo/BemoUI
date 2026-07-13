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
import './TextReveal.css';

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
    <span className="bemo-text-reveal__word">
      <span className="bemo-text-reveal__word-bg" aria-hidden="true">
        {children}
      </span>
      <motion.span
        className="bemo-text-reveal__word-fg"
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
      className={['bemo-text-reveal', className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="bemo-text-reveal__sticky">
        <p className="bemo-text-reveal__text" aria-label={text}>
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
