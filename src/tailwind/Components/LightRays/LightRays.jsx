import { useEffect, useState } from 'react';

function createRays(count, cycle) {
  if (count <= 0) return [];

  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 160 + Math.random() * 160;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.6 + Math.random() * 0.5;

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    };
  });
}

function Ray({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity,
}) {
  return (
    <div
      className="pointer-events-none absolute -top-[12%] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-[color-mix(in_srgb,var(--bemo-light-rays-color)_70%,transparent)] to-transparent opacity-0 mix-blend-screen blur-[length:var(--bemo-light-rays-blur)] h-[length:var(--bemo-light-rays-length)] w-[length:var(--ray-width)] left-[var(--ray-left)] animate-[bemo-light-rays-sway_var(--ray-duration)_ease-in-out_var(--ray-delay)_infinite] motion-reduce:animate-none motion-reduce:opacity-[calc(var(--ray-intensity)*0.35)] motion-reduce:rotate-[var(--ray-rotate)]"
      style={{
        '--ray-left': `${left}%`,
        '--ray-width': `${width}px`,
        '--ray-rotate': `${rotate}deg`,
        '--ray-swing': `${swing}deg`,
        '--ray-delay': `${delay}s`,
        '--ray-duration': `${duration}s`,
        '--ray-intensity': intensity,
      }}
    />
  );
}

export default function LightRays({
  className = '',
  style,
  count = 7,
  color = 'rgba(22, 32, 228, 0.35)',
  blur = 36,
  speed = 14,
  length = '70vh',
  ...props
}) {
  const [rays, setRays] = useState([]);
  const cycleDuration = Math.max(Number(speed) || 14, 0.1);
  const safeCount = Math.max(0, Math.min(Number(count) || 0, 32));

  useEffect(() => {
    setRays(createRays(safeCount, cycleDuration));
  }, [safeCount, cycleDuration]);

  return (
    <div
      className={['pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]', className]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--bemo-light-rays-color': color,
        '--bemo-light-rays-blur': `${blur}px`,
        '--bemo-light-rays-length': length,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--bemo-light-rays-color) 45%, transparent), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 80% 10%, color-mix(in srgb, #7BE9C6 28%, transparent), transparent 75%)',
          }}
        />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} />
        ))}
      </div>
    </div>
  );
}

/*
Required global Tailwind v4 keyframes (add to your CSS entry):

@keyframes bemo-light-rays-sway {
  0%, 100% {
    opacity: 0;
    transform: translateX(-50%) rotate(calc(var(--ray-rotate, 0deg) - var(--ray-swing, 1deg)));
  }
  50% {
    opacity: var(--ray-intensity, 0.7);
    transform: translateX(-50%) rotate(calc(var(--ray-rotate, 0deg) + var(--ray-swing, 1deg)));
  }
}
*/
