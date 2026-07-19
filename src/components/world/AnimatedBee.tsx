import { cx } from "../../utils/classNames";

interface AnimatedBeeProps {
  delay?: number;
  className?: string;
}

export const AnimatedBee = ({ delay = 0, className }: AnimatedBeeProps) => (
  <span className={cx("bee", className)} style={{ animationDelay: `${delay}s` }} aria-hidden="true">
    <span className="bee__wing bee__wing--left" />
    <span className="bee__wing bee__wing--right" />
    <span className="bee__body" />
  </span>
);
