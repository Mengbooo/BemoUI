import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
  type HTMLMotionProps,
} from 'framer-motion';
import './TwentyFirstImageComparison.css';

type ImageComparisonContextValue = {
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  motionSliderPosition: MotionValue<number>;
  disabled: boolean;
};

const ImageComparisonContext = createContext<
  ImageComparisonContextValue | undefined
>(undefined);

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  bounce: 0,
  duration: 0,
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useImageComparison(): ImageComparisonContextValue {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) {
    throw new Error(
      'TwentyFirstImageComparison subcomponents must be used within TwentyFirstImageComparison'
    );
  }
  return ctx;
}

export type TwentyFirstImageComparisonProps = {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  initialPosition?: number;
  disabled?: boolean;
  onPositionChange?: (position: number) => void;
  'aria-label'?: string;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onPositionChange' | 'defaultValue'
>;

function TwentyFirstImageComparison({
  children,
  className = '',
  enableHover = false,
  springOptions,
  initialPosition = 50,
  disabled = false,
  onPositionChange,
  'aria-label': ariaLabel = 'Image comparison slider',
  ...rest
}: TwentyFirstImageComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const motionValue = useMotionValue(initialPosition);
  const springConfig: SpringOptions =
    reducedMotion || disabled
      ? { bounce: 0, duration: 0 }
      : springOptions ?? DEFAULT_SPRING_OPTIONS;
  const motionSliderPosition = useSpring(motionValue, springConfig);
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const labelId = useId();

  const updatePosition = useCallback(
    (percentage: number) => {
      const clamped = Math.min(Math.max(percentage, 0), 100);
      motionValue.set(clamped);
      setSliderPosition(clamped);
      onPositionChange?.(clamped);
    },
    [motionValue, onPositionChange]
  );

  const handlePointer = useCallback(
    (clientX: number) => {
      if (disabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = clientX - rect.left;
      updatePosition((x / rect.width) * 100);
    },
    [disabled, updatePosition]
  );

  const handleDrag = useCallback(
    (event: ReactMouseEvent | ReactTouchEvent) => {
      if (disabled) return;
      if (!isDragging && !enableHover) return;
      if ('touches' in event && event.touches.length > 0) {
        handlePointer(event.touches[0].clientX);
      } else if ('clientX' in event) {
        handlePointer(event.clientX);
      }
    },
    [disabled, isDragging, enableHover, handlePointer]
  );

  const startDrag = useCallback(
    (event: ReactMouseEvent | ReactTouchEvent) => {
      if (disabled || enableHover) return;
      setIsDragging(true);
      if ('touches' in event && event.touches.length > 0) {
        handlePointer(event.touches[0].clientX);
      } else if ('clientX' in event) {
        handlePointer(event.clientX);
      }
    },
    [disabled, enableHover, handlePointer]
  );

  const endDrag = useCallback(() => {
    if (!enableHover) setIsDragging(false);
  }, [enableHover]);

  useEffect(() => {
    if (!isDragging || enableHover || disabled) return undefined;

    const onMove = (e: MouseEvent) => {
      e.preventDefault();
      handlePointer(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX);
      }
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onUp);
    window.addEventListener('touchcancel', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('touchcancel', onUp);
    };
  }, [isDragging, enableHover, disabled, handlePointer]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const step = event.shiftKey ? 10 : 2;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault();
        updatePosition(sliderPosition - step);
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault();
        updatePosition(sliderPosition + step);
      } else if (event.key === 'Home') {
        event.preventDefault();
        updatePosition(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        updatePosition(100);
      }
    },
    [disabled, sliderPosition, updatePosition]
  );

  useEffect(() => {
    motionValue.set(initialPosition);
    setSliderPosition(initialPosition);
  }, [initialPosition, motionValue]);

  return (
    <ImageComparisonContext.Provider
      value={{
        sliderPosition,
        setSliderPosition: updatePosition,
        motionSliderPosition,
        disabled,
      }}
    >
      <div
        ref={containerRef}
        className={`bemo-21st-image-comparison ${className}`.trim()}
        data-disabled={disabled ? 'true' : undefined}
        data-enable-hover={enableHover ? 'true' : undefined}
        data-dragging={isDragging ? 'true' : undefined}
        onMouseMove={handleDrag}
        onMouseDown={startDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={handleDrag}
        onTouchStart={startDrag}
        onTouchEnd={endDrag}
        role="group"
        aria-labelledby={labelId}
        {...rest}
      >
        <span id={labelId} className="bemo-21st-image-comparison__sr-only">
          {ariaLabel}
        </span>
        {children}
        <div
          className="bemo-21st-image-comparison__slider-control"
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuetext={`${Math.round(sliderPosition)}%`}
          aria-label="Comparison position"
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
          style={{ left: `${sliderPosition}%` }}
        />
      </div>
    </ImageComparisonContext.Provider>
  );
}

export type TwentyFirstImageComparisonImageProps = {
  className?: string;
  alt: string;
  src: string;
  position: 'left' | 'right';
} & Omit<HTMLMotionProps<'img'>, 'alt' | 'src' | 'children'>;

function TwentyFirstImageComparisonImage({
  className = '',
  alt,
  src,
  position,
  ...rest
}: TwentyFirstImageComparisonImageProps) {
  const { motionSliderPosition } = useImageComparison();
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`
  );
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`bemo-21st-image-comparison__image bemo-21st-image-comparison__image--${position} ${className}`.trim()}
      style={{
        clipPath: position === 'left' ? leftClipPath : rightClipPath,
      }}
      draggable={false}
      {...rest}
    />
  );
}

export type TwentyFirstImageComparisonSliderProps = {
  className?: string;
  children?: ReactNode;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

function TwentyFirstImageComparisonSlider({
  className = '',
  children,
  ...rest
}: TwentyFirstImageComparisonSliderProps) {
  const { motionSliderPosition, disabled } = useImageComparison();
  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={`bemo-21st-image-comparison__slider ${className}`.trim()}
      style={{ left }}
      aria-hidden="true"
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const TwentyFirstImageComparisonWithSubs = Object.assign(
  TwentyFirstImageComparison,
  {
    Image: TwentyFirstImageComparisonImage,
    Slider: TwentyFirstImageComparisonSlider,
  }
);

export {
  TwentyFirstImageComparisonWithSubs as TwentyFirstImageComparison,
  TwentyFirstImageComparisonImage,
  TwentyFirstImageComparisonSlider,
};
export default TwentyFirstImageComparisonWithSubs;
