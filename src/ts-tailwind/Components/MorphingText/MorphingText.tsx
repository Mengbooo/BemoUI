import { useCallback, useEffect, useId, useRef, type CSSProperties } from 'react';

const DEFAULT_MORPH_TIME = 1.5;
const DEFAULT_COOLDOWN_TIME = 0.5;

export interface MorphingTextProps {
  texts: string[];
  className?: string;
  morphTime?: number;
  cooldownTime?: number;
}

function usePrefersReducedMotionRef() {
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return reducedMotionRef;
}

function useMorphingText(texts: string[], morphTime: number, cooldownTime: number) {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(0);
  const text1Ref = useRef<HTMLSpanElement | null>(null);
  const text2Ref = useRef<HTMLSpanElement | null>(null);
  const textsRef = useRef<string[]>(texts);
  const reducedMotionRef = usePrefersReducedMotionRef();

  useEffect(() => {
    textsRef.current = Array.isArray(texts) ? texts : [];
  }, [texts]);

  const setStyles = useCallback((fraction: number) => {
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2) return;

    const list = textsRef.current.length > 0 ? textsRef.current : [''];
    const safeFraction = Math.min(Math.max(fraction, 0.0001), 1);
    const invertedFraction = Math.max(1 - safeFraction, 0.0001);

    current2.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`;
    current2.style.opacity = `${Math.pow(safeFraction, 0.4) * 100}%`;

    current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
    current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

    current1.textContent = list[textIndexRef.current % list.length];
    current2.textContent = list[(textIndexRef.current + 1) % list.length];
  }, []);

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current += 1;
    }
  }, [morphTime, cooldownTime, setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2) return;

    current2.style.filter = 'none';
    current2.style.opacity = '100%';
    current1.style.filter = 'none';
    current1.style.opacity = '0%';
  }, []);

  useEffect(() => {
    const list = Array.isArray(texts) && texts.length > 0 ? texts : [''];
    if (text1Ref.current) {
      text1Ref.current.textContent = list[0];
      text1Ref.current.style.filter = 'none';
      text1Ref.current.style.opacity = '0%';
    }
    if (text2Ref.current) {
      text2Ref.current.textContent = list[0];
      text2Ref.current.style.filter = 'none';
      text2Ref.current.style.opacity = '100%';
    }
    textIndexRef.current = 0;
    morphRef.current = 0;
    cooldownRef.current = 0;
  }, [texts]);

  useEffect(() => {
    let animationFrameId = 0;
    timeRef.current = typeof performance !== 'undefined' ? performance.now() : 0;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (reducedMotionRef.current) {
        const list = textsRef.current.length > 0 ? textsRef.current : [''];
        const current1 = text1Ref.current;
        const current2 = text2Ref.current;
        if (current1 && current2) {
          current1.style.filter = 'none';
          current1.style.opacity = '0%';
          current1.textContent = list[0];
          current2.style.filter = 'none';
          current2.style.opacity = '100%';
          current2.textContent = list[0];
        }
        timeRef.current = now;
        return;
      }

      const dt = (now - timeRef.current) / 1000;
      timeRef.current = now;
      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        doMorph();
      } else {
        doCooldown();
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [doMorph, doCooldown, reducedMotionRef]);

  return { text1Ref, text2Ref };
}

export default function MorphingText({
  texts = [],
  className = '',
  morphTime = DEFAULT_MORPH_TIME,
  cooldownTime = DEFAULT_COOLDOWN_TIME,
}: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingText(texts, morphTime, cooldownTime);
  const reactId = useId();
  const filterId = `bemo-morphing-text-threshold-${reactId.replace(/:/g, '')}`;
  const rootClassName = [
    'relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold text-[#1620E4] [text-shadow:0_0_24px_rgba(123,233,198,0.35)] md:h-24 lg:text-[6rem] motion-reduce:![filter:none] motion-reduce:[text-shadow:none]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const rootStyle: CSSProperties = {
    filter: `url(#${filterId}) blur(0.6px)`,
  };

  return (
    <div
      className={rootClassName}
      style={rootStyle}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full pointer-events-none select-none"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full pointer-events-none select-none"
        ref={text2Ref}
      />
      <svg
        className="fixed h-0 w-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// Tailwind v4 notes:
// No global @keyframes are required. Morph timing is driven by requestAnimationFrame.
// Keep per-instance SVG filter ids unique (useId) when rendering multiple MorphingText nodes.
