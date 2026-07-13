import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

const DEFAULT_COLORS = ['#1620E4', '#7BE9C6', '#FFFFFF', '#111827', '#9CA3AF'];
const DEFAULT_DURATION = 2200;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function buildParticles(options = {}, origin = { x: 0.5, y: 0.5 }) {
  if (options.disableForReducedMotion !== false && prefersReducedMotion()) {
    return [];
  }

  const count = options.particleCount ?? 60;
  const colors = options.colors ?? DEFAULT_COLORS;
  const shapes = options.shapes ?? ['square', 'circle'];
  const spread = options.spread ?? 70;
  const startVelocity = options.startVelocity ?? 42;
  const scalar = options.scalar ?? 1;
  const angle = options.angle ?? 90;
  const gravity = options.gravity ?? 1;
  const ticks = options.ticks ?? 200;
  const duration = Math.min(4000, Math.max(900, ticks * 12));

  return Array.from({ length: count }, (_, index) => {
    const theta = ((angle + randomInRange(-spread / 2, spread / 2)) * Math.PI) / 180;
    const velocity = startVelocity * randomInRange(0.45, 1);
    const dx = Math.cos(theta) * velocity * 4;
    const dy = -Math.sin(theta) * velocity * 4 + gravity * 120;

    return {
      id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      left: `${origin.x * 100}%`,
      top: `${origin.y * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: randomInRange(6, 11) * scalar,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      tx: `${dx}px`,
      ty: `${dy + randomInRange(80, 220)}px`,
      rot: `${randomInRange(-720, 720)}deg`,
      delay: `${randomInRange(0, 80)}ms`,
      duration: `${duration * randomInRange(0.85, 1.1)}ms`,
    };
  });
}

const ConfettiContext = createContext({ fire: async () => {} });

const Confetti = forwardRef(function Confetti(props, ref) {
  const {
    options,
    globalOptions = { resize: true },
    manualstart = false,
    children,
    className = '',
    style,
    ...rest
  } = props;

  const [bursts, setBursts] = useState([]);
  const timeoutsRef = useRef([]);

  const fire = useCallback(
    async (opts = {}) => {
      const merged = { ...options, ...opts };
      const origin = {
        x: merged.origin?.x ?? 0.5,
        y: merged.origin?.y ?? 0.5,
      };
      const particles = buildParticles(merged, origin);
      if (!particles.length) return;

      const burstId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setBursts((prev) => [...prev, { id: burstId, particles }]);

      const timeoutId = window.setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== burstId));
      }, DEFAULT_DURATION + 400);
      timeoutsRef.current.push(timeoutId);
    },
    [options]
  );

  const api = useMemo(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  useEffect(
    () => () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    },
    []
  );

  return (
    <ConfettiContext.Provider value={api}>
      <div
        className={['relative block w-full min-h-48 overflow-hidden isolate', className]
          .filter(Boolean)
          .join(' ')}
        style={style}
        data-resize={globalOptions?.resize ? 'true' : 'false'}
        {...rest}
      >
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
          {bursts.map((burst) =>
            burst.particles.map((particle) => (
              <span
                key={particle.id}
                className={
                  particle.shape === 'circle'
                    ? 'pointer-events-none absolute block rounded-full motion-reduce:animate-none motion-reduce:opacity-0 animate-[bemo-confetti-burst_var(--bemo-confetti-duration)_cubic-bezier(0.16,1,0.3,1)_forwards]'
                    : 'pointer-events-none absolute block rounded-sm motion-reduce:animate-none motion-reduce:opacity-0 animate-[bemo-confetti-burst_var(--bemo-confetti-duration)_cubic-bezier(0.16,1,0.3,1)_forwards]'
                }
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.shape === 'circle' ? particle.size : particle.size * 0.55,
                  backgroundColor: particle.color,
                  animationDelay: particle.delay,
                  ['--bemo-confetti-tx']: particle.tx,
                  ['--bemo-confetti-ty']: particle.ty,
                  ['--bemo-confetti-rot']: particle.rot,
                  ['--bemo-confetti-duration']: particle.duration,
                }}
              />
            ))
          )}
        </div>
        {children}
      </div>
    </ConfettiContext.Provider>
  );
});

Confetti.displayName = 'Confetti';

function ConfettiButton({
  options,
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const [bursts, setBursts] = useState([]);
  const timeoutsRef = useRef([]);

  useEffect(
    () => () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    },
    []
  );

  const handleClick = async (event) => {
    if (disabled) return;
    onClick?.(event);
    if (event.defaultPrevented) return;

    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };
      const particles = buildParticles(
        {
          particleCount: 60,
          spread: 70,
          colors: DEFAULT_COLORS,
          ...options,
        },
        origin
      );
      if (!particles.length) return;

      const burstId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setBursts((prev) => [...prev, { id: burstId, particles }]);
      const timeoutId = window.setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== burstId));
      }, DEFAULT_DURATION + 400);
      timeoutsRef.current.push(timeoutId);
    } catch (error) {
      console.error('Confetti button error:', error);
    }
  };

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        className={[
          'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#1620E4] bg-[#1620E4] px-4 py-2 font-semibold text-white transition',
          'hover:enabled:border-[#1118b8] hover:enabled:bg-[#1118b8]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BE9C6]',
          'disabled:cursor-not-allowed disabled:opacity-55',
          'motion-reduce:transition-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </button>
      {bursts.length > 0 ? (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] h-full w-full overflow-hidden"
          aria-hidden="true"
        >
          {bursts.map((burst) =>
            burst.particles.map((particle) => (
              <span
                key={particle.id}
                className={
                  particle.shape === 'circle'
                    ? 'pointer-events-none absolute block rounded-full motion-reduce:animate-none motion-reduce:opacity-0 animate-[bemo-confetti-burst_var(--bemo-confetti-duration)_cubic-bezier(0.16,1,0.3,1)_forwards]'
                    : 'pointer-events-none absolute block rounded-sm motion-reduce:animate-none motion-reduce:opacity-0 animate-[bemo-confetti-burst_var(--bemo-confetti-duration)_cubic-bezier(0.16,1,0.3,1)_forwards]'
                }
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.shape === 'circle' ? particle.size : particle.size * 0.55,
                  backgroundColor: particle.color,
                  animationDelay: particle.delay,
                  ['--bemo-confetti-tx']: particle.tx,
                  ['--bemo-confetti-ty']: particle.ty,
                  ['--bemo-confetti-rot']: particle.rot,
                  ['--bemo-confetti-duration']: particle.duration,
                }}
              />
            ))
          )}
        </div>
      ) : null}
    </>
  );
}

ConfettiButton.displayName = 'ConfettiButton';

export { Confetti, ConfettiButton, ConfettiContext };
export default Confetti;

/*
Required global Tailwind v4 keyframes (add once in your global CSS):

@keyframes bemo-confetti-burst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--bemo-confetti-tx), var(--bemo-confetti-ty))
      rotate(var(--bemo-confetti-rot)) scale(0.85);
  }
}
*/
