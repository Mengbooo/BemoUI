import './AnimatedShinyText.css';

export const AnimatedShinyText = ({
  children,
  className = '',
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={{
        '--bemo-shiny-width': `${shimmerWidth}px`,
      }}
      className={['bemo-animated-shiny-text', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
};
