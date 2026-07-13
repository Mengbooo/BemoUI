import './KineticText.css';

export function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  disabled = false,
  ...rest
}) {
  const mergedStyle = {
    '--hover-padding': 'calc(1em / 12)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...(style || {}),
  };

  return (
    <Tag
      {...rest}
      className={['bemo-kinetic-text', disabled ? 'bemo-kinetic-text--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={mergedStyle}
      aria-disabled={disabled || undefined}
    >
      {String(text ?? '')
        .split('')
        .map((letter, i) => (
          <span key={i} aria-hidden="true" className="bemo-kinetic-text__letter">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      <span className="bemo-kinetic-text__sr-only">{text}</span>
    </Tag>
  );
}

export default KineticText;
