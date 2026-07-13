import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import './ScrollBasedVelocity.css';

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ScrollVelocityContext = createContext(null);

export function ScrollBasedVelocity({ children, className = '', ...props }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div
        className={`bemo-scroll-based-velocity${className ? ` ${className}` : ''}`}
        {...props}
      >
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  );
}

export function ScrollBasedVelocityRow(props) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext);
  if (sharedVelocityFactor) {
    return (
      <ScrollBasedVelocityRowImpl
        {...props}
        velocityFactor={sharedVelocityFactor}
      />
    );
  }
  return <ScrollBasedVelocityRowLocal {...props} />;
}

function ScrollBasedVelocityRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className = '',
  velocityFactor,
  scrollReactivity = true,
  ...props
}) {
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const [numCopies, setNumCopies] = useState(1);

  const baseX = useMotionValue(0);
  const baseDirectionRef = useRef(direction >= 0 ? 1 : -1);
  const currentDirectionRef = useRef(direction >= 0 ? 1 : -1);
  const unitWidth = useMotionValue(0);

  const isInViewRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    baseDirectionRef.current = direction >= 0 ? 1 : -1;
    currentDirectionRef.current = direction >= 0 ? 1 : -1;
  }, [direction]);

  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    let ro = null;
    let io = null;
    let mq = null;

    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === 'visible';
    };

    const handlePRM = () => {
      if (mq) {
        prefersReducedMotionRef.current = mq.matches;
      }
    };

    if (container && block) {
      const updateSizes = () => {
        const cw = container.offsetWidth || 0;
        const bw = block.scrollWidth || 0;
        unitWidth.set(bw);
        const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1;
        setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies));
      };

      updateSizes();

      ro = new ResizeObserver(updateSizes);
      ro.observe(container);
      ro.observe(block);

      io = new IntersectionObserver(([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      });
      io.observe(container);

      document.addEventListener('visibilitychange', handleVisibility, {
        passive: true,
      });
      handleVisibility();

      mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', handlePRM);
      } else if (typeof mq.addListener === 'function') {
        mq.addListener(handlePRM);
      }
      handlePRM();
    }

    return () => {
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      if (mq) {
        if (typeof mq.removeEventListener === 'function') {
          mq.removeEventListener('change', handlePRM);
        } else if (typeof mq.removeListener === 'function') {
          mq.removeListener(handlePRM);
        }
      }
    };
  }, [children, unitWidth]);

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1;
    const offset = Number(v) || 0;
    return `${-wrap(0, width, offset)}px`;
  });

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return;
    const dt = delta / 1000;
    const vf = scrollReactivity ? velocityFactor.get() : 0;
    const absVf = Math.min(5, Math.abs(vf));
    const speedMultiplier = prefersReducedMotionRef.current ? 1 : 1 + absVf;

    if (absVf > 0.1) {
      const scrollDirection = vf >= 0 ? 1 : -1;
      currentDirectionRef.current = baseDirectionRef.current * scrollDirection;
    }

    const bw = unitWidth.get() || 0;
    if (bw <= 0) return;
    const pixelsPerSecond = (bw * baseVelocity) / 100;
    const moveBy =
      currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className={`bemo-scroll-based-velocity__row${className ? ` ${className}` : ''}`}
      {...props}
    >
      <motion.div className="bemo-scroll-based-velocity__track" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            aria-hidden={i !== 0 ? true : undefined}
            className="bemo-scroll-based-velocity__block"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ScrollBasedVelocityRowLocal(props) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });
  return (
    <ScrollBasedVelocityRowImpl
      {...props}
      velocityFactor={localVelocityFactor}
    />
  );
}

export default ScrollBasedVelocity;
