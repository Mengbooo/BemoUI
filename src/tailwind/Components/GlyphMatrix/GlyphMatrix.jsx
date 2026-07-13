import { useEffect, useRef } from 'react';

export function GlyphMatrix({
  glyphs = '01·•+*/\\<>=',
  cellSize = 14,
  mutationRate = 0.04,
  interval = 90,
  className = '',
  fadeBottom = 0.6,
  color = '#1620E4',
  style,
  ...props
}) {
  const canvasRef = useRef(null);
  const rgbaRef = useRef({ r: 22, g: 32, b: 228, a: 1 });

  useEffect(() => {
    const probe = document.createElement('canvas');
    probe.width = 1;
    probe.height = 1;
    const probeCtx = probe.getContext('2d');
    if (!probeCtx) return;
    probeCtx.fillStyle = '#1620E4';
    probeCtx.fillStyle = color;
    probeCtx.fillRect(0, 0, 1, 1);
    const data = probeCtx.getImageData(0, 0, 1, 1).data;
    rgbaRef.current = { r: data[0], g: data[1], b: data[2], a: data[3] / 255 };
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let cells = [];
    let alphas = [];
    let raf = 0;
    let last = 0;
    let stopped = false;
    let reducedMotion = false;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      reducedMotion = mq.matches;
    };
    applyMotionPreference();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(0, Math.ceil(w / cellSize));
      rows = Math.max(0, Math.ceil(h / cellSize));

      const total = cols * rows;
      cells = new Array(total);
      alphas = new Array(total);
      for (let i = 0; i < total; i += 1) {
        cells[i] = glyphs.charAt(Math.floor(Math.random() * glyphs.length)) || '0';
        alphas[i] = 0.05 + Math.random() * 0.35;
      }
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${Math.max(1, cellSize - 2)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'top';

      const { r, g, b, a: colorAlpha } = rgbaRef.current;
      for (let y = 0; y < rows; y += 1) {
        const fade = fadeBottom > 0 ? 1 - (y / rows) * fadeBottom : 1;
        for (let x = 0; x < cols; x += 1) {
          const i = y * cols + x;
          const a = alphas[i] * fade * colorAlpha;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fillText(cells[i], x * cellSize, y * cellSize);
        }
      }
    };

    const tick = (t) => {
      if (stopped) return;

      if (!reducedMotion && t - last >= interval) {
        last = t;
        const total = cols * rows;
        if (total > 0) {
          const mutations = Math.max(1, Math.floor(total * mutationRate));
          for (let n = 0; n < mutations; n += 1) {
            const i = Math.floor(Math.random() * total);
            cells[i] = glyphs.charAt(Math.floor(Math.random() * glyphs.length)) || '0';
            alphas[i] = 0.05 + Math.random() * 0.45;
          }
          draw();
        }
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (!reducedMotion) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMotionChange = () => {
      applyMotionPreference();
      if (stopped) return;
      if (reducedMotion) {
        cancelAnimationFrame(raf);
        draw();
      } else {
        startLoop();
      }
    };

    resize();
    draw();
    startLoop();

    mq.addEventListener('change', onMotionChange);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener('change', onMotionChange);
    };
  }, [glyphs, cellSize, mutationRate, interval, fadeBottom]);

  const classes = ['pointer-events-none block size-full', className].filter(Boolean).join(' ');

  return (
    <canvas
      ref={canvasRef}
      className={classes}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}

export default GlyphMatrix;

// Global keyframes: none required. GlyphMatrix animates via requestAnimationFrame on a canvas;
// prefers-reduced-motion freezes mutations to a static frame in JS.
