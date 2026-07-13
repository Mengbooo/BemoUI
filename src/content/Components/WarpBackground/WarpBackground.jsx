import { useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './WarpBackground.css';

const ACCENTS = ['#1620E4', '#7BE9C6'];

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function Beam({ width, x, delay, duration, color, aspectRatio }) {
  const reduceMotion = useReducedMotion();

  const style = {
    '--bemo-warp-x': `${x}`,
    '--bemo-warp-width': `${width}`,
    '--bemo-warp-aspect-ratio': `${aspectRatio}`,
    '--bemo-warp-beam-bg': `linear-gradient(${color}, transparent)`,
  };

  if (reduceMotion) {
    return (
      <div
        className="bemo-warp-background__beam bemo-warp-background__beam--static"
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className="bemo-warp-background__beam"
      style={style}
      initial={{ y: '100cqmax', x: '-50%' }}
      animate={{ y: '-100%', x: '-50%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      aria-hidden="true"
    />
  );
}

export default function WarpBackground({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = 'rgba(128, 128, 128, 0.35)',
  ...props
}) {
  const generateBeams = useCallback(
    (sideSeed = 0) => {
      const beams = [];
      const cellsPerSide = Math.max(1, Math.floor(100 / beamSize));
      const step = cellsPerSide / Math.max(1, beamsPerSide);

      for (let i = 0; i < beamsPerSide; i += 1) {
        const x = Math.floor(i * step);
        const t = (i + 1) / (beamsPerSide + 1);
        const delay =
          beamDelayMin +
          t * (beamDelayMax - beamDelayMin) +
          sideSeed * 0.17;
        const color = ACCENTS[(i + sideSeed) % ACCENTS.length];
        const aspectRatio = (((i + sideSeed) * 3) % 10) + 1;
        beams.push({ x, delay, color, aspectRatio });
      }
      return beams;
    },
    [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]
  );

  const topBeams = useMemo(() => generateBeams(0), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(1), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(2), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(3), [generateBeams]);

  const sceneStyle = {
    '--bemo-warp-perspective': `${perspective}px`,
    '--bemo-warp-grid-color': gridColor,
    '--bemo-warp-beam-size': `${beamSize}%`,
  };

  const renderBeams = (beams, side) =>
    beams.map((beam, index) => (
      <Beam
        key={`${side}-${index}`}
        width={`${beamSize}%`}
        x={`${beam.x * beamSize}%`}
        delay={beam.delay}
        duration={beamDuration}
        color={beam.color}
        aspectRatio={beam.aspectRatio}
      />
    ));

  return (
    <div className={cx('bemo-warp-background', className)} {...props}>
      <div
        className="bemo-warp-background__scene"
        style={sceneStyle}
        aria-hidden="true"
      >
        <div className="bemo-warp-background__side bemo-warp-background__side--top">
          {renderBeams(topBeams, 'top')}
        </div>
        <div className="bemo-warp-background__side bemo-warp-background__side--bottom">
          {renderBeams(bottomBeams, 'bottom')}
        </div>
        <div className="bemo-warp-background__side bemo-warp-background__side--left">
          {renderBeams(leftBeams, 'left')}
        </div>
        <div className="bemo-warp-background__side bemo-warp-background__side--right">
          {renderBeams(rightBeams, 'right')}
        </div>
      </div>
      <div className="bemo-warp-background__content">{children}</div>
    </div>
  );
}
