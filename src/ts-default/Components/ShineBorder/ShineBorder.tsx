import React, { type CSSProperties, type HTMLAttributes } from 'react';
import './ShineBorder.css';

export interface ShineBorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the border in pixels @default 1 */
  borderWidth?: number;
  /** Duration of the animation in seconds @default 14 */
  duration?: number;
  /** Border shine color(s) @default ['#1620E4', '#7BE9C6'] */
  shineColor?: string | string[];
}

/**
 * ShineBorder
 * Animated decorative border shine effect.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = ['#1620E4', '#7BE9C6'],
  className = '',
  style,
  ...props
}: ShineBorderProps) {
  const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor;

  return (
    <div
      aria-hidden="true"
      className={`bemo-shine-border${className ? ` ${className}` : ''}`}
      style={
        {
          '--bemo-shine-border-width': `${Number(borderWidth) || 1}px`,
          '--bemo-shine-border-duration': `${Number(duration) || 14}s`,
          '--bemo-shine-border-colors': colors,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}

export default ShineBorder;
