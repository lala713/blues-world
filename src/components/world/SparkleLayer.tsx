import { useSiteProgress } from "../../contexts/SiteProgressContext";
import { cx } from "../../utils/classNames";

interface SparkleLayerProps {
  interactive?: boolean;
  className?: string;
}

export const SparkleLayer = ({ interactive = false, className }: SparkleLayerProps) => {
  const { collectStar, starCount } = useSiteProgress();

  return (
    <div className={cx("sparkle-layer", interactive && "sparkle-layer--interactive", className)} aria-hidden={!interactive}>
      {Array.from({ length: 7 }, (_, index) => {
        const collected = index < starCount;
        if (!interactive) {
          return <span className="tiny-star" key={index} style={{ animationDelay: `${index * 0.35}s` }} />;
        }
        return (
          <button
            className={cx("tiny-star", collected && "tiny-star--collected")}
            key={index}
            type="button"
            aria-label={`Collect hidden star ${index + 1}`}
            onClick={collectStar}
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        );
      })}
    </div>
  );
};
