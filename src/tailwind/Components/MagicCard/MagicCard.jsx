import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const DEFAULT_GRADIENT_FROM = '#1620E4';
const DEFAULT_GRADIENT_TO = '#7BE9C6';

export function MagicCard({
  children,
  className = '',
  gradientSize = 200,
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  gradientFrom = DEFAULT_GRADIENT_FROM,
  gradientTo = DEFAULT_GRADIENT_TO,
  mode = 'gradient',
  glowFrom = DEFAULT_GRADIENT_FROM,
  glowTo = DEFAULT_GRADIENT_TO,
  glowAngle = 90,
  glowSize = 420,
  glowBlur = 60,
  glowOpacity = 0.9,
  disabled = false,
  ...rest
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });

  const modeRef = useRef(mode);
  const glowOpacityRef = useRef(glowOpacity);
  const gradientSizeRef = useRef(gradientSize);
  const reduceMotionRef = useRef(reduceMotion);
  const disabledRef = useRef(disabled);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  useEffect(() => {
    reduceMotionRef.current = reduceMotion;
  }, [reduceMotion]);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const colorMq = window.matchMedia('(prefers-color-scheme: dark)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncColor = () => setIsDarkTheme(colorMq.matches);
    const syncMotion = () => setReduceMotion(motionMq.matches);

    syncColor();
    syncMotion();

    colorMq.addEventListener('change', syncColor);
    motionMq.addEventListener('change', syncMotion);

    return () => {
      colorMq.removeEventListener('change', syncColor);
      motionMq.removeEventListener('change', syncMotion);
    };
  }, []);

  const reset = useCallback(
    (reason = 'leave') => {
      if (modeRef.current === 'orb') {
        if (reason === 'enter' && !reduceMotionRef.current && !disabledRef.current) {
          orbVisible.set(glowOpacityRef.current);
        } else {
          orbVisible.set(0);
        }
        return;
      }

      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, orbVisible]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (disabledRef.current || reduceMotionRef.current) return;
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset('init');
  }, [reset]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleGlobalPointerOut = (event) => {
      if (!event.relatedTarget) reset('global');
    };
    const handleBlur = () => reset('global');
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') reset('global');
    };

    window.addEventListener('pointerout', handleGlobalPointerOut);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointerout', handleGlobalPointerOut);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reset]);

  const borderBackground = useMotionTemplate`linear-gradient(var(--bemo-magic-card-surface, #ffffff) 0 0) padding-box, radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, var(--bemo-magic-card-border, #e5e5e5) 100%) border-box`;

  const spotlightBackground = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`;

  const rootClass = [
    'group relative isolate overflow-hidden rounded-[inherit] border border-transparent outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]',
    disabled ? 'pointer-events-none opacity-60' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={rootClass}
      style={{
        background: borderBackground,
        ['--bemo-magic-card-surface']: isDarkTheme ? '#0a0a0a' : '#ffffff',
        ['--bemo-magic-card-border']: isDarkTheme ? '#262626' : '#e5e5e5',
      }}
      onPointerMove={disabled || reduceMotion ? undefined : handlePointerMove}
      onPointerLeave={disabled || reduceMotion ? undefined : () => reset('leave')}
      onPointerEnter={disabled || reduceMotion ? undefined : () => reset('enter')}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <div className="absolute inset-px z-20 rounded-[inherit] bg-[var(--bemo-magic-card-surface,#ffffff)] dark:bg-[var(--bemo-magic-card-surface,#0a0a0a)]" />

      {mode === 'gradient' && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:hidden"
          style={{
            background: spotlightBackground,
            opacity: gradientOpacity,
          }}
        />
      )}

      {mode === 'orb' && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-30 motion-reduce:hidden"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: '-50%',
            translateY: '-50%',
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: orbVisible,
            background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
            mixBlendMode: isDarkTheme ? 'screen' : 'multiply',
            willChange: 'transform, opacity',
          }}
        />
      )}

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}

export default MagicCard;

// Tailwind v4 global keyframes: none required — pointer tracking uses framer-motion springs/motion values; opacity uses built-in transition utilities and prefers-reduced-motion via motion-reduce:hidden.
