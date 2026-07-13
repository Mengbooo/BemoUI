import React, {
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import {
  type MotionValue,
  motion,
  useSpring,
  useTransform,
  motionValue,
} from 'framer-motion';
import './TwentyFirstSlidingNumber.css';

const TRANSITION = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

function useMeasure(): [
  React.RefObject<HTMLSpanElement>,
  { height: number; width: number }
] {
  const ref = useRef<HTMLSpanElement>(null);
  const [bounds, setBounds] = useState({ height: 0, width: 0 });

  const update = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setBounds({ height: rect.height, width: rect.width });
    }
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return undefined;

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }

    window.addEventListener('resize', update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update]);

  return [ref, bounds];
}

interface DigitProps {
  value: number;
  place: number;
}

function Digit({ value, place }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="bemo-21st-sliding-number__digit" aria-hidden="true">
      <div className="bemo-21st-sliding-number__ghost">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <SlidingDigit key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
}

function SlidingDigit({ mv, number }: NumberProps) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;
    if (offset > 5) {
      memo -= 10 * bounds.height;
    }
    return memo;
  });

  if (!bounds.height) {
    return (
      <span ref={ref} className="bemo-21st-sliding-number__measure">
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${uniqueId}-${number}`}
      className="bemo-21st-sliding-number__number"
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

export interface TwentyFirstSlidingNumberProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

export function TwentyFirstSlidingNumber({
  value = 0,
  padStart = false,
  decimalSeparator = '.',
  className = '',
  style,
  'aria-label': ariaLabel,
  ...rest
}: TwentyFirstSlidingNumberProps) {
  const absValue = Math.abs(Number(value) || 0);
  const str = absValue.toString();
  const [integerPart, decimalPart] = str.split('.');
  const integerValue = parseInt(integerPart, 10) || 0;
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split('');
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  );

  const label =
    ariaLabel ??
    `Sliding number: ${value < 0 ? '-' : ''}${absValue}`;

  return (
    <div
      className={`bemo-21st-sliding-number ${className}`.trim()}
      style={style}
      role="text"
      aria-label={label}
      aria-live="polite"
      {...rest}
    >
      {value < 0 && (
        <span className="bemo-21st-sliding-number__sign" aria-hidden="true">
          -
        </span>
      )}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span
            className="bemo-21st-sliding-number__separator"
            aria-hidden="true"
          >
            {decimalSeparator}
          </span>
          {decimalPart.split('').map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10) || 0}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default TwentyFirstSlidingNumber;
