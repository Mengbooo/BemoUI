import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from 'react';
import './LineShadowText.css';

const ALLOWED_TAGS = [
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
] as const;

type AllowedTag = (typeof ALLOWED_TAGS)[number];

export interface LineShadowTextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: string;
  shadowColor?: string;
  as?: AllowedTag;
}

export function LineShadowText({
  children,
  shadowColor = '#1620E4',
  className = '',
  as: Component = 'span',
  style,
  ...props
}: LineShadowTextProps) {
  if (typeof children !== 'string') {
    return null;
  }

  const Tag = (
    ALLOWED_TAGS.includes(Component) ? Component : 'span'
  ) as ElementType;

  const mergedStyle = {
    ...style,
    '--bemo-line-shadow-color': shadowColor,
  } as CSSProperties;

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
