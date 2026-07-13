import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  duration?: CSSProperties["animationDuration"];
  gap?: CSSProperties["gap"];
  fade?: boolean;
};

const Marquee = ({
  children,
  className = "",
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duration = "40s",
  gap = "1rem",
  fade = false,
  style,
  ...props
}: MarqueeProps) => {
  const copies = Number.isFinite(repeat) ? Math.max(2, Math.floor(repeat)) : 4;
  const direction = vertical ? "flex-col" : "flex-row";
  const animation = vertical ? "animate-marquee-vertical" : "animate-marquee";
  const mask = vertical
    ? "[mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)]"
    : "[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]";
  const marqueeStyle = { ...style, "--duration": duration, "--gap": gap } as CSSProperties;

  return (
    <div
      className={`group flex overflow-hidden p-2 [gap:var(--gap)] ${direction} ${fade ? mask : ""} ${className}`}
      style={marqueeStyle}
      {...props}
    >
      {Array.from({ length: copies }, (_, index) => (
        <div
          aria-hidden={index > 0}
          className={`flex min-w-full shrink-0 justify-around [gap:var(--gap)] ${direction} ${animation} ${reverse ? "[animation-direction:reverse]" : ""} ${pauseOnHover ? "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]" : ""} motion-reduce:animate-none motion-reduce:[&:not(:first-child)]:hidden`}
          key={index}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;

/* Add the same marquee keyframes and --animate-* variables to your Tailwind v4 global CSS. */
