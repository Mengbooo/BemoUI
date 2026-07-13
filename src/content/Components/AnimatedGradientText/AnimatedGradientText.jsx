import './AnimatedGradientText.css';

export function AnimatedGradientText({
  children,
  className = '',
  speed = 1,
  colorFrom = '#1620E4',
  colorTo = '#7BE9C6',
  style,
  ...props
}) {
  const safeSpeed = typeof speed === 'number' && Number.isFinite(speed) && speed > 0 ? speed : 1;

  return (
    <span
      className={['bemo-animated-gradient-text', className].filter(Boolean).join(' ')}
      style={{
        '--bemo-agt-bg-size': `${safeSpeed * 300}%`,
        '--bemo-agt-color-from': colorFrom,
        '--bemo-agt-color-to': colorTo,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

export default AnimatedGradientText;
