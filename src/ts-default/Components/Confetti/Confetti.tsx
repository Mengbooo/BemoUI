import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react';
import './Confetti.css';

export type ConfettiOptions = {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  shapes?: Array<'square' | 'circle'>;
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

export type ConfettiGlobalOptions = {
  resize?: boolean;
};

export type ConfettiApi = {
  fire: (options?: ConfettiOptions) => Promise<void>;
};

export type ConfettiRef = ConfettiApi | null;

export type ConfettiProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

export type ConfettiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  options?: ConfettiOptions;
};

type Particle = {
  id: string;
  left: string;
  top: string;
  color: string;
  size: number;
  shape: 'square' | 'circle';
  tx: string;
  ty: string;
  rot: string;
  delay: string;
  duration: string;
};

type Burst = {
  id: string;
  particles: Particle[];
};

type ParticleStyle = CSSProperties & {
  '--bemo-confetti-tx'?: string;
  '--bemo-confetti-ty'?: string;
  '--bemo-confetti-rot'?: string;
  '--bemo-confetti-duration'?: string;
  '--bemo-confetti-delay'?: string;
};

const DEFAULT_COLORS = ['#1620E4', '#7BE9C6', '#FFFFFF', '#111827', '#9CA3AF'];
const DEFAULT_DURATION = 2200;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function buildParticles(
  options: ConfettiOptions = {},
  origin: { x: number; y: number } = { x: 0.5, y: 0.5 }
): Particle[] {
  if (options.disableForReducedMotion !== false && prefersReducedMotion()) {
    return [];
  }

  const count = options.particleCount ?? 60;
  const colors = options.colors ?? DEFAULT_COLORS;
  const shapes = options.shapes ?? (['square', 'circle'] as Array<'square' | 'circle'>);
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

const ConfettiContext = createContext<ConfettiApi>({ fire: async () => {} });

const Confetti = forwardRef<ConfettiRef, ConfettiProps>(function Confetti(props, ref) {
  const {
    options,
    globalOptions = { resize: true },
    manualstart = false,
    children,
    className = '',
    style,
    ...rest
  } = props;

  const [bursts, setBursts] = useState<Burst[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const fire = useCallback(
    async (opts: ConfettiOptions = {}) => {
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

  const api = useMemo<ConfettiApi>(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      void fire();
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
        className={['bemo-confetti', className].filter(Boolean).join(' ')}
        style={style}
        data-resize={globalOptions?.resize ? 'true' : 'false'}
        {...rest}
      >
        <div className="bemo-confetti__layer" aria-hidden="true">
          {bursts.map((burst) =>
            burst.particles.map((particle) => {
              const particleStyle: ParticleStyle = {
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.shape === 'circle' ? particle.size : particle.size * 0.55,
                backgroundColor: particle.color,
                '--bemo-confetti-tx': particle.tx,
                '--bemo-confetti-ty': particle.ty,
                '--bemo-confetti-rot': particle.rot,
                '--bemo-confetti-duration': particle.duration,
                '--bemo-confetti-delay': particle.delay,
              };

              return (
                <span
                  key={particle.id}
                  className={`bemo-confetti__particle bemo-confetti__particle--${particle.shape}`}
                  style={particleStyle}
                />
              );
            })
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
}: ConfettiButtonProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(
    () => () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    },
    []
  );

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
        className={['bemo-confetti-button', className].filter(Boolean).join(' ')}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
      {bursts.length > 0 ? (
        <div className="bemo-confetti__viewport" aria-hidden="true">
          {bursts.map((burst) =>
            burst.particles.map((particle) => {
              const particleStyle: ParticleStyle = {
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.shape === 'circle' ? particle.size : particle.size * 0.55,
                backgroundColor: particle.color,
                '--bemo-confetti-tx': particle.tx,
                '--bemo-confetti-ty': particle.ty,
                '--bemo-confetti-rot': particle.rot,
                '--bemo-confetti-duration': particle.duration,
                '--bemo-confetti-delay': particle.delay,
              };

              return (
                <span
                  key={particle.id}
                  className={`bemo-confetti__particle bemo-confetti__particle--${particle.shape}`}
                  style={particleStyle}
                />
              );
            })
          )}
        </div>
      ) : null}
    </>
  );
}

ConfettiButton.displayName = 'ConfettiButton';

export { Confetti, ConfettiButton, ConfettiContext };
export default Confetti;
