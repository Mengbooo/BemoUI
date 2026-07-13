import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion';
import './DiaTextReveal.css';

const DEFAULT_COLORS = ['#1620E4', '#7BE9C6', '#1620E4', '#7BE9C6', '#1620E4'] as const;
const BAND_HALF = 17;
const SWEEP_START = -BAND_HALF;
const SWEEP_END = 100 + BAND_HALF;

const sweepEase = (t: number): number =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

function buildGradient(pos: number, colors: string[], textColor: string): string {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }

  const n = colors.length;
  const parts: string[] = [];

  if (bandStart > 0) {
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  }

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });

  if (bandEnd < 100) {
    parts.push(`transparent ${bandEnd.toFixed(2)}%`, 'transparent 100%');
  }

  return `linear-gradient(90deg, ${parts.join(', ')})`;
}

function measureWidths(el: HTMLElement, texts: string[]): number[] {
  const parent = el.parentElement;
  if (!parent) return texts.map(() => 0);

  const ghost = el.cloneNode(false) as HTMLElement;
  Object.assign(ghost.style, {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: 'auto',
    whiteSpace: 'nowrap',
  } satisfies Partial<CSSStyleDeclaration>);
  parent.appendChild(ghost);

  const widths = texts.map((t) => {
    ghost.textContent = t;
    return ghost.getBoundingClientRect().width;
  });

  ghost.remove();
  return widths;
}

export interface DiaTextRevealProps
  extends Omit<
    HTMLMotionProps<'span'>,
    'ref' | 'children' | 'style' | 'animate' | 'transition' | 'color'
  > {
  /** Text to reveal. Pass multiple strings to rotate when `repeat` is true. */
  text: string | string[];
  /** Colors sampled across the moving gradient band. */
  colors?: string[];
  /** CSS color for revealed text after the sweep. @default "#0a0a0a" */
  textColor?: string;
  /** Duration of one sweep pass, in seconds. @default 1.5 */
  duration?: number;
  /** Delay before the sweep starts, in seconds. @default 0 */
  delay?: number;
  /** When `text` is an array, replay the sweep and advance to the next string. */
  repeat?: boolean;
  /** Pause between cycles when `repeat` is true, in seconds. @default 0.5 */
  repeatDelay?: number;
  /** Start animation only after the element enters the viewport. @default true */
  startOnView?: boolean;
  /** In-view detection fires at most once when true. @default true */
  once?: boolean;
  /** Extra class names for the animated span. */
  className?: string;
  /** Use the widest string width for multi-line layout. @default false */
  fixedWidth?: boolean;
  /** Freeze the reveal and show final text when true. */
  disabled?: boolean;
}

export function DiaTextReveal({
  text,
  colors = [...DEFAULT_COLORS],
  textColor = '#0a0a0a',
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className = '',
  fixedWidth = false,
  disabled = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text];
  const isMulti = texts.length > 1;
  const prefersReducedMotion = useReducedMotion();

  const spanRef = useRef<HTMLSpanElement>(null);
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  });
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  };

  const indexRef = useRef(0);
  const hasPlayedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const playRef = useRef<() => void>(() => {});
  const stopRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([]);

  const sweepPos = useMotionValue(SWEEP_START);
  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  );

  const isInView = useInView(spanRef, { once, amount: 0.1 });

  useEffect(() => {
    const el = spanRef.current;
    if (!el || !isMulti) return;
    setMeasuredWidths(measureWidths(el, texts));
  }, [isMulti, texts.join('\0')]);

  playRef.current = () => {
    if (disabled) return;
    const {
      duration: d,
      delay: del,
      repeat: rep,
      repeatDelay: rd,
      texts: list,
    } = optsRef.current;

    sweepPos.set(SWEEP_START);

    const controls = animate(sweepPos, SWEEP_END, {
      duration: d,
      delay: del,
      ease: sweepEase,
      onComplete() {
        if (!rep || disabled) return;
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % list.length;
          indexRef.current = next;
          setActiveIndex(next);
          playRef.current();
        }, rd * 1000);
      },
    });

    stopRef.current = () => controls.stop();
  };

  useEffect(() => {
    if (disabled) {
      stopRef.current?.();
      clearTimeout(timerRef.current);
      sweepPos.set(SWEEP_END);
      return undefined;
    }

    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END);
      return undefined;
    }

    if (startOnView && !isInView) return undefined;
    if (once && hasPlayedRef.current) return undefined;

    hasPlayedRef.current = true;
    playRef.current();

    return () => {
      stopRef.current?.();
      clearTimeout(timerRef.current);
    };
  }, [
    isInView,
    startOnView,
    once,
    prefersReducedMotion,
    sweepPos,
    disabled,
  ]);

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0
      ? Math.max(...measuredWidths)
      : undefined;

  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null
      ? measuredWidths[activeIndex]
      : undefined;

  const classes = [
    'bemo-dia-text-reveal',
    isMulti ? 'bemo-dia-text-reveal--multi' : '',
    disabled ? 'bemo-dia-text-reveal--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: CSSProperties = {
    backgroundImage: backgroundImage as unknown as string,
    ...(fixedW != null ? { width: fixedW } : null),
  };

  return (
    <motion.span
      ref={spanRef}
      className={classes}
      style={{
        backgroundImage,
        ...(fixedW != null ? { width: fixedW } : null),
      }}
      animate={animatedW != null && !disabled ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      aria-disabled={disabled || undefined}
      aria-live={isMulti && repeat ? 'polite' : undefined}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  );
}

export default DiaTextReveal;
