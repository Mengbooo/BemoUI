import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import * as THREE from 'three';
import './TwentyFirstCultShaderLensBlur.css';

const fragmentShader = `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform float u_hoverStrength;
uniform bool u_invertMouse;
uniform bool u_isDarkMode;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.2831853071795864769252867665590

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}

float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}

float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx + 0.5;

    float size = 1.2 + sin(u_time) * 0.1;
    float roundness = 0.4 + sin(u_time * 0.5) * 0.1;
    float borderSize = 0.05 + sin(u_time * 0.7) * 0.02;
    float circleSize = 0.3 + sin(u_time * 0.8) * 0.05;
    float circleEdge = 0.5 + sin(u_time * 0.6) * 0.1;

    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = stroke(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = stroke(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }

    vec3 gradient = mix(
        mix(u_color1, u_color2, 0.5 + 0.5 * cos(u_time + st.x + 0.0)),
        mix(u_color3, u_color4, 0.5 + 0.5 * cos(u_time + st.y + 2.0)),
        0.5 + 0.5 * cos(u_time + st.x + st.y + 4.0)
    );

    vec3 shapeColor = sdf * gradient;

    float mouseEffect = u_invertMouse ? 1.0 - sdfCircle : sdfCircle;
    shapeColor = mix(shapeColor, vec3(1.0) - shapeColor, u_hoverStrength * mouseEffect);

    if (u_isDarkMode) {
        shapeColor = mix(shapeColor, vec3(1.0), 0.2);
    } else {
        shapeColor = mix(shapeColor, vec3(0.0), 0.1);
    }

    gl_FragColor = vec4(shapeColor, sdf);
}
`;

const DEFAULT_COLORS = {
  color1: '#1620E4',
  color2: '#7BE9C6',
  color3: '#A1BBE7',
  color4: '#F2BAE2',
} as const;

export interface TwentyFirstCultShaderLensBlurProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Shader shape variation: 0 rounded rect stroke, 1 circle fill, 2 circle stroke, 3 triangle fill */
  variation?: 0 | 1 | 2 | 3 | number;
  /** Gradient color 1 (hex) */
  color1?: string;
  /** Gradient color 2 (hex) */
  color2?: string;
  /** Gradient color 3 (hex) */
  color3?: string;
  /** Gradient color 4 (hex) */
  color4?: string;
  /** Enable continuous hover mouse effect */
  enableHover?: boolean;
  /** Invert the mouse lens effect */
  invertMouse?: boolean;
  /** Dark mode color mix in the fragment shader */
  isDarkMode?: boolean;
  /** Container width CSS value */
  width?: string | number;
  /** Container height CSS value */
  height?: string | number;
  /** Show interaction hint overlay */
  showHint?: boolean;
  /** Disable pointer interaction and dim the component */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

function TwentyFirstCultShaderLensBlur({
  variation = 3,
  color1 = DEFAULT_COLORS.color1,
  color2 = DEFAULT_COLORS.color2,
  color3 = DEFAULT_COLORS.color3,
  color4 = DEFAULT_COLORS.color4,
  enableHover = true,
  invertMouse = true,
  isDarkMode = true,
  width = '100%',
  height = '400px',
  showHint = true,
  className = '',
  style = {},
  disabled = false,
  'aria-label': ariaLabel = 'Interactive shader lens blur animation',
  ...rest
}: TwentyFirstCultShaderLensBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rafRef = useRef<number | null>(null);
  const pixelRatioRef = useRef(1);
  const isInteractingRef = useRef(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const updateSize = useCallback(() => {
    if (
      !containerRef.current ||
      !canvasRef.current ||
      !rendererRef.current ||
      !cameraRef.current ||
      !materialRef.current
    ) {
      return;
    }

    const { clientWidth: w, clientHeight: h } = containerRef.current;
    if (w === 0 || h === 0) return;

    const aspect = w / h;

    cameraRef.current.left = -aspect;
    cameraRef.current.right = aspect;
    cameraRef.current.top = 1;
    cameraRef.current.bottom = -1;
    cameraRef.current.updateProjectionMatrix();

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    pixelRatioRef.current = pixelRatio;

    rendererRef.current.setPixelRatio(pixelRatio);
    rendererRef.current.setSize(w, h, false);

    const drawingBufferSize = rendererRef.current.getDrawingBufferSize(
      new THREE.Vector2()
    );
    materialRef.current.uniforms.u_resolution.value.copy(drawingBufferSize);
    materialRef.current.uniforms.u_pixelRatio.value = pixelRatio;
  }, []);

  const updateMousePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current || !materialRef.current || disabled) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;
      if (isInteractingRef.current || enableHover) {
        materialRef.current.uniforms.u_mouse.value.set(
          mouseX,
          rect.height - mouseY
        );
      }
    },
    [disabled, enableHover]
  );

  const animate = useCallback(
    (time: number) => {
      if (
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current ||
        !materialRef.current
      ) {
        return;
      }

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      if (pixelRatio !== pixelRatioRef.current) {
        updateSize();
      }

      if (!prefersReducedMotion) {
        materialRef.current.uniforms.u_time.value = time * 0.001;
      }

      materialRef.current.uniforms.u_hoverStrength.value =
        !disabled && (isInteractingRef.current || enableHover) ? 0.3 : 0;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      rafRef.current = requestAnimationFrame(animate);
    },
    [disabled, enableHover, prefersReducedMotion, updateSize]
  );

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return undefined;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 v_texcoord;
        void main() {
          gl_Position = vec4(position, 1.0);
          v_texcoord = uv;
        }
      `,
      fragmentShader,
      uniforms: {
        u_mouse: { value: new THREE.Vector2() },
        u_resolution: { value: new THREE.Vector2() },
        u_pixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
        u_time: { value: 0 },
        u_color1: { value: hexToThreeColor(color1) },
        u_color2: { value: hexToThreeColor(color2) },
        u_color3: { value: hexToThreeColor(color3) },
        u_color4: { value: hexToThreeColor(color4) },
        u_hoverStrength: { value: 0 },
        u_invertMouse: { value: invertMouse },
        u_isDarkMode: { value: isDarkMode },
      },
      defines: {
        VAR: Math.max(0, Math.min(3, Math.floor(Number(variation)))),
      },
      transparent: true,
      blending: THREE.NormalBlending,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    updateSize();
    rafRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      resizeObserver.disconnect();
      if (meshRef.current && sceneRef.current) {
        sceneRef.current.remove(meshRef.current);
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }
      if (materialRef.current) {
        materialRef.current.dispose();
        materialRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current = null;
      }
      sceneRef.current = null;
      cameraRef.current = null;
      meshRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once; uniforms updated below
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.u_color1.value.set(color1);
    materialRef.current.uniforms.u_color2.value.set(color2);
    materialRef.current.uniforms.u_color3.value.set(color3);
    materialRef.current.uniforms.u_color4.value.set(color4);
    materialRef.current.uniforms.u_invertMouse.value = invertMouse;
    materialRef.current.uniforms.u_isDarkMode.value = isDarkMode;
    const nextVar = Math.max(0, Math.min(3, Math.floor(Number(variation))));
    if (materialRef.current.defines.VAR !== nextVar) {
      materialRef.current.defines.VAR = nextVar;
      materialRef.current.needsUpdate = true;
    }
  }, [color1, color2, color3, color4, invertMouse, isDarkMode, variation]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      updateMousePosition(event.clientX, event.clientY);
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };
    const handlePointerDown = () => {
      isInteractingRef.current = true;
      setIsInteracting(true);
    };
    const handlePointerUp = () => {
      isInteractingRef.current = false;
      setIsInteracting(false);
    };
    const handleTouchStart = () => {
      isInteractingRef.current = true;
      setIsInteracting(true);
    };
    const handleTouchEnd = () => {
      isInteractingRef.current = false;
      setIsInteracting(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        isInteractingRef.current = true;
        setIsInteracting(true);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        isInteractingRef.current = false;
        setIsInteracting(false);
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('keyup', handleKeyUp);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('keyup', handleKeyUp);
    };
  }, [disabled, updateMousePosition]);

  useEffect(() => {
    isInteractingRef.current = isInteracting;
  }, [isInteracting]);

  const rootClass = [
    'bemo-21st-cult-shader-lens-blur',
    disabled ? 'bemo-21st-cult-shader-lens-blur--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hintText = enableHover
    ? `${invertMouse ? 'Inverted mouse' : 'Normal mouse'} interaction using mouse or touch`
    : 'Interact with the animation using mouse or touch';

  const resolvedWidth =
    typeof width === 'number' ? `${width}px` : width;
  const resolvedHeight =
    typeof height === 'number' ? `${height}px` : height;

  return (
    <motion.div
      ref={containerRef}
      className={rootClass}
      style={{ width: resolvedWidth, height: resolvedHeight, ...style }}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      role="img"
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      data-interacting={isInteracting ? 'true' : 'false'}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="bemo-21st-cult-shader-lens-blur__canvas"
        aria-hidden="true"
      />
      {showHint && (
        <div className="bemo-21st-cult-shader-lens-blur__hint" aria-hidden="true">
          {hintText}
        </div>
      )}
    </motion.div>
  );
}

export default TwentyFirstCultShaderLensBlur;
export { TwentyFirstCultShaderLensBlur };
