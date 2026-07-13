import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './IconCloud.css';

export interface IconCloudProps {
  icons?: React.ReactNode[];
  size?: number;
  iconSize?: number;
  radius?: number;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

interface SphereIcon {
  x: number;
  y: number;
  z: number;
  id: number;
}

interface ProjectedIcon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

interface TargetRotation {
  x: number;
  y: number;
  startX: number;
  startY: number;
  startTime: number;
  duration: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function generateSpherePositions(count: number, radius: number): SphereIcon[] {
  const positions: SphereIcon[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    positions.push({
      x: Math.cos(phi) * r * radius,
      y: y * radius,
      z: Math.sin(phi) * r * radius,
      id: i,
    });
  }

  return positions;
}

function DefaultOrb({ index, iconSize }: { index: number; iconSize: number }) {
  const isAccent = index % 2 === 1;
  return (
    <span
      className={`bemo-icon-cloud__fallback${isAccent ? ' bemo-icon-cloud__fallback--accent' : ''}`}
      style={{ width: iconSize, height: iconSize, fontSize: Math.max(10, iconSize * 0.4) }}
      aria-hidden="true"
    >
      {index + 1}
    </span>
  );
}

export function IconCloud({
  icons,
  size = 400,
  iconSize = 40,
  radius,
  className = '',
  ariaLabel = 'Interactive 3D Icon Cloud',
  disabled = false,
}: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0.2, y: 0.3 });
  const mousePosRef = useRef({ x: size / 2, y: size / 2 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const targetRotationRef = useRef<TargetRotation | null>(null);
  const reducedMotionRef = useRef(false);
  const frameRef = useRef(0);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.3 });
  const [isDragging, setIsDragging] = useState(false);

  const items = Array.isArray(icons) && icons.length > 0 ? icons : null;
  const count = items ? items.length : 20;
  const sphereRadius = radius ?? size * 0.35;
  const positions = useMemo(
    () => generateSpherePositions(count, sphereRadius),
    [count, sphereRadius]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = media.matches;
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const tick = (now: number) => {
      if (!disabled && !reducedMotionRef.current) {
        const target = targetRotationRef.current;
        if (target) {
          const progress = Math.min(1, (now - target.startTime) / target.duration);
          const eased = easeOutCubic(progress);
          rotationRef.current = {
            x: target.startX + (target.x - target.startX) * eased,
            y: target.startY + (target.y - target.startY) * eased,
          };
          if (progress >= 1) {
            targetRotationRef.current = null;
          }
        } else if (!isDraggingRef.current) {
          const center = size / 2;
          const dx = mousePosRef.current.x - center;
          const dy = mousePosRef.current.y - center;
          const maxDistance = Math.sqrt(center * center + center * center) || 1;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const speed = 0.003 + (distance / maxDistance) * 0.01;
          rotationRef.current = {
            x: rotationRef.current.x + (dy / size) * speed,
            y: rotationRef.current.y + (dx / size) * speed,
          };
        }
        setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [disabled, size]);

  const project = useCallback(
    (icon: SphereIcon): ProjectedIcon => {
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
      const depth = rotatedZ;
      const scale = Math.max(0.35, (depth + sphereRadius * 2) / (sphereRadius * 3));
      const opacity = Math.max(0.25, Math.min(1, (depth + sphereRadius * 1.5) / (sphereRadius * 2)));
      return { x: rotatedX, y: rotatedY, z: depth, scale, opacity };
    },
    [rotation.x, rotation.y, sphereRadius]
  );

  const focusIcon = useCallback(
    (icon: SphereIcon) => {
      if (disabled || reducedMotionRef.current) return;
      const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
      const targetY = Math.atan2(icon.x, icon.z);
      const currentX = rotationRef.current.x;
      const currentY = rotationRef.current.y;
      const distance = Math.sqrt(
        (targetX - currentX) ** 2 + (targetY - currentY) ** 2
      );
      const duration = Math.min(2000, Math.max(800, distance * 1000));
      targetRotationRef.current = {
        x: targetX,
        y: targetY,
        startX: currentX,
        startY: currentY,
        startTime: performance.now(),
        duration,
      };
    },
    [disabled]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const localX = event.clientX - rect.left - size / 2;
    const localY = event.clientY - rect.top - size / 2;

    let hit: { icon: SphereIcon; z: number } | null = null;
    for (const icon of positions) {
      const p = project(icon);
      const radiusHit = (iconSize / 2) * p.scale;
      const dx = localX - p.x;
      const dy = localY - p.y;
      if (dx * dx + dy * dy <= radiusHit * radiusHit && (!hit || p.z > hit.z)) {
        hit = { icon, z: p.z };
      }
    }

    if (hit) {
      focusIcon(hit.icon);
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    lastMouseRef.current = { x: event.clientX, y: event.clientY };
    targetRotationRef.current = null;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    if (!isDraggingRef.current) return;
    const deltaX = event.clientX - lastMouseRef.current.x;
    const deltaY = event.clientY - lastMouseRef.current.y;
    rotationRef.current = {
      x: rotationRef.current.x + deltaY * 0.005,
      y: rotationRef.current.y + deltaX * 0.005,
    };
    lastMouseRef.current = { x: event.clientX, y: event.clientY };
    setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = 0.12;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      rotationRef.current = { ...rotationRef.current, y: rotationRef.current.y - step };
      setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      rotationRef.current = { ...rotationRef.current, y: rotationRef.current.y + step };
      setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      rotationRef.current = { ...rotationRef.current, x: rotationRef.current.x - step };
      setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      rotationRef.current = { ...rotationRef.current, x: rotationRef.current.x + step };
      setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
    }
  };

  const sorted = positions
    .map((icon, index) => ({ icon, index, projected: project(icon) }))
    .sort((a, b) => a.projected.z - b.projected.z);

  const rootClass = [
    'bemo-icon-cloud',
    isDragging ? 'bemo-icon-cloud--dragging' : '',
    disabled ? 'bemo-icon-cloud--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div className="bemo-icon-cloud__sphere" aria-hidden="true">
        {sorted.map(({ icon, index, projected }) => (
          <div
            key={icon.id}
            className="bemo-icon-cloud__icon"
            style={{
              width: iconSize,
              height: iconSize,
              opacity: projected.opacity,
              transform: `translate3d(${projected.x}px, ${projected.y}px, ${projected.z}px) scale(${projected.scale})`,
              zIndex: Math.round(projected.z + 1000),
            }}
          >
            {items ? items[index] : <DefaultOrb index={index} iconSize={iconSize} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconCloud;
