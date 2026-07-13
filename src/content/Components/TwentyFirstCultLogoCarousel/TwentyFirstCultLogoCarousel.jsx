import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import './TwentyFirstCultLogoCarousel.css';

/**
 * @typedef {Object} LogoItem
 * @property {string} name
 * @property {string|number} id
 * @property {React.ComponentType<React.SVGProps<SVGSVGElement>>|React.ReactNode} [img]
 * @property {string} [src]
 * @property {string} [alt]
 */

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos, columnCount) => {
  if (!allLogos.length || columnCount < 1) return [];
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });
  const maxLength = Math.max(...columns.map((col) => col.length), 1);
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });
  return columns;
};

const DefaultLogo = ({ name, className }) => (
  <div className={`bemo-21st-cult-logo-carousel-default-logo ${className || ''}`.trim()} aria-hidden="true">
    <span className="bemo-21st-cult-logo-carousel-default-logo-text">{(name || 'Logo').slice(0, 2).toUpperCase()}</span>
  </div>
);

const LogoColumn = React.memo(({ logos, index, currentTime, cycleInterval, columnDelayMs, reducedMotion }) => {
  const columnDelay = index * columnDelayMs;
  const safeLength = Math.max(logos.length, 1);
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * safeLength);
  const currentIndex = Math.floor(adjustedTime / cycleInterval) % safeLength;
  const currentLogo = logos[currentIndex] || logos[0];

  const renderLogo = () => {
    if (!currentLogo) return null;
    if (typeof currentLogo.img === 'function') {
      const Icon = currentLogo.img;
      return <Icon className="bemo-21st-cult-logo-carousel-logo-img" aria-hidden="true" />;
    }
    if (React.isValidElement(currentLogo.img)) {
      return React.cloneElement(currentLogo.img, {
        className: `bemo-21st-cult-logo-carousel-logo-img ${currentLogo.img.props?.className || ''}`.trim(),
        'aria-hidden': true,
      });
    }
    if (currentLogo.src) {
      return (
        <img
          src={currentLogo.src}
          alt=""
          className="bemo-21st-cult-logo-carousel-logo-img"
          draggable={false}
        />
      );
    }
    return <DefaultLogo name={currentLogo.name} className="bemo-21st-cult-logo-carousel-logo-img" />;
  };

  if (reducedMotion) {
    return (
      <div className="bemo-21st-cult-logo-carousel-column" role="presentation">
        <div className="bemo-21st-cult-logo-carousel-logo-slot">
          {renderLogo()}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bemo-21st-cult-logo-carousel-column"
      role="presentation"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo?.id ?? currentIndex}-${currentIndex}`}
          className="bemo-21st-cult-logo-carousel-logo-slot"
          initial={{ y: '10%', opacity: 0, filter: 'blur(8px)' }}
          animate={{
            y: '0%',
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: '-20%',
            opacity: 0,
            filter: 'blur(6px)',
            transition: {
              type: 'tween',
              ease: 'easeIn',
              duration: 0.3,
            },
          }}
        >
          {renderLogo()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

LogoColumn.displayName = 'LogoColumn';

function TwentyFirstCultLogoCarousel({
  logos = [],
  columnCount = 2,
  cycleInterval = 2000,
  columnDelayMs = 200,
  tickMs = 100,
  className = '',
  'aria-label': ariaLabel = 'Partner logos carousel',
  paused = false,
  ...rest
}) {
  const reducedMotion = useReducedMotion();
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);

  const allLogos = useMemo(() => {
    if (Array.isArray(logos) && logos.length > 0) {
      return logos.map((logo, i) => ({
        name: logo.name || `Logo ${i + 1}`,
        id: logo.id ?? i,
        img: logo.img,
        src: logo.src,
        alt: logo.alt || logo.name || `Logo ${i + 1}`,
      }));
    }
    return [
      { name: 'Alpha', id: 1 },
      { name: 'Beta', id: 2 },
      { name: 'Gamma', id: 3 },
      { name: 'Delta', id: 4 },
      { name: 'Epsilon', id: 5 },
      { name: 'Zeta', id: 6 },
      { name: 'Eta', id: 7 },
      { name: 'Theta', id: 8 },
    ];
  }, [logos]);

  useEffect(() => {
    setLogoSets(distributeLogos(allLogos, Math.max(1, columnCount)));
  }, [allLogos, columnCount]);

  const updateTime = useCallback(() => {
    setCurrentTime((prev) => prev + tickMs);
  }, [tickMs]);

  useEffect(() => {
    if (paused || reducedMotion || !logoSets.length) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }
    intervalRef.current = setInterval(updateTime, tickMs);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [updateTime, tickMs, paused, reducedMotion, logoSets.length]);

  const rootClass = [
    'bemo-21st-cult-logo-carousel',
    reducedMotion ? 'bemo-21st-cult-logo-carousel--reduced' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      role="region"
      aria-label={ariaLabel}
      aria-live="off"
      {...rest}
    >
      <div className="bemo-21st-cult-logo-carousel-track">
        {logoSets.map((colLogos, index) => (
          <LogoColumn
            key={index}
            logos={colLogos}
            index={index}
            currentTime={currentTime}
            cycleInterval={cycleInterval}
            columnDelayMs={columnDelayMs}
            reducedMotion={!!reducedMotion}
          />
        ))}
      </div>
      <span className="bemo-21st-cult-logo-carousel-sr-only">
        {allLogos.map((l) => l.name).join(', ')}
      </span>
    </div>
  );
}

export default TwentyFirstCultLogoCarousel;
export { TwentyFirstCultLogoCarousel };
