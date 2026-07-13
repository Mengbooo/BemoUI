import React, { useMemo, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

export interface SpinningTextProps extends ComponentPropsWithoutRef<'div'> {
  children: string | string[];
  duration?: number;
  reverse?: boolean;
  radius?: number;
}

export function SpinningText({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  className = '',
  style,
  ...props
}: SpinningTextProps) {
  const text = useMemo(() => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.filter((child): child is string => typeof child === 'string').join('');
    }
    return '';
  }, [children]);

  const letters = useMemo(() => {
    const chars = text.split('');
    chars.push(' ');
    return chars;
  }, [text]);

  const safeDuration = Number(duration) || 10;
  const safeRadius = Number(radius) || 5;
  const spinClass = reverse
    ? 'animate-[bemo-spinning-text-spin-reverse_var(--bemo-spinning-text-duration)_linear_infinite]'
    : 'animate-[bemo-spinning-text-spin_var(--bemo-spinning-text-duration)_linear_infinite]';

  const rootStyle: CSSProperties & Record<string, string | number> = {
    ...(style as CSSProperties),
    width: `calc(${safeRadius} * 2ch + 2ch)`,
    height: `calc(${safeRadius} * 2ch + 2ch)`,
    '--bemo-spinning-text-duration': `${safeDuration}s`,
    '--bemo-spinning-text-radius': safeRadius,
  };

  return (
    <div
      className={[
        'relative inline-flex items-center justify-center font-semibold leading-none text-[#1620E4] select-none',
        'motion-reduce:w-auto motion-reduce:h-auto',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={rootStyle}
      {...props}
    >
      <div
        className={[
          'absolute inset-0',
          spinClass,
          'motion-reduce:static motion-reduce:animate-none',
        ].join(' ')}
        aria-hidden="true"
      >
        {letters.map((letter, index) => (
          <span
            key={`${index}-${letter}`}
            className="absolute top-1/2 left-1/2 inline-block origin-center whitespace-pre motion-reduce:static motion-reduce:translate-none"
            style={
              {
                '--bemo-spinning-text-index': index,
                '--bemo-spinning-text-total': letters.length,
                transform:
                  'translate(-50%, -50%) rotate(calc(360deg / var(--bemo-spinning-text-total) * var(--bemo-spinning-text-index))) translateY(calc(var(--bemo-spinning-text-radius) * -1ch))',
              } as CSSProperties
            }
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}

export default SpinningText;

/*
Required global Tailwind v4 keyframes:

@keyframes bemo-spinning-text-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bemo-spinning-text-spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
*/
