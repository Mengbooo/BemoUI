import { useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ACCENTS = ['#1620E4', '#7BE9C6'];

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function Beam({ width, x, delay, duration, color, aspectRatio }) {
  const reduceMotion = useReducedMotion();

  const style = {
    '--x': `${x}`,
    '--width': `${width}`,
    '--aspect-ratio': `${aspectRatio}`,
    '--background': `linear-gradient(${color}, transparent)`,
  };

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        style={style}
        className="absolute top-1/4 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) -translate-x-1/2 opacity-35 [background:var(--background)]"
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      style={style}
      className="absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--background)]"
      initial={{ y: '100cqmax', x: '-50%' }}
      animate={{ y: '-100%', x: '-50%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
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
        beams.push({
          x,
          delay,
          color: ACCENTS[(i + sideSeed) % ACCENTS.length],
          aspectRatio: (((i + sideSeed) * 3) % 10) + 1,
        });
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
    '--perspective': `${perspective}px`,
    '--grid-color': gridColor,
    '--beam-size': `${beamSize}%`,
  };

  const sideGrid =
    'bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d';

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
    <div
      className={cx('relative rounded border border-neutral-200 bg-white p-20 text-neutral-900', className)}
      {...props}
    >
      <div
        aria-hidden="true"
        style={sceneStyle}
        className="@container-[size] pointer-events-none absolute inset-0 size-full overflow-hidden [clip-path:inset(0)] perspective-(--perspective) transform-3d"
      >
        <div
          className={cx(
            '@container absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] rotate-x-[-90deg]',
            sideGrid
          )}
        >
          {renderBeams(topBeams, 'top')}
        </div>
        <div
          className={cx(
            '@container absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] rotate-x-[-90deg]',
            sideGrid
          )}
        >
          {renderBeams(bottomBeams, 'bottom')}
        </div>
        <div
          className={cx(
            '@container absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] [transform:rotate(90deg)_rotateX(-90deg)]',
            sideGrid
          )}
        >
          {renderBeams(leftBeams, 'left')}
        </div>
        <div
          className={cx(
            '@container absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]',
            sideGrid
          )}
        >
          {renderBeams(rightBeams, 'right')}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/*
  Required global keyframes (Tailwind v4):
  Beam travel is driven by framer-motion, so no keyframes are required at runtime.
  Optional CSS-only fallback if framer-motion is unavailable:

  @keyframes bemo-warp-beam-travel {
    from { transform: translateX(-50%) translateY(100cqmax); }
    to { transform: translateX(-50%) translateY(-100%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .bemo-warp-beam { animation: none !important; }
  }
*/
