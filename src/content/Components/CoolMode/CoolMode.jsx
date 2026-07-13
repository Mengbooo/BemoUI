import { useEffect, useRef } from 'react';
import './CoolMode.css';

const SVG_NS = 'http://www.w3.org/2000/svg';
const ACCENTS = ['#1620E4', '#7BE9C6'];
const SIZES = [15, 20, 25, 35, 45];
const LIMIT = 45;
const PARTICLE_DELAY = 30;
const CONTAINER_ID = 'bemo-cool-mode-effect';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function sanitizeParticle(particle) {
  if (!particle || typeof particle !== 'string') return 'circle';
  const value = particle.trim();
  if (!value) return 'circle';
  if (value === 'circle') return 'circle';
  if (/^https?:\/\//i.test(value) || value.startsWith('/') || value.includes('\\') || value.includes('<')) {
    return 'circle';
  }
  return value.slice(0, 8);
}

function getContainer() {
  const existing = document.getElementById(CONTAINER_ID);
  if (existing) return existing;

  const container = document.createElement('div');
  container.id = CONTAINER_ID;
  container.className = 'bemo-cool-mode__layer';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);
  return container;
}

let instanceCounter = 0;

function applyParticleEffect(element, options = {}) {
  if (prefersReducedMotion()) {
    return () => {};
  }

  instanceCounter += 1;

  const particleType = sanitizeParticle(options.particle);
  const sizeOption = typeof options.size === 'number' && options.size > 0 ? options.size : null;
  const speedHorzOption =
    typeof options.speedHorz === 'number' && options.speedHorz >= 0 ? options.speedHorz : null;
  const speedUpOption =
    typeof options.speedUp === 'number' && options.speedUp >= 0 ? options.speedUp : null;
  const particleCount =
    typeof options.particleCount === 'number' && options.particleCount > 0
      ? Math.min(Math.floor(options.particleCount), LIMIT)
      : LIMIT;

  let particles = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;
  let animationFrame;
  let lastParticleTimestamp = 0;
  let disposed = false;

  const container = getContainer();

  const appendCircleParticle = (particle, size) => {
    const circleSVG = document.createElementNS(SVG_NS, 'svg');
    const circle = document.createElementNS(SVG_NS, 'circle');
    const fill = ACCENTS[Math.floor(Math.random() * ACCENTS.length)];

    circle.setAttribute('cx', String(size / 2));
    circle.setAttribute('cy', String(size / 2));
    circle.setAttribute('r', String(size / 2));
    circle.setAttribute('fill', fill);

    circleSVG.appendChild(circle);
    circleSVG.setAttribute('width', String(size));
    circleSVG.setAttribute('height', String(size));
    circleSVG.setAttribute('aria-hidden', 'true');
    particle.appendChild(circleSVG);
  };

  const appendTextParticle = (particle, content, size) => {
    const node = document.createElement('div');
    node.className = 'bemo-cool-mode__particle-text';
    node.textContent = content;
    node.style.fontSize = `${size * 1.4}px`;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    particle.appendChild(node);
  };

  const generateParticle = () => {
    const size = sizeOption || SIZES[Math.floor(Math.random() * SIZES.length)];
    const speedHorz = speedHorzOption ?? Math.random() * 10;
    const speedUp = speedUpOption ?? Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement('div');
    particle.className = 'bemo-cool-mode__particle';

    if (particleType === 'circle') {
      appendCircleParticle(particle, size);
    } else {
      appendTextParticle(particle, particleType, size);
    }

    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;
    particle.style.transform = `rotate(${spinVal}deg)`;

    container.appendChild(particle);

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    });
  };

  const refreshParticles = () => {
    const boundary = Math.max(window.innerHeight, document.body.clientHeight);

    particles = particles.filter((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (p.top >= boundary + p.size) {
        p.element.remove();
        return false;
      }

      p.element.style.top = `${p.top}px`;
      p.element.style.left = `${p.left}px`;
      p.element.style.transform = `rotate(${p.spinVal}deg)`;
      return true;
    });
  };

  const loop = () => {
    if (disposed) return;

    const currentTime = performance.now();
    if (
      autoAddParticle &&
      particles.length < particleCount &&
      currentTime - lastParticleTimestamp > PARTICLE_DELAY
    ) {
      generateParticle();
      lastParticleTimestamp = currentTime;
    }

    refreshParticles();
    animationFrame = requestAnimationFrame(loop);
  };

  loop();

  const isTouchInteraction = 'ontouchstart' in window;
  const tap = isTouchInteraction ? 'touchstart' : 'mousedown';
  const tapEnd = isTouchInteraction ? 'touchend' : 'mouseup';
  const move = isTouchInteraction ? 'touchmove' : 'mousemove';

  const updateMousePosition = (e) => {
    if ('touches' in e) {
      const touch = e.touches[0];
      if (!touch) return;
      mouseX = touch.clientX;
      mouseY = touch.clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  const tapHandler = (e) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition, { passive: true });
  element.addEventListener(tap, tapHandler, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener('mouseleave', disableAutoAddParticle, { passive: true });
  element.addEventListener('blur', disableAutoAddParticle, { passive: true });

  return () => {
    disposed = true;
    autoAddParticle = false;

    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener('mouseleave', disableAutoAddParticle);
    element.removeEventListener('blur', disableAutoAddParticle);

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
    }

    particles.forEach((p) => p.element.remove());
    particles = [];

    instanceCounter -= 1;
    if (instanceCounter <= 0) {
      instanceCounter = 0;
      const layer = document.getElementById(CONTAINER_ID);
      if (layer) layer.remove();
    }
  };
}

export default function CoolMode({
  children,
  options,
  disabled = false,
  className = '',
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return undefined;

    return applyParticleEffect(element, options);
  }, [options, disabled]);

  const classes = ['bemo-cool-mode', className].filter(Boolean).join(' ');

  return (
    <span
      ref={ref}
      className={classes}
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      {children}
    </span>
  );
}
