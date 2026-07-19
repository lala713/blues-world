import { cx } from "../../utils/classNames";

interface AnimatedButterflyProps {
  delay?: number;
  className?: string;
}

export const AnimatedButterfly = ({ delay = 0, className }: AnimatedButterflyProps) => (
  <span
    className={cx("butterfly", className)}
    style={{ animationDelay: `${delay}s` }}
    aria-hidden="true"
  >
    <span className="butterfly__wing butterfly__wing--left" />
    <span className="butterfly__body" />
    <span className="butterfly__wing butterfly__wing--right" />
  </span>
);
