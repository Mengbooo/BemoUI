import { forwardRef } from "react";

const ShimmerButton = forwardRef(function ShimmerButton(
  {
    shimmerColor = "#7BE9C6",
    shimmerSize = "0.05em",
    shimmerDuration = "3s",
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 1)",
    className = "",
    children,
    style,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={`group relative z-0 inline-flex min-h-12 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 font-bold text-white [border-radius:var(--radius)] [background:var(--bg)] shadow-[0_14px_36px_rgba(0,0,0,.3)] transition-[transform,box-shadow,opacity] duration-200 hover:not-disabled:-translate-y-px hover:not-disabled:shadow-[0_18px_44px_rgba(0,0,0,.38)] active:not-disabled:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--shimmer-color)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none motion-reduce:transform-none motion-reduce:transition-none ${className}`}
      style={{
        "--spread": "90deg",
        "--shimmer-color": shimmerColor,
        "--radius": borderRadius,
        "--speed": shimmerDuration,
        "--cut": shimmerSize,
        "--bg": background,
        ...style,
      }}
    >
      <span className="pointer-events-none absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]" aria-hidden="true">
        <span className="absolute inset-0 h-[100cqh] aspect-square animate-shimmer-slide motion-reduce:animate-none">
          <span className="absolute -inset-full animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] motion-reduce:animate-none" />
        </span>
      </span>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_-8px_10px_rgba(255,255,255,.12)] transition-shadow duration-200 group-hover:shadow-[inset_0_-6px_12px_rgba(255,255,255,.25)] group-active:shadow-[inset_0_-10px_12px_rgba(255,255,255,.25)] motion-reduce:transition-none" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-[var(--cut)] -z-20 rounded-[inherit] [background:var(--bg)]" aria-hidden="true" />
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;

/* Add to your Tailwind v4 global CSS:
@theme inline {
  --animate-spin-around: spin-around calc(var(--speed) * 2) infinite linear;
  --animate-shimmer-slide: shimmer-slide var(--speed) ease-in-out infinite alternate;

  @keyframes spin-around {
    0% { transform: translateZ(0) rotate(0deg); }
    15%, 35% { transform: translateZ(0) rotate(90deg); }
    65%, 85% { transform: translateZ(0) rotate(270deg); }
    100% { transform: translateZ(0) rotate(360deg); }
  }

  @keyframes shimmer-slide {
    to { transform: translate(calc(100cqw - 100%), 0); }
  }
}
*/
