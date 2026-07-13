import "./Marquee.css";

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
}) => {
  const copies = Number.isFinite(repeat) ? Math.max(2, Math.floor(repeat)) : 4;

  return (
    <div
      className={`bemo-marquee ${vertical ? "bemo-marquee--vertical" : ""} ${fade ? "bemo-marquee--fade" : ""} ${className}`}
      style={{
        ...style,
        "--bemo-marquee-duration": duration,
        "--bemo-marquee-gap": gap,
      }}
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
