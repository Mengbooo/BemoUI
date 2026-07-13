import './BorderBeam.css';

export const BorderBeam = ({
  className = '',
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#1620E4',
  colorTo = '#7BE9C6',
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
  ...rest
}) => {
  const start = reverse ? `${100 - initialOffset}%` : `${initialOffset}%`;
  const end = reverse ? `${-initialOffset}%` : `${100 + initialOffset}%`;

  return (
    <div
      className="bemo-border-beam"
      style={{
        '--bemo-border-beam-width': `${borderWidth}px`,
      }}
      aria-hidden="true"
      {...rest}
    >
      <div
        className={['bemo-border-beam__beam', className].filter(Boolean).join(' ')}
        style={{
          width: size,
          '--bemo-border-beam-size': `${size}px`,
          '--bemo-border-beam-duration': `${duration}s`,
          '--bemo-border-beam-delay': `${-delay}s`,
          '--bemo-border-beam-from': colorFrom,
          '--bemo-border-beam-to': colorTo,
          '--bemo-border-beam-start': start,
          '--bemo-border-beam-end': end,
          ...style,
        }}
      />
    </div>
  );
};

export default BorderBeam;
