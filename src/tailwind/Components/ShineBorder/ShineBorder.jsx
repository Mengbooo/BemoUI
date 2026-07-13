
/**
 * ShineBorder
 * Animated decorative border shine effect (Tailwind v4).
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
      className={`pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-[bemo-shine-border-shine_var(--bemo-shine-border-duration,14s)_linear_infinite] ${className}`.trim()}
      style={{
        '--bemo-shine-border-width': `${Number(borderWidth) || 1}px`,
        '--bemo-shine-border-duration': `${Number(duration) || 14}s`,
        padding: 'var(--bemo-shine-border-width)',
        backgroundImage: `radial-gradient(transparent,transparent, ${colors},transparent,transparent)`,
        backgroundSize: '300% 300%',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        ...style,
      }}
      {...props}
    />
  );
}

export default ShineBorder;

/*
 * Required global keyframes (add to your global CSS or Tailwind v4 entry):
 *
 * @keyframes bemo-shine-border-shine {
 *   0% { background-position: 0% 0%; }
 *   50% { background-position: 100% 100%; }
 *   100% { background-position: 0% 0%; }
 * }
 *
 * Optional Tailwind v4 theme registration:
 * @theme {
 *   --animate-bemo-shine-border-shine: bemo-shine-border-shine var(--bemo-shine-border-duration, 14s) linear infinite;
 * }
 */
