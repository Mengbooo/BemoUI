import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from "react";
import "./ShimmerButton.css";

export type ShimmerButtonProps = ComponentPropsWithoutRef<"button"> & {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  children?: ReactNode;
};

type ShimmerStyle = CSSProperties & {
  "--bemo-shimmer-color": string;
  "--bemo-shimmer-radius": string;
  "--bemo-shimmer-speed": string;
  "--bemo-shimmer-cut": string;
  "--bemo-shimmer-background": string;
};

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(function ShimmerButton(
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
  const shimmerStyle: ShimmerStyle = {
    "--bemo-shimmer-color": shimmerColor,
    "--bemo-shimmer-radius": borderRadius,
    "--bemo-shimmer-speed": shimmerDuration,
    "--bemo-shimmer-cut": shimmerSize,
    "--bemo-shimmer-background": background,
    ...style,
  };

  return (
    <button {...props} ref={ref} type={type} className={`bemo-shimmer-button ${className}`.trim()} style={shimmerStyle}>
      <span className="bemo-shimmer-button__spark-container" aria-hidden="true">
        <span className="bemo-shimmer-button__spark"><span className="bemo-shimmer-button__spark-inner" /></span>
      </span>
      <span className="bemo-shimmer-button__content">{children}</span>
      <span className="bemo-shimmer-button__highlight" aria-hidden="true" />
      <span className="bemo-shimmer-button__backdrop" aria-hidden="true" />
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
