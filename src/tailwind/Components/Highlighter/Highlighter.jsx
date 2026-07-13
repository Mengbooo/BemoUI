import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const ACTIONS = [
  'highlight',
  'underline',
  'box',
  'circle',
  'strike-through',
  'crossed-off',
  'bracket',
];

function AnnotationMarks({ action, width, height, padding, color, strokeWidth, reducedMotion, duration, iterations }) {
  const w = width + padding * 2;
  const h = height + padding * 2;
  const p = padding;
  const strokeProps = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    pathLength: 1,
  };

  const pathStyle = reducedMotion
    ? { strokeDasharray: 1, strokeDashoffset: 0 }
    : {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `bemo-highlighter-draw ${duration}ms ease-out forwards`,
        animationIterationCount: iterations,
      };

  const delayStyle = reducedMotion
    ? pathStyle
    : { ...pathStyle, animationDelay: `${duration * 0.25}ms` };

  if (action === 'highlight') {
    return (
      <rect
        x={p * 0.5}
        y={p + height * 0.12}
        width={width + p}
        height={Math.max(height * 0.76, 4)}
        rx={2}
        fill={color}
        style={
          reducedMotion
            ? { opacity: 0.35, transform: 'scaleX(1)', transformOrigin: 'left center' }
            : {
                opacity: 0,
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
                animation: `bemo-highlighter-highlight ${duration}ms ease-out forwards`,
                animationIterationCount: iterations,
              }
        }
      />
    );
  }

  if (action === 'underline') {
    return (
      <path
        d={`M ${p} ${h - p * 0.45} Q ${w / 2} ${h + 1} ${w - p} ${h - p * 0.7}`}
        style={pathStyle}
        {...strokeProps}
      />
    );
  }

  if (action === 'box') {
    return (
      <rect
        x={p * 0.25}
        y={p * 0.25}
        width={width + p * 1.5}
        height={height + p * 1.5}
        rx={3}
        style={pathStyle}
        {...strokeProps}
      />
    );
  }

  if (action === 'circle') {
    return (
      <ellipse
        cx={w / 2}
        cy={h / 2}
        rx={Math.max(w / 2 - 1, 2)}
        ry={Math.max(h / 2 - 1, 2)}
        style={pathStyle}
        {...strokeProps}
      />
    );
  }

  if (action === 'strike-through') {
    return (
      <path
        d={`M ${p} ${h / 2} Q ${w / 2} ${h / 2 - 2} ${w - p} ${h / 2 + 1}`}
        style={pathStyle}
        {...strokeProps}
      />
    );
  }

  if (action === 'crossed-off') {
    return (
      <g>
        <path d={`M ${p} ${p} L ${w - p} ${h - p}`} style={pathStyle} {...strokeProps} />
        <path d={`M ${w - p} ${p} L ${p} ${h - p}`} style={delayStyle} {...strokeProps} />
      </g>
    );
  }

  return (
    <g>
      <path
        d={`M ${p + 7} ${p} L ${p} ${p} L ${p} ${h - p} L ${p + 7} ${h - p}`}
        style={pathStyle}
        {...strokeProps}
      />
      <path
        d={`M ${w - p - 7} ${p} L ${w - p} ${p} L ${w - p} ${h - p} L ${w - p - 7} ${h - p}`}
        style={delayStyle}
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
}) {
  const elementRef = useRef(null);
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
      setSize({ width: Math.ceil(width), height: Math.ceil(height) });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const safeAction = ACTIONS.includes(action) ? action : 'highlight';
  const duration = reducedMotion ? 0 : Math.max(0, animationDuration);
  const loops = Math.max(1, iterations);
  const pad = Math.max(0, padding);

  return (
    <span
      ref={elementRef}
      className={['relative inline-block bg-transparent align-baseline', className].filter(Boolean).join(' ')}
      style={style}
      data-multiline={multiline ? 'true' : 'false'}
      {...rest}
    >
      <span className={`relative z-[1]${multiline ? '' : ' whitespace-nowrap'}`}>{children}</span>
      {shouldShow && size.width > 0 && size.height > 0 ? (
        <svg
          className="pointer-events-none absolute z-0 overflow-visible"
          style={{ top: -pad, left: -pad }}
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
            duration={duration}
            iterations={loops}
          />
        </svg>
      ) : null}
    </span>
  );
}

export default Highlighter;

/*
Required global keyframes (add to your CSS entry):
@keyframes bemo-highlighter-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes bemo-highlighter-highlight {
  from { opacity: 0; transform: scaleX(0); }
  to { opacity: 0.35; transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
*/
