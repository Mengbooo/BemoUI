import {
  useMemo,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from 'react';
import './GlareHover.css';

type Color = `#${string}`;

export interface GlareHoverProps extends ComponentProps<'div'> {
  /** Optional CSS width on the root element (e.g. "100%", "320px"). */
  width?: string;
  /** Optional CSS height on the root element (e.g. "auto", "200px"). */
  height?: string;
  /** Background color of the wrapper (CSS color string). */
  background?: string;
  /** Glare highlight as hex; parsed to rgba for the gradient. */
  color?: Color;
  /** Opacity applied to the glare color when converting hex to rgba (0–1). */
  opacity?: number;
  /** Gradient angle in degrees. */
  angle?: number;
  /** Glare tile size as a percentage of the element. */
  size?: number;
  /** Transition duration for the glare sweep in milliseconds. */
  duration?: number;
  /** When true, the glare transition only runs on hover/focus. */
  playOnce?: boolean;
  /** Disables interaction and dims the component. */
  disabled?: boolean;
  children?: ReactNode;
}

function parseHEX(color: Color | string, opacity: number): string {
  const hex = String(color).replace('#', '');
  const parse = (h: string) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}

export default function GlareHover({
  background = '#000000',
  children,
  color = '#7BE9C6',
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className = '',
  style,
  width,
  height,
  disabled = false,
  ...props
}: GlareHoverProps) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity]);

  const cssVars: CSSProperties = {
    ['--bemo-gh-angle' as string]: `${angle}deg`,
    ['--bemo-gh-duration' as string]: `${duration}ms`,
    ['--bemo-gh-size' as string]: `${size}%`,
    ['--bemo-gh-rgba' as string]: rgba,
    background,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  const classes = [
    'bemo-glare-hover',
    playOnce ? 'bemo-glare-hover--play-once' : '',
    disabled ? 'bemo-glare-hover--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...props}
      className={classes}
      style={cssVars}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
