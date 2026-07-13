const ALLOWED_TAGS = new Set([
  'article',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'p',
  'section',
  'span',
]);

export function LineShadowText({
  children,
  shadowColor = '#1620E4',
  className = '',
  as: Component = 'span',
  style,
  ...props
}) {
  if (typeof children !== 'string') {
    return null;
  }

  const Tag = ALLOWED_TAGS.has(Component) ? Component : 'span';
  const mergedStyle = {
    ...style,
    '--shadow-color': shadowColor,
  };

  return (
    <Tag
      {...props}
      className={[
        'relative z-0 inline-flex',
        'after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]',
        'after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]',
        'after:-z-10 after:bg-size-[0.06em_0.06em] after:bg-clip-text after:text-transparent',
        'after:animate-line-shadow after:pointer-events-none',
        'motion-reduce:after:animate-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={mergedStyle}
      data-text={children}
    >
      {children}
    </Tag>
  );
}

export default LineShadowText;

/*
Required global Tailwind v4 keyframes (add to your CSS entry):

@theme {
  --animate-line-shadow: line-shadow 15s linear infinite;
}

@keyframes line-shadow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% -100%;
  }
}
*/
