import {
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import './BlurFade.css';

export interface BlurFadeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

interface BlurFadeCSSVars extends CSSProperties {
  '--bemo-blur-fade-duration'?: string;
  '--bemo-blur-fade-delay'?: string;
  '--bemo-blur-fade-offset'?: string;
  '--bemo-blur-fade-blur'?: string;
}

export default function BlurFade({
  children,
  className = '',
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = 'down',
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setIsVisible(true);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: inViewMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, inViewMargin]);

  const directionClass: Record<
    NonNullable<BlurFadeProps['direction']>,
    string
  > = {
    up: 'bemo-blur-fade--up',
    down: 'bemo-blur-fade--down',
    left: 'bemo-blur-fade--left',
    right: 'bemo-blur-fade--right',
  };

  const style: BlurFadeCSSVars = {
    '--bemo-blur-fade-duration': `${duration}s`,
    '--bemo-blur-fade-delay': `${0.04 + delay}s`,
    '--bemo-blur-fade-offset': `${offset}px`,
    '--bemo-blur-fade-blur': blur,
  };

  return (
    <div
      ref={ref}
      className={[
        'bemo-blur-fade',
        directionClass[direction] ?? 'bemo-blur-fade--down',
        isVisible ? 'bemo-blur-fade--visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
