import { useEffect, useId, useState } from 'react';

export function Android({
  width = 433,
  height = 882,
  src,
  videoSrc,
  className = '',
  disabled = false,
  'aria-label': ariaLabel = 'Android device mockup',
  ...props
}) {
  const rawId = useId().replace(/:/g, '');
  const clipId = `bemo-android-clip-${rawId}`;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 830"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["inline-block max-w-full h-auto align-middle", disabled ? 'opacity-50 pointer-events-none' : '', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      focusable="false"
      {...props}
    >
      <path
        d="M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z"
        className="fill-[#1620E4]"
      />
      <path
        d="M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z"
        className="fill-[#1620E4]"
      />
      <path
        d="M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z"
        className="fill-white dark:fill-[#262626]"
      />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M9.25 48C9.25 29.3604 24.3604 14.25 43 14.25H335C353.64 14.25 368.75 29.3604 368.75 48V780C368.75 798.64 353.64 813.75 335 813.75H43C24.3604 813.75 9.25 798.64 9.25 780V48Z"
          className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
        />
      </g>
      <circle cx="189" cy="28" r="9" className="fill-white dark:fill-[#262626]" />
      <circle cx="189" cy="28" r="4" className="fill-[#7BE9C6]" />
      {src ? (
        <image
          href={src}
          x={9}
          y={14}
          width={360}
          height={800}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          className="size-full object-cover"
        />
      ) : null}
      {videoSrc ? (
        <foreignObject x={9} y={14} width={360} height={800} clipPath={`url(#${clipId})`}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="m-0 h-full w-full overflow-hidden bg-black p-0">
            <video
              className="block size-full object-cover border-0"
              src={videoSrc}
              autoPlay={!prefersReducedMotion && !disabled}
              loop
              muted
              playsInline
              controls={false}
              tabIndex={disabled ? -1 : undefined}
              aria-label={ariaLabel}
            />
          </div>
        </foreignObject>
      ) : null}
      <defs>
        <clipPath id={clipId}>
          <rect width={360} height={800} rx={33} ry={25} transform="translate(9 14)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Android;

/* Tailwind v4 global keyframes: none required for the Android component. */
