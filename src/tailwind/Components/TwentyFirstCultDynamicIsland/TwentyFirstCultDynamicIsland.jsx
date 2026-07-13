/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useWillChange } from 'framer-motion';

const stiffness = 400;
const damping = 30;
const MIN_WIDTH = 691;
const MAX_HEIGHT_MOBILE_ULTRA = 400;
const MAX_HEIGHT_MOBILE_MASSIVE = 700;

const min = (a, b) => (a < b ? a : b);

export const SIZE_PRESETS = {
  RESET: 'reset',
  EMPTY: 'empty',
  DEFAULT: 'default',
  COMPACT: 'compact',
  COMPACT_LONG: 'compactLong',
  LARGE: 'large',
  LONG: 'long',
  MINIMAL_LEADING: 'minimalLeading',
  MINIMAL_TRAILING: 'minimalTrailing',
  COMPACT_MEDIUM: 'compactMedium',
  MEDIUM: 'medium',
  TALL: 'tall',
  ULTRA: 'ultra',
  MASSIVE: 'massive',
};

const DynamicIslandSizePresets = {
  [SIZE_PRESETS.RESET]: { width: 150, aspectRatio: 1, borderRadius: 20 },
  [SIZE_PRESETS.EMPTY]: { width: 0, aspectRatio: 0, borderRadius: 0 },
  [SIZE_PRESETS.DEFAULT]: { width: 150, aspectRatio: 44 / 150, borderRadius: 46 },
  [SIZE_PRESETS.MINIMAL_LEADING]: { width: 52.33, aspectRatio: 44 / 52.33, borderRadius: 22 },
  [SIZE_PRESETS.MINIMAL_TRAILING]: { width: 52.33, aspectRatio: 44 / 52.33, borderRadius: 22 },
  [SIZE_PRESETS.COMPACT]: { width: 235, aspectRatio: 44 / 235, borderRadius: 46 },
  [SIZE_PRESETS.COMPACT_LONG]: { width: 300, aspectRatio: 44 / 235, borderRadius: 46 },
  [SIZE_PRESETS.COMPACT_MEDIUM]: { width: 351, aspectRatio: 64 / 371, borderRadius: 44 },
  [SIZE_PRESETS.LONG]: { width: 371, aspectRatio: 84 / 371, borderRadius: 42 },
  [SIZE_PRESETS.MEDIUM]: { width: 371, aspectRatio: 210 / 371, borderRadius: 22 },
  [SIZE_PRESETS.LARGE]: { width: 371, aspectRatio: 84 / 371, borderRadius: 42 },
  [SIZE_PRESETS.TALL]: { width: 371, aspectRatio: 210 / 371, borderRadius: 42 },
  [SIZE_PRESETS.ULTRA]: { width: 630, aspectRatio: 630 / 800, borderRadius: 42 },
  [SIZE_PRESETS.MASSIVE]: { width: 891, height: 1900, aspectRatio: 891 / 891, borderRadius: 42 },
};

const BlobContext = createContext(undefined);

const blobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SIZE':
      return { ...state, size: action.newSize, previousSize: state.size, isAnimating: false };
    case 'SCHEDULE_ANIMATION':
      return {
        ...state,
        animationQueue: action.animationSteps,
        isAnimating: action.animationSteps.length > 0,
      };
    case 'INITIALIZE':
      return {
        ...state,
        size: action.firstState,
        previousSize: SIZE_PRESETS.EMPTY,
        isAnimating: false,
      };
    case 'ANIMATION_END':
      return { ...state, isAnimating: false };
    default:
      return state;
  }
};

export function DynamicIslandProvider({
  children,
  initialSize = SIZE_PRESETS.DEFAULT,
  initialAnimation = [],
}) {
  const initialState = {
    size: initialSize,
    previousSize: SIZE_PRESETS.EMPTY,
    animationQueue: initialAnimation,
    isAnimating: initialAnimation.length > 0,
  };

  const [state, dispatch] = useReducer(blobReducer, initialState);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (state.animationQueue.length === 0) return undefined;

    let cancelled = false;
    const processQueue = async () => {
      for (const step of state.animationQueue) {
        if (cancelled) return;
        await new Promise((resolve) => {
          const id = setTimeout(resolve, step.delay);
          timeoutsRef.current.push(id);
        });
        if (cancelled) return;
        dispatch({ type: 'SET_SIZE', newSize: step.size });
      }
      if (!cancelled) dispatch({ type: 'ANIMATION_END' });
    };
    processQueue();
    return () => {
      cancelled = true;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [state.animationQueue]);

  const setSize = useCallback(
    (newSize) => {
      if (state.previousSize !== newSize && newSize !== state.size) {
        dispatch({ type: 'SET_SIZE', newSize });
      }
    },
    [state.previousSize, state.size]
  );

  const scheduleAnimation = useCallback((animationSteps) => {
    dispatch({ type: 'SCHEDULE_ANIMATION', animationSteps });
  }, []);

  return (
    <BlobContext.Provider
      value={{
        state,
        dispatch,
        setSize,
        scheduleAnimation,
        presets: DynamicIslandSizePresets,
      }}
    >
      {children}
    </BlobContext.Provider>
  );
}

export function useDynamicIslandSize() {
  const context = useContext(BlobContext);
  if (!context) {
    throw new Error('useDynamicIslandSize must be used within a DynamicIslandProvider');
  }
  return context;
}

export function useScheduledAnimations(animations) {
  const { scheduleAnimation } = useDynamicIslandSize();
  const animationsRef = useRef(animations);
  useEffect(() => {
    animationsRef.current = animations;
  }, [animations]);
  useEffect(() => {
    scheduleAnimation(animationsRef.current);
  }, [scheduleAnimation]);
}

function calculateDimensions(size, screenSize, currentSize) {
  if (size === 'massive' && screenSize === 'mobile') {
    return { width: '350px', height: MAX_HEIGHT_MOBILE_MASSIVE };
  }
  if (size === 'ultra' && screenSize === 'mobile') {
    return { width: '350px', height: MAX_HEIGHT_MOBILE_ULTRA };
  }
  const width = min(currentSize.width, MIN_WIDTH);
  const height =
    currentSize.height != null ? currentSize.height : currentSize.aspectRatio * width;
  return { width: `${width}px`, height };
}

function DynamicIslandContent({
  children,
  id,
  willChange,
  screenSize,
  className = '',
  style,
  reducedMotion,
  ...props
}) {
  const { state, presets } = useDynamicIslandSize();
  const currentSize = presets[state.size];
  const dimensions = calculateDimensions(state.size, screenSize, currentSize);
  const springTransition = reducedMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness, damping };

  return (
    <motion.div
      id={id}
      role="region"
      aria-live="polite"
      className={`mx-auto flex h-0 w-0 items-center justify-center overflow-hidden border border-black/10 bg-black text-center text-white transition duration-300 ease-in-out focus-within:bg-neutral-900 focus-within:shadow-[0_0_0_2px_#1620E4,0_0_0_4px_rgba(22,32,228,0.35)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7BE9C6] disabled:pointer-events-none disabled:opacity-55 dark:border-white/5 dark:focus-within:bg-black ${className}`.trim()}
      animate={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: currentSize.borderRadius,
        transition: springTransition,
      }}
      style={{ willChange, ...style }}
      {...props}
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </motion.div>
  );
}

export function DynamicIsland({
  children,
  id = 'bemo-dynamic-island',
  className = '',
  ...props
}) {
  const willChange = useWillChange();
  const [screenSize, setScreenSize] = useState('desktop');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) setScreenSize('mobile');
      else if (window.innerWidth <= 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className={`z-10 flex h-full w-full items-end justify-center bg-transparent ${className}`.trim()}>
      <DynamicIslandContent
        id={id}
        willChange={willChange}
        screenSize={screenSize}
        reducedMotion={reducedMotion}
        {...props}
      >
        {children}
      </DynamicIslandContent>
    </div>
  );
}

export function DynamicContainer({ className = '', children }) {
  const willChange = useWillChange();
  const { state } = useDynamicIslandSize();
  const { size, previousSize } = state;
  const isSizeChanged = size !== previousSize;
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const transition = reducedMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness, damping, duration: isSizeChanged ? 0.5 : 0.8 };

  return (
    <motion.div
      initial={{
        opacity: size === previousSize ? 1 : 0,
        scale: size === previousSize ? 1 : 0.9,
        y: size === previousSize ? 0 : 5,
      }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={transition}
      exit={{
        opacity: 0,
        filter: reducedMotion ? 'none' : 'blur(10px)',
        scale: 0.95,
        y: 20,
      }}
      style={{ willChange }}
      className={`flex h-full w-full flex-col items-stretch justify-center ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}

export function DynamicDiv({ className = '', children }) {
  const { state } = useDynamicIslandSize();
  const { size, previousSize } = state;
  const willChange = useWillChange();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const spring = reducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness, damping };

  return (
    <motion.div
      initial={{
        opacity: size === previousSize ? 1 : 0,
        scale: size === previousSize ? 1 : 0.9,
      }}
      animate={{
        opacity: size === previousSize ? 0 : 1,
        scale: size === previousSize ? 0.9 : 1,
        transition: spring,
      }}
      exit={{ opacity: 0, filter: reducedMotion ? 'none' : 'blur(10px)', scale: 0 }}
      style={{ willChange }}
      className={`flex items-center justify-center ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}

export function DynamicTitle({ className = '', children }) {
  const { state } = useDynamicIslandSize();
  const { size, previousSize } = state;
  const willChange = useWillChange();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const spring = reducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness, damping };

  return (
    <motion.h3
      className={`m-0 text-sm font-semibold leading-tight tracking-tight text-white ${className}`.trim()}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: size === previousSize ? 0 : 1,
        scale: size === previousSize ? 0.9 : 1,
        transition: spring,
      }}
      style={{ willChange }}
    >
      {children}
    </motion.h3>
  );
}

export function DynamicDescription({ className = '', children }) {
  const { state } = useDynamicIslandSize();
  const { size, previousSize } = state;
  const willChange = useWillChange();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const spring = reducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness, damping };

  return (
    <motion.p
      className={`m-0 text-xs font-normal leading-snug text-white/75 ${className}`.trim()}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: size === previousSize ? 0 : 1,
        scale: size === previousSize ? 0.9 : 1,
        transition: spring,
      }}
      style={{ willChange }}
    >
      {children}
    </motion.p>
  );
}

export { stiffness, damping, DynamicIslandSizePresets, BlobContext };

function TwentyFirstCultDynamicIsland({
  children,
  id,
  className,
  initialSize,
  initialAnimation,
  ...props
}) {
  return (
    <DynamicIslandProvider initialSize={initialSize} initialAnimation={initialAnimation}>
      <DynamicIsland id={id} className={className} {...props}>
        {children}
      </DynamicIsland>
    </DynamicIslandProvider>
  );
}

export default TwentyFirstCultDynamicIsland;
export { TwentyFirstCultDynamicIsland };

/* Tailwind v4 keyframes (if needed in @theme / CSS):
@keyframes bemo-21st-cult-dynamic-island-fade {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
*/
