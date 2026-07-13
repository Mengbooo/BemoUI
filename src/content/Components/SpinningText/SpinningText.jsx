import { useMemo } from 'react';
import './SpinningText.css';

export function SpinningText({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  className = '',
  style,
  ...props
}) {
  const text = useMemo(() => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.filter((child) => typeof child === 'string').join('');
    }
    return '';
  }, [children]);

  const letters = useMemo(() => {
    const chars = text.split('');
    chars.push(' ');
    return chars;
  }, [text]);

  const rootClass = ['bemo-spinning-text', className].filter(Boolean).join(' ');
  const containerClass = [
    'bemo-spinning-text__container',
    reverse ? 'bemo-spinning-text__container--reverse' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{
        ...style,
        '--bemo-spinning-text-duration': `${Number(duration) || 10}s`,
        '--bemo-spinning-text-radius': Number(radius) || 5,
      }}
      {...props}
    >
      <div className={containerClass} aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${index}-${letter}`}
            className="bemo-spinning-text__letter"
            style={{
              '--bemo-spinning-text-index': index,
              '--bemo-spinning-text-total': letters.length,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      <span className="bemo-spinning-text__sr-only">{text}</span>
    </div>
  );
}

export default SpinningText;
