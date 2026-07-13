import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useInView } from 'framer-motion';
import './Highlighter.css';

export type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

export interface HighlighterProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

const ACTIONS: AnnotationAction[] = [
  'highlight',
  'underline',
  'box',
  'circle',
  'strike-through',
  'crossed-off',
  'bracket',
];

interface AnnotationMarksProps {
  action: AnnotationAction;
  width: number;
  height: number;
  padding: number;
  color: string;
  strokeWidth: number;
  reducedMotion: boolean;
}

function AnnotationMarks({
  action,
  width,
  height,
  padding,
  color,
  strokeWidth,
}: AnnotationMarksProps) {
  const w = width + padding * 2;
  const h = height + padding * 2;
  const p = padding;
  const strokeProps = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    pathLength: 1,
  };

  if (action === 'highlight') {
    return (
      <rect
        className="bemo-highlighter__fill"
        x={p * 0.5}
        y={p + height * 0.12}
        width={width + p}
        height={Math.max(height * 0.76, 4)}
        rx={2}
        fill={color}
      />
    );
  }

  if (action === 'underline') {
    return (
      <path
        className="bemo-highlighter__path"
        d={`M ${p} ${h - p * 0.45} Q ${w / 2} ${h + 1} ${w - p} ${h - p * 0.7}`}
        {...strokeProps}
      />
    );
  }

  if (action === 'box') {
    return (
      <rect
        className="bemo-highlighter__path"
        x={p * 0.25}
        y={p * 0.25}
        width={width + p * 1.5}
        height={height + p * 1.5}
        rx={3}
        {...strokeProps}
      />
    );
  }

  if (action === 'circle') {
    return (
      <ellipse
        className="bemo-highlighter__path"
        cx={w / 2}
        cy={h / 2}
        rx={Math.max(w / 2 - 1, 2)}
        ry={Math.max(h / 2 - 1, 2)}
        {...strokeProps}
      />
    );
  }

  if (action === 'strike-through') {
    return (
      <path
        className="bemo-highlighter__path"
        d={`M ${p} ${h / 2} Q ${w / 2} ${h / 2 - 2} ${w - p} ${h / 2 + 1}`}
        {...strokeProps}
      />
    );
  }

  if (action === 'crossed-off') {
    return (
      <g>
        <path
          className="bemo-highlighter__path"
          d={`M ${p} ${p} L ${w - p} ${h - p}`}
          {...strokeProps}
        />
        <path
          className="bemo-highlighter__path bemo-highlighter__path--delay"
          d={`M ${w - p} ${p} L ${p} ${h - p}`}
          {...strokeProps}
        />
      </g>
    );
  }

  return (
    <g>
      <path
        className="bemo-highlighter__path"
        d={`M ${p + 7} ${p} L ${p} ${p} L ${p} ${h - p} L ${p + 7} ${h - p}`}
        {...strokeProps}
      />
      <path
        className="bemo-highlighter__path bemo-highlighter__path--delay"
        d={`M ${w - p - 7} ${p} L ${w - p} ${p} L ${w - p} ${h - p} L ${w - p - 7} ${h - p}`}
        {...strokeProps}
      />
    </g>
  );
}

export function Highlighter({
  children,
  action = 'highlight',
  color = '#7BE9C6',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className = '',
  style,
  ...rest
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-10%' });
  const shouldShow = !isView || isInView;
  const [reducedMotion, setReducedMotion] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({
        width: Math.ceil(width),
        height: Math.ceil(height),
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const safeAction: AnnotationAction = ACTIONS.includes(action as AnnotationAction)
    ? (action as AnnotationAction)
    : 'highlight';
  const duration = reducedMotion ? 0 : Math.max(0, animationDuration);
  const loops = Math.max(1, iterations);
  const pad = Math.max(0, padding);

  const cssVars = {
    '--bemo-highlighter-color': color,
    '--bemo-highlighter-stroke': strokeWidth,
    '--bemo-highlighter-duration': `${duration}ms`,
    '--bemo-highlighter-iterations': loops,
    '--bemo-highlighter-padding': `${pad}px`,
  } as CSSProperties;

  return (
    <span
      ref={elementRef}
      className={[
        'bemo-highlighter',
        `bemo-highlighter--${safeAction}`,
        shouldShow ? 'bemo-highlighter--visible' : '',
        reducedMotion ? 'bemo-highlighter--reduced' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...cssVars, ...style }}
      data-multiline={multiline ? 'true' : 'false'}
      {...rest}
    >
      <span className="bemo-highlighter__text">{children}</span>
      {shouldShow && size.width > 0 && size.height > 0 ? (
        <svg
          className="bemo-highlighter__svg"
          width={size.width + pad * 2}
          height={size.height + pad * 2}
          viewBox={`0 0 ${size.width + pad * 2} ${size.height + pad * 2}`}
          aria-hidden="true"
          focusable="false"
        >
          <AnnotationMarks
            action={safeAction}
            width={size.width}
            height={size.height}
            padding={pad}
            color={color}
            strokeWidth={strokeWidth}
            reducedMotion={reducedMotion}
          />
        </svg>
      ) : null}
    </span>
  );
}

export default Highlighter;
