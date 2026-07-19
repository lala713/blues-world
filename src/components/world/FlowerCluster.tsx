import { cx } from "../../utils/classNames";

interface FlowerClusterProps {
  type: "sunflower" | "lily" | "daisy";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FlowerCluster = ({ type, size = "md", className }: FlowerClusterProps) => (
  <span className={cx("flower-cluster", `flower-cluster--${type}`, `flower-cluster--${size}`, className)} aria-hidden="true">
    <span className="flower-cluster__stem" />
    <span className="flower-cluster__leaf flower-cluster__leaf--left" />
    <span className="flower-cluster__leaf flower-cluster__leaf--right" />
    <span className="flower-cluster__bloom">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  </span>
);
