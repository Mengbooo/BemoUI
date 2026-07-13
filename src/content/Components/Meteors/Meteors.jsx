import { useEffect, useState } from 'react';
import './Meteors.css';

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className = '',
  ...props
}) {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const count = Math.max(0, Math.floor(Number(number) || 0));
    const styles = Array.from({ length: count }, () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      const duration =
        Math.random() * (maxDuration - minDuration) + minDuration;

      return {
        '--bemo-meteors-angle': `-${angle}deg`,
        top: '-5%',
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      };
    });

    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <div
      className={'bemo-meteors' + (className ? ' ' + className : '')}
      aria-hidden="true"
      {...props}
    >
      {meteorStyles.map((style, idx) => (
        <span key={idx} className="bemo-meteors__meteor" style={style}>
          <span className="bemo-meteors__tail" />
        </span>
      ))}
    </div>
  );
}

export default Meteors;
