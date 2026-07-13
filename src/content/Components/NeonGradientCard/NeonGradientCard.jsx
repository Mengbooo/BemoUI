import './NeonGradientCard.css';

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
    '--bemo-neon-border-size': `${Math.max(0, borderSize)}px`,
    '--bemo-neon-border-radius': `${Math.max(0, borderRadius)}px`,
    '--bemo-neon-first-color': colors.firstColor,
    '--bemo-neon-second-color': colors.secondColor,
  };

  return (
    <div
      className={['bemo-neon-gradient-card', className].filter(Boolean).join(' ')}
      style={style}
      {...props}
    >
      <div className="bemo-neon-gradient-card__content">{children}</div>
    </div>
  );
};

export default NeonGradientCard;
