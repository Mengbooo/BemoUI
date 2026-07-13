import {
  useEffect,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import './LightRays.css';

export interface LightRaysProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
}

type LightRay = {
  id: string;
  left: number;
  rotate: number;
  width: number;
  swing: number;
  delay: number;
  duration: number;
  intensity: number;
};

function createRays(count: number, cycle: number): LightRay[] {
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
}: LightRay) {
  const rayStyle = {
    '--ray-left': `${left}%`,
    '--ray-width': `${width}px`,
    '--ray-rotate': `${rotate}deg`,
    '--ray-swing': `${swing}deg`,
    '--ray-delay': `${delay}s`,
    '--ray-duration': `${duration}s`,
    '--ray-intensity': intensity,
  } as CSSProperties;

  return <div className="bemo-light-rays__ray" style={rayStyle} />;
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
}: LightRaysProps) {
  const [rays, setRays] = useState<LightRay[]>([]);
  const cycleDuration = Math.max(Number(speed) || 14, 0.1);
  const safeCount = Math.max(0, Math.min(Number(count) || 0, 32));

  useEffect(() => {
    setRays(createRays(safeCount, cycleDuration));
  }, [safeCount, cycleDuration]);

  const rootStyle = {
    '--bemo-light-rays-color': color,
    '--bemo-light-rays-blur': `${blur}px`,
    '--bemo-light-rays-length': length,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={['bemo-light-rays', className].filter(Boolean).join(' ')}
      style={rootStyle}
      aria-hidden="true"
      {...props}
    >
      <div className="bemo-light-rays__inner">
        <div className="bemo-light-rays__glow bemo-light-rays__glow--primary" />
        <div className="bemo-light-rays__glow bemo-light-rays__glow--secondary" />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} />
        ))}
      </div>
    </div>
  );
}
