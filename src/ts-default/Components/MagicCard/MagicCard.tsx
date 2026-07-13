import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import './MagicCard.css';

const DEFAULT_GRADIENT_FROM = '#1620E4';
const DEFAULT_GRADIENT_TO = '#7BE9C6';

type ResetReason = 'enter' | 'leave' | 'global' | 'init';

interface MagicCardBaseProps {
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  disabled?: boolean;
}

interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: 'gradient';
  gradientColor?: string;
  gradientOpacity?: number;
  glowFrom?: never;
  glowTo?: never;
  glowAngle?: never;
  glowSize?: never;
  glowBlur?: never;
  glowOpacity?: never;
}

interface MagicCardOrbProps extends MagicCardBaseProps {
  mode: 'orb';
  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;
  gradientColor?: never;
  gradientOpacity?: never;
}

export type MagicCardProps = MagicCardGradientProps | MagicCardOrbProps;

function isOrbMode(props: MagicCardProps): props is MagicCardOrbProps {
  return props.mode === 'orb';
}

export function MagicCard(props: MagicCardProps) {
  const {
    children,
    className = '',
    gradientSize = 200,
    gradientFrom = DEFAULT_GRADIENT_FROM,
    gradientTo = DEFAULT_GRADIENT_TO,
    mode = 'gradient',
    disabled = false,
  } = props;

  const gradientColor =
    !isOrbMode(props) && props.gradientColor != null ? props.gradientColor : '#262626';
  const gradientOpacity =
    !isOrbMode(props) && props.gradientOpacity != null ? props.gradientOpacity : 0.8;
  const glowFrom = isOrbMode(props) ? (props.glowFrom ?? DEFAULT_GRADIENT_FROM) : DEFAULT_GRADIENT_FROM;
  const glowTo = isOrbMode(props) ? (props.glowTo ?? DEFAULT_GRADIENT_TO) : DEFAULT_GRADIENT_TO;
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90;
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 420) : 420;
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60;
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.9) : 0.9;

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
    (reason: ResetReason = 'leave') => {
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
    (event: ReactPointerEvent<HTMLDivElement>) => {
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

    const handleGlobalPointerOut = (event: PointerEvent) => {
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
    'bemo-magic-card',
    disabled ? 'bemo-magic-card--disabled' : '',
    reduceMotion ? 'bemo-magic-card--reduced' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const orbStyle = {
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
  } as unknown as CSSProperties;

  return (
    <motion.div
      className={rootClass}
      onPointerMove={disabled || reduceMotion ? undefined : handlePointerMove}
      onPointerLeave={disabled || reduceMotion ? undefined : () => reset('leave')}
      onPointerEnter={disabled || reduceMotion ? undefined : () => reset('enter')}
      style={{ background: borderBackground }}
      aria-disabled={disabled || undefined}
    >
      <div className="bemo-magic-card__surface" />

      {mode === 'gradient' && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="bemo-magic-card__spotlight"
          style={{
            background: spotlightBackground,
            opacity: gradientOpacity,
          }}
        />
      )}

      {mode === 'orb' && !reduceMotion && (
        <motion.div aria-hidden="true" className="bemo-magic-card__orb" style={orbStyle} />
      )}

      <div className="bemo-magic-card__content">{children}</div>
    </motion.div>
  );
}

export default MagicCard;
