import './LineShadowText.css';

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
    '--bemo-line-shadow-color': shadowColor,
  };

  return (
    <Tag
      {...props}
      className={['bemo-line-shadow-text', className].filter(Boolean).join(' ')}
      style={mergedStyle}
      data-text={children}
    >
      {children}
    </Tag>
  );
}

export default LineShadowText;
