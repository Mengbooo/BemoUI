import { useRef, useState, useEffect } from 'react';
import './BlurFade.css';

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
}) {
  const ref = useRef(null);
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

  const directionClass =
    {
      up: 'bemo-blur-fade--up',
      down: 'bemo-blur-fade--down',
      left: 'bemo-blur-fade--left',
      right: 'bemo-blur-fade--right',
    }[direction] || 'bemo-blur-fade--down';

  return (
    <div
      ref={ref}
      className={[
        'bemo-blur-fade',
        directionClass,
        isVisible ? 'bemo-blur-fade--visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--bemo-blur-fade-duration': `${duration}s`,
        '--bemo-blur-fade-delay': `${0.04 + delay}s`,
        '--bemo-blur-fade-offset': `${offset}px`,
        '--bemo-blur-fade-blur': blur,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
