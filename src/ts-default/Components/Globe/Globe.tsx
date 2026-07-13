import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import * as THREE from 'three';
import './Globe.css';

const MOVEMENT_DAMPING = 1400;

export interface GlobeMarker {
  location: [number, number];
  size?: number;
}

export interface GlobeConfig {
  phi?: number;
  theta?: number;
  dark?: number;
  diffuse?: number;
  mapSamples?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  markers?: GlobeMarker[];
}

export interface GlobeProps {
  className?: string;
  config?: GlobeConfig;
  autoRotate?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
}

const DEFAULT_MARKERS: GlobeMarker[] = [
  { location: [14.5995, 120.9842], size: 0.03 },
  { location: [19.076, 72.8777], size: 0.1 },
  { location: [23.8103, 90.4125], size: 0.05 },
  { location: [30.0444, 31.2357], size: 0.07 },
  { location: [39.9042, 116.4074], size: 0.08 },
  { location: [-23.5505, -46.6333], size: 0.1 },
  { location: [19.4326, -99.1332], size: 0.1 },
  { location: [40.7128, -74.006], size: 0.1 },
  { location: [34.6937, 135.5022], size: 0.05 },
  { location: [41.0082, 28.9784], size: 0.06 },
];

const DEFAULT_CONFIG: Required<
  Pick<
    GlobeConfig,
    | 'phi'
    | 'theta'
    | 'dark'
    | 'diffuse'
    | 'mapSamples'
    | 'baseColor'
    | 'markerColor'
    | 'glowColor'
    | 'markers'
  >
> = {
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 12000,
  baseColor: [1, 1, 1],
  markerColor: [22 / 255, 32 / 255, 228 / 255],
  glowColor: [123 / 255, 233 / 255, 198 / 255],
  markers: DEFAULT_MARKERS,
};

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

function createMarkerPoints(markers: GlobeMarker[], radius: number): Float32Array {
  const positions = new Float32Array(markers.length * 3);
  markers.forEach((marker, index) => {
    const [lat, lon] = marker.location;
    const point = latLonToVector3(lat, lon, radius * 1.01);
    positions[index * 3] = point.x;
    positions[index * 3 + 1] = point.y;
    positions[index * 3 + 2] = point.z;
  });
  return positions;
}

function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function Globe({
  className,
  config = DEFAULT_CONFIG,
  autoRotate = true,
  disabled = false,
  'aria-label': ariaLabel = 'Interactive 3D globe',
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(config.phi ?? 0);
  const pointerInteracting = useRef<number | null>(null);
  const springTarget = useRef(0);
  const springCurrent = useRef(0);
  const reducedMotionRef = useRef(false);
  const [ready, setReady] = useState(false);

  const resolved = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...config,
      markers: config.markers ?? DEFAULT_CONFIG.markers,
      baseColor: config.baseColor ?? DEFAULT_CONFIG.baseColor,
      markerColor: config.markerColor ?? DEFAULT_CONFIG.markerColor,
      glowColor: config.glowColor ?? DEFAULT_CONFIG.glowColor,
    }),
    [config]
  );

  const updatePointerInteraction = useCallback(
    (value: number | null) => {
      if (disabled) return;
      pointerInteracting.current = value;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
      }
    },
    [disabled]
  );

  const updateMovement = useCallback(
    (clientX: number) => {
      if (disabled || pointerInteracting.current === null) return;
      const delta = clientX - pointerInteracting.current;
      springTarget.current += delta / MOVEMENT_DAMPING;
      pointerInteracting.current = clientX;
    },
    [disabled]
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      reducedMotionRef.current = media.matches;
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.6;

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = resolved.theta ?? 0.3;
    scene.add(globeGroup);

    const radius = 1;
    const samples = Math.min(Math.max(resolved.mapSamples ?? 12000, 2000), 20000);
    const baseGeometry = new THREE.BufferGeometry();
    baseGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(createSpherePoints(samples, radius), 3)
    );
    const baseMaterial = new THREE.PointsMaterial({
      size: 0.012,
      color: new THREE.Color(...resolved.baseColor),
      transparent: true,
      opacity: resolved.dark ? 0.55 : 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Points(baseGeometry, baseMaterial));

    const glowGeometry = new THREE.SphereGeometry(radius * 1.08, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(...resolved.glowColor),
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Mesh(glowGeometry, glowMaterial));

    const markerGeometry = new THREE.BufferGeometry();
    markerGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(createMarkerPoints(resolved.markers, radius), 3)
    );
    const markerMaterial = new THREE.PointsMaterial({
      size: 0.045,
      color: new THREE.Color(...resolved.markerColor),
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Points(markerGeometry, markerMaterial));

    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.02, 48, 48);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(...resolved.glowColor),
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));

    let frameId = 0;
    let mounted = true;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || width;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    setReady(true);
    window.addEventListener('resize', resize);

    const renderLoop = () => {
      if (!mounted) return;
      springCurrent.current += (springTarget.current - springCurrent.current) * 0.12;
      const canAutoRotate =
        autoRotate &&
        !disabled &&
        !reducedMotionRef.current &&
        pointerInteracting.current === null;
      if (canAutoRotate) phiRef.current += 0.005;
      globeGroup.rotation.y = phiRef.current + springCurrent.current;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderLoop);
    };

    frameId = window.requestAnimationFrame(renderLoop);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      baseGeometry.dispose();
      baseMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, [autoRotate, disabled, resolved]);

  const onKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const step = 0.08;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      springTarget.current -= step;
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      springTarget.current += step;
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePointerInteraction(event.clientX);
  };

  const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    updatePointerInteraction(null);
  };

  return (
    <div
      ref={containerRef}
      className={classNames('bemo-globe', disabled && 'bemo-globe--disabled', className)}
    >
      <canvas
        ref={canvasRef}
        className={classNames('bemo-globe__canvas', ready && 'bemo-globe__canvas--ready')}
        role="img"
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => updatePointerInteraction(null)}
        onPointerMove={(event) => updateMovement(event.clientX)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Globe;
