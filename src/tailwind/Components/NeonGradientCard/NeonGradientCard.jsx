
const DEFAULT_NEON_COLORS = {
  firstColor: '#1620E4',
  secondColor: '#7BE9C6',
};

const NeonGradientCard = ({
  className = '',
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = DEFAULT_NEON_COLORS,
  ...props
}) => {
  const colors = {
    firstColor: neonColors?.firstColor || DEFAULT_NEON_COLORS.firstColor,
    secondColor: neonColors?.secondColor || DEFAULT_NEON_COLORS.secondColor,
  };

  const style = {
    '--border-size': `${Math.max(0, borderSize)}px`,
    '--border-radius': `${Math.max(0, borderRadius)}px`,
    '--neon-first-color': colors.firstColor,
    '--neon-second-color': colors.secondColor,
    '--card-content-radius': `${Math.max(0, borderRadius - borderSize)}px`,
  };

  return (
    <div
      className={['relative z-10 size-full rounded-[var(--border-radius)]', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      <div
        className={[
          'relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-gray-100 p-6 break-words dark:bg-neutral-900',
          "before:absolute before:-inset-[var(--border-size)] before:-z-10 before:block before:rounded-[var(--border-radius)] before:content-['']",
          'before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%]',
          'before:animate-[bemo-neon-background-position-spin_3s_linear_infinite]',
          "after:absolute after:-inset-[var(--border-size)] after:-z-10 after:block after:rounded-[var(--border-radius)] after:content-[''] after:blur-[40px]",
          'after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80',
          'after:animate-[bemo-neon-background-position-spin_3s_linear_infinite]',
          'motion-reduce:before:animate-none motion-reduce:after:animate-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1620E4]',
          'aria-disabled:pointer-events-none aria-disabled:opacity-60',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

export default NeonGradientCard;

/* Required global keyframes (add once to your global CSS):
@keyframes bemo-neon-background-position-spin {
  0% { background-position: top center; }
  100% { background-position: bottom center; }
}
*/
