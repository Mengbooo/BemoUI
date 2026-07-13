import { useEffect, useRef, useState } from 'react';

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}

function hexToRgb(hex) {
  let cleaned = String(hex || '').replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((char) => char + char)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return [22, 32, 228];
  }
  const hexInt = parseInt(cleaned, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

export default function Particles({
  className = '',
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = '#1620E4',
  vx = 0,
  vy = 0,
  ...props
}) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const rafID = useRef(null);
  const resizeTimeout = useRef(null);
  const reducedMotion = useRef(false);
  const initCanvasRef = useRef(() => {});
  const onMouseMoveRef = useRef(() => {});
  const animateRef = useRef(() => {});
  const rgb = hexToRgb(color);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }

    initCanvasRef.current();
    if (!reducedMotion.current) {
      animateRef.current();
    }

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvasRef.current();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [color]);

  useEffect(() => {
    onMouseMoveRef.current();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvasRef.current();
  }, [refresh, quantity, size]);

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.floor(Math.random() * 2) + size;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: pSize,
      alpha: reducedMotion.current ? targetAlpha : 0,
      targetAlpha,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  };

  const drawCircle = (circle, update = false) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, s, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) {
      circles.current.push(circle);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const resizeCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;
    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.setTransform(1, 0, 0, 1, 0, 0);
    context.current.scale(dpr, dpr);
    circles.current = [];
    for (let i = 0; i < quantity; i += 1) {
      drawCircle(circleParams());
    }
  };

  const initCanvas = () => {
    resizeCanvas();
  };

  const onMouseMove = () => {
    if (!canvasRef.current || reducedMotion.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  };

  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    if (reducedMotion.current) return;
    clearContext();
    const next = [];
    circles.current.forEach((circle) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      const outOfBounds =
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size;

      if (outOfBounds) {
        const replacement = circleParams();
        drawCircle(replacement, true);
        next.push(replacement);
      } else {
        drawCircle(circle, true);
        next.push(circle);
      }
    });
    circles.current = next;
    rafID.current = window.requestAnimationFrame(() => animateRef.current());
  };

  initCanvasRef.current = initCanvas;
  onMouseMoveRef.current = onMouseMove;
  animateRef.current = animate;

  const rootClass = ['pointer-events-none absolute inset-0 h-full w-full overflow-hidden', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} ref={canvasContainerRef} aria-hidden="true" {...props}>
      <canvas ref={canvasRef} className="block size-full h-full w-full" />
    </div>
  );
}

/* Tailwind v4 global keyframes: none required — particle motion is canvas/RAF driven.
   Optional reduced-motion is handled in JS via matchMedia('(prefers-reduced-motion: reduce)'). */
