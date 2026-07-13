import { forwardRef } from "react";
import "./ShimmerButton.css";

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
      className={`bemo-shimmer-button ${className}`.trim()}
      style={{
        "--bemo-shimmer-color": shimmerColor,
        "--bemo-shimmer-radius": borderRadius,
        "--bemo-shimmer-speed": shimmerDuration,
        "--bemo-shimmer-cut": shimmerSize,
        "--bemo-shimmer-background": background,
        ...style,
      }}
    >
      <span className="bemo-shimmer-button__spark-container" aria-hidden="true">
        <span className="bemo-shimmer-button__spark">
          <span className="bemo-shimmer-button__spark-inner" />
        </span>
      </span>
      <span className="bemo-shimmer-button__content">{children}</span>
      <span className="bemo-shimmer-button__highlight" aria-hidden="true" />
      <span className="bemo-shimmer-button__backdrop" aria-hidden="true" />
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
