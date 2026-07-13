import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import "./Marquee.css";

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
  const marqueeStyle = {
    ...style,
    "--bemo-marquee-duration": duration,
    "--bemo-marquee-gap": gap,
  } as CSSProperties;

  return (
    <div
      className={`bemo-marquee ${vertical ? "bemo-marquee--vertical" : ""} ${fade ? "bemo-marquee--fade" : ""} ${className}`}
      style={marqueeStyle}
      {...props}
    >
      {Array.from({ length: copies }, (_, index) => (
        <div
          aria-hidden={index > 0}
          className={`bemo-marquee__track ${reverse ? "bemo-marquee__track--reverse" : ""} ${pauseOnHover ? "bemo-marquee__track--pause" : ""}`}
          key={index}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
