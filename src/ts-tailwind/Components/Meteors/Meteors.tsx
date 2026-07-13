import {
  useEffect,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';

export interface MeteorsProps extends HTMLAttributes<HTMLDivElement> {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

type MeteorStyle = CSSProperties & {
  '--bemo-meteors-angle': string;
};

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className = '',
  ...props
}: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);

  useEffect(() => {
    const count = Math.max(0, Math.floor(Number(number) || 0));
    const styles: MeteorStyle[] = Array.from({ length: count }, () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      const duration =
        Math.random() * (maxDuration - minDuration) + minDuration;

      return {
        '--bemo-meteors-angle': `-${angle}deg`,
        top: '-5%',
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      };
    });

    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <div
      className={
        'pointer-events-none absolute inset-0 overflow-hidden' +
        (className ? ' ' + className : '')
      }
      aria-hidden="true"
      {...props}
    >
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className="animate-bemo-meteor pointer-events-none absolute size-0.5 rounded-full bg-[#1620E4] shadow-[0_0_0_1px_rgba(22,32,228,0.12),0_0_8px_1px_rgba(123,233,198,0.65)] [transform:rotate(var(--bemo-meteors-angle))] motion-reduce:animate-none motion-reduce:opacity-0"
        >
          <span className="pointer-events-none absolute top-1/2 left-0 -z-10 h-px w-[3.125rem] -translate-y-1/2 bg-gradient-to-r from-[#1620E4] via-[#7BE9C6] to-transparent" />
        </span>
      ))}
    </div>
  );
}

export default Meteors;

/*
Required global Tailwind v4 keyframes (add to your CSS):

@theme {
  --animate-bemo-meteor: bemo-meteor 5s linear infinite;
}

@keyframes bemo-meteor {
  0% {
    transform: rotate(var(--bemo-meteors-angle)) translate3d(0, 0, 0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(var(--bemo-meteors-angle)) translate3d(-500px, 0, 0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-bemo-meteor {
    animation: none !important;
    opacity: 0;
  }
}
*/
