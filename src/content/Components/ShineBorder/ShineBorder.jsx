import './ShineBorder.css';

/**
 * ShineBorder
 * Animated decorative border shine effect.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = ['#1620E4', '#7BE9C6'],
  className = '',
  style,
  ...props
}) {
  const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor;

  return (
    <div
      aria-hidden="true"
      className={`bemo-shine-border${className ? ` ${className}` : ''}`}
      style={{
        '--bemo-shine-border-width': `${Number(borderWidth) || 1}px`,
        '--bemo-shine-border-duration': `${Number(duration) || 14}s`,
        '--bemo-shine-border-colors': colors,
        ...style,
      }}
      {...props}
    />
  );
}

export default ShineBorder;
